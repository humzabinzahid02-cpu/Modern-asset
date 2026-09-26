// ── Target Recipient Email ──
export const TARGET_EMAIL = 'humzazahid455@gmail.com'

// ── EmailJS Configuration (Silent Background Backup) ──
const EMAILJS_SERVICE_ID = 'service_82ap7ml'
const EMAILJS_TEMPLATE_ID = 'template_3vg9r51'
const EMAILJS_PUBLIC_KEY = 'xzsyn9GxDj3Mac3f9'
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send'

/**
 * Build a concise, clean email body that fits cleanly in all email clients without URL truncation.
 */
export function buildEmailBody(fields: Record<string, string>): string {
  const lines: string[] = [
    `Dear Modern Assets Team,`,
    ``,
    `Here are the details for our fleet specification / quote request:`,
    ``,
    `-- CLIENT INFORMATION --`,
    `Name: ${fields.name || 'N/A'}`,
    `Company: ${fields.company || 'N/A'}`,
    `Phone / WhatsApp: ${fields.phone || 'N/A'}`,
    `Email: ${fields.email || 'N/A'}`,
    ``,
    `-- FLEET SPECIFICATIONS --`,
    `Vehicle / Product: ${fields.vehicleType || 'N/A'}`,
    `Fleet Size / Quantity: ${fields.fleetSize || 'N/A'}`,
    `Target Timeline: ${fields.timeline || 'N/A'}`,
    ``,
    `-- TECHNICAL SPECIFICATIONS / NOTES --`,
    fields.specifications || fields.message || 'No additional specifications provided.',
    ``,
    `--`,
    `Sent from Modern Assets Official Web Portal`,
  ]

  return lines.join('\n')
}

/**
 * Generate a mailto: link that opens the user's email client with everything pre-filled.
 */
export function getMailtoLink(subject: string, fields: Record<string, string>): string {
  const fullSubject = fields.company 
    ? `${subject} - ${fields.company}` 
    : fields.name 
      ? `${subject} - ${fields.name}` 
      : subject

  const body = buildEmailBody(fields)
  return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`
}

/**
 * Generate a direct Gmail web compose link for browser Gmail users.
 */
export function getGmailComposeLink(subject: string, fields: Record<string, string>): string {
  const fullSubject = fields.company 
    ? `${subject} - ${fields.company}` 
    : fields.name 
      ? `${subject} - ${fields.name}` 
      : subject

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
  const summaryParts: string[] = []
  if (fields.message) summaryParts.push(fields.message)
  if (fields.vehicleType) summaryParts.push(`Vehicle / Service: ${fields.vehicleType}`)
  if (fields.fleetSize) summaryParts.push(`Fleet Size / Quantity: ${fields.fleetSize}`)
  if (fields.timeline) summaryParts.push(`Timeline: ${fields.timeline}`)
  if (fields.specifications) summaryParts.push(`Specifications / Notes: ${fields.specifications}`)
  if (fields.company) summaryParts.push(`Company: ${fields.company}`)
  if (fields.phone) summaryParts.push(`Phone: ${fields.phone}`)

  const templateParams: Record<string, string> = {
    subject: subject || 'New Form Submission',
    from_name: fields.name || 'Website Visitor',
    name: fields.name || 'Website Visitor',
    company: fields.company || 'N/A',
    reply_to: fields.email || '',
    email: fields.email || '',
    phone: fields.phone || 'N/A',
    vehicle_type: fields.vehicleType || 'N/A',
    quantity: fields.fleetSize || 'N/A',
    fleet_size: fields.fleetSize || 'N/A',
    timeline: fields.timeline || 'N/A',
    specifications: fields.specifications || 'N/A',
    message: summaryParts.join('\n\n') || 'No message provided',
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
