import { sanitizeInput } from './antiSpam'

// ── Target Recipient Email ──
export const TARGET_EMAIL = 'Fadhl.alabbas@gmail.com'

// ── EmailJS Configuration (Silent Background Backup) ──
const EMAILJS_SERVICE_ID = 'service_82ap7ml'
const EMAILJS_TEMPLATE_ID = 'template_3vg9r51'
const EMAILJS_PUBLIC_KEY = 'xzsyn9GxDj3Mac3f9'
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send'

/**
 * Format a high-deliverability email subject line that avoids spam filters.
 */
export function formatSpamProofSubject(baseSubject: string, fields: Record<string, string>): string {
  const cleanName = sanitizeInput(fields.name || '')
  const cleanCompany = sanitizeInput(fields.company || '')
  
  if (cleanCompany && cleanName) {
    return `[Modern Assets Quote] ${cleanCompany} (${cleanName})`
  }
  if (cleanCompany) {
    return `[Modern Assets Quote] ${cleanCompany}`
  }
  if (cleanName) {
    return `[Modern Assets Quote] ${cleanName}`
  }
  return baseSubject || '[Modern Assets Fleet Inquiry]'
}

/**
 * Build a concise, clean email body that fits cleanly in all email clients without URL truncation.
 */
export function buildEmailBody(fields: Record<string, string>): string {
  const cleanName = sanitizeInput(fields.name || 'N/A')
  const cleanCompany = sanitizeInput(fields.company || 'N/A')
  const cleanPhone = sanitizeInput(fields.phone || 'N/A')
  const cleanEmail = sanitizeInput(fields.email || 'N/A')
  const cleanVehicle = sanitizeInput(fields.vehicleType || 'N/A')
  const cleanFleetSize = sanitizeInput(fields.fleetSize || 'N/A')
  const cleanTimeline = sanitizeInput(fields.timeline || 'N/A')
  const cleanSpecs = sanitizeInput(fields.specifications || fields.message || 'No additional specifications provided.')

  const lines: string[] = [
    `Dear Modern Assets Team,`,
    ``,
    `A new verified fleet inquiry has been submitted via modern-assets.com:`,
    ``,
    `-- CLIENT INFORMATION --`,
    `Name: ${cleanName}`,
    `Company: ${cleanCompany}`,
    `Phone / WhatsApp: ${cleanPhone}`,
    `Email: ${cleanEmail}`,
    ``,
    `-- FLEET SPECIFICATIONS --`,
    `Vehicle / Platform: ${cleanVehicle}`,
    `Fleet Size / Quantity: ${cleanFleetSize}`,
    `Target Timeline: ${cleanTimeline}`,
    ``,
    `-- TECHNICAL REQUIREMENTS / NOTES --`,
    cleanSpecs,
    ``,
    `--`,
    `Submitted at: ${new Date().toUTCString()}`,
    `Modern Assets Commercial Vehicles & Heavy Equipment (KSA)`,
  ]

  return lines.join('\n')
}

/**
 * Generate a mailto: link that opens the user's email client with everything pre-filled.
 */
export function getMailtoLink(subject: string, fields: Record<string, string>): string {
  const fullSubject = formatSpamProofSubject(subject, fields)
  const body = buildEmailBody(fields)
  return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`
}

/**
 * Generate a direct Gmail web compose link for browser Gmail users.
 */
export function getGmailComposeLink(subject: string, fields: Record<string, string>): string {
  const fullSubject = formatSpamProofSubject(subject, fields)
  const body = buildEmailBody(fields)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`
}

/**
 * Open email client IMMEDIATELY and SYNCHRONOUSLY on button click.
 * Must be called without await so browsers don't block the popup.
 */
export function openEmailClient(subject: string, fields: Record<string, string>) {
  const gmailUrl = getGmailComposeLink(subject, fields)
  const mailtoUrl = getMailtoLink(subject, fields)

  // 1. Try opening Gmail Web in a new tab (works instantly in all desktop browsers)
  let openedWindow: Window | null = null
  try {
    openedWindow = window.open(gmailUrl, '_blank')
  } catch (e) {
    console.warn('window.open blocked:', e)
  }

  // 2. If popup was blocked or on mobile device without popups, trigger mailto: directly
  if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
    window.location.href = mailtoUrl
  }
}

/**
 * Send a background copy via EmailJS so you have a guaranteed copy
 * in your dashboard / email even if the user forgets to click send.
 */
export async function sendFormEmail(
  subject: string,
  fields: Record<string, string>
) {
  const cleanName = sanitizeInput(fields.name || 'Website Visitor')
  const cleanCompany = sanitizeInput(fields.company || 'N/A')
  const cleanEmail = sanitizeInput(fields.email || '')
  const cleanPhone = sanitizeInput(fields.phone || 'N/A')
  const cleanVehicle = sanitizeInput(fields.vehicleType || 'N/A')
  const cleanFleetSize = sanitizeInput(fields.fleetSize || 'N/A')
  const cleanTimeline = sanitizeInput(fields.timeline || 'N/A')
  const cleanSpecs = sanitizeInput(fields.specifications || fields.message || '')

  const fullSubject = formatSpamProofSubject(subject, fields)

  const summaryParts: string[] = []
  if (cleanSpecs) summaryParts.push(cleanSpecs)
  if (cleanVehicle !== 'N/A') summaryParts.push(`Vehicle / Service: ${cleanVehicle}`)
  if (cleanFleetSize !== 'N/A') summaryParts.push(`Fleet Size / Quantity: ${cleanFleetSize}`)
  if (cleanTimeline !== 'N/A') summaryParts.push(`Timeline: ${cleanTimeline}`)
  if (cleanCompany !== 'N/A') summaryParts.push(`Company: ${cleanCompany}`)
  if (cleanPhone !== 'N/A') summaryParts.push(`Phone: ${cleanPhone}`)

  const templateParams: Record<string, string> = {
    subject: fullSubject,
    from_name: cleanName,
    name: cleanName,
    company: cleanCompany,
    reply_to: cleanEmail,
    email: cleanEmail,
    phone: cleanPhone,
    vehicle_type: cleanVehicle,
    quantity: cleanFleetSize,
    fleet_size: cleanFleetSize,
    timeline: cleanTimeline,
    specifications: cleanSpecs || 'N/A',
    message: summaryParts.join('\n\n') || 'No additional message provided',
    submission_time: new Date().toISOString(),
  }

  const payload = {
    lib_version: '4.4.1',
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: templateParams,
  }

  try {
    const res = await fetch(EMAILJS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    return { success: res.ok }
  } catch (err) {
    console.warn('Background backup submission notice:', err)
    return { success: false }
  }
}
