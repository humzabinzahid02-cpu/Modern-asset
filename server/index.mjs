import { createServer } from 'node:http'

const PORT = Number(process.env.API_PORT || 3001)
const RECIPIENT = process.env.MAIL_TO || 'humzazahid455@gmail.com'
const MAX_BODY_BYTES = 16 * 1024
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 5
const requestCounts = new Map()
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:8443,https://localhost:8443,http://127.0.0.1:8443,https://127.0.0.1:8443')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(JSON.stringify(body))
}

function cleanText(value, maxLength = 2000) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, maxLength)
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function getClientKey(request) {
  // Trust the direct socket address; forwarded headers can be spoofed unless
  // the hosting platform is configured as a trusted proxy.
  return request.socket.remoteAddress || 'unknown'
}

function isRateLimited(clientKey) {
  const now = Date.now()
  const recent = (requestCounts.get(clientKey) || []).filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    requestCounts.set(clientKey, recent)
    return true
  }
  recent.push(now)
  requestCounts.set(clientKey, recent)
  return false
}

async function readJson(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new Error('Request is too large.')
  }
  try {
    return JSON.parse(body)
  } catch {
    throw new Error('Please submit a valid form.')
  }
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  } else if (origin) {
    sendJson(response, 403, { success: false, message: 'This site is not allowed to submit requests.' })
    return
  }

  const pathname = new URL(request.url || '/', 'http://localhost').pathname
  if (pathname === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, { success: true, configured: Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM) })
    return
  }
  if (pathname !== '/api/contact') {
    sendJson(response, 404, { success: false, message: 'Not found.' })
    return
  }
  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }
  if (request.method !== 'POST') {
    sendJson(response, 405, { success: false, message: 'Method not allowed.' })
    return
  }
  if (isRateLimited(getClientKey(request))) {
    sendJson(response, 429, { success: false, message: 'Too many requests. Please wait a little and try again.' })
    return
  }
  if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) {
    sendJson(response, 503, { success: false, message: 'Email service is not configured yet.' })
    return
  }

  try {
    const payload = await readJson(request)
    const inputFields = payload?.fields
    if (!inputFields || typeof inputFields !== 'object' || Array.isArray(inputFields)) {
      sendJson(response, 400, { success: false, message: 'Please submit a valid form.' })
      return
    }

    const fields = Object.fromEntries(
      Object.entries(inputFields)
        .slice(0, 30)
        .map(([key, value]) => [cleanText(key, 80), cleanText(value, 3000)])
        .filter(([key, value]) => key && value),
    )
    const name = fields.name
    const email = fields.email
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(response, 400, { success: false, message: 'Please provide your name and a valid email address.' })
      return
    }

    const requestedSubject = cleanText(payload.subject, 100)
    const subject = requestedSubject === 'New Fleet Quote Request' || requestedSubject === 'New Contact Quote Request'
      ? requestedSubject
      : 'New Website Request'
    const html = `<h2>${escapeHtml(subject)}</h2><table>${Object.entries(fields)
      .map(([key, value]) => `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(key)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
      .join('')}</table>`

    let mailResponse
    try {
      mailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM,
          to: [RECIPIENT],
          reply_to: email,
          subject,
          html,
        }),
      })
    } catch (error) {
      console.error('Could not connect to the email provider:', error instanceof Error ? error.message : error)
      sendJson(response, 502, { success: false, message: 'Email service is unreachable right now. Please try again later.' })
      return
    }
    const mailResult = await mailResponse.json().catch(() => null)
    if (!mailResponse.ok) {
      console.error('Email provider rejected a form request:', mailResponse.status, mailResult?.message || 'Unknown provider error')
      if (mailResponse.status === 403 && /testing emails|verify a domain/i.test(mailResult?.message || '')) {
        sendJson(response, 503, {
          success: false,
          message: 'Email setup is incomplete. Verify a sending domain in Resend to deliver requests to this address.',
        })
        return
      }
      sendJson(response, 502, { success: false, message: 'We could not send your request right now. Please try again later.' })
      return
    }

    sendJson(response, 200, { success: true, message: 'Your request was sent.' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to process this request.'
    const status = message === 'Request is too large.' ? 413 : 400
    sendJson(response, status, { success: false, message })
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Form API listening on port ${PORT}`)
})
