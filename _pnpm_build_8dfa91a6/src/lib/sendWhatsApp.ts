// ── WhatsApp Configuration ──
// Replace with the business/owner WhatsApp number (include country code without + or spaces, e.g. '966501234567')
export const OWNER_WHATSAPP_NUMBER = '966500000000'

export interface QuoteFormData {
  name?: string
  company?: string
  email?: string
  phone?: string
  vehicleType?: string
  fleetSize?: string
  timeline?: string
  specifications?: string
  message?: string
}

/**
 * Format form data into a clean, professional WhatsApp message.
 */
export function formatWhatsAppMessage(data: QuoteFormData, title = 'NEW FLEET INQUIRY'): string {
  const lines: string[] = [
    `🏭 *${title}*`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ]

  if (data.name) lines.push(`👤 *Name:* ${data.name}`)
  if (data.company) lines.push(`🏢 *Company:* ${data.company}`)
  if (data.phone) lines.push(`📞 *Phone:* ${data.phone}`)
  if (data.email) lines.push(`✉️ *Email:* ${data.email}`)

  lines.push(`━━━━━━━━━━━━━━━━━━━━`)

  if (data.vehicleType) lines.push(`🚚 *Vehicle / Product:* ${data.vehicleType}`)
  if (data.fleetSize) lines.push(`🔢 *Fleet Size / Quantity:* ${data.fleetSize}`)
  if (data.timeline) lines.push(`⏱️ *Target Timeline:* ${data.timeline}`)

  if (data.specifications || data.message) {
    lines.push(`━━━━━━━━━━━━━━━━━━━━`)
    lines.push(`📝 *Specifications / Notes:*`)
    lines.push(data.specifications || data.message || '')
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━`)
  lines.push(`_Sent via Modern Assets Web Portal_`)

  return lines.join('\n')
}

/**
 * Open WhatsApp directly with all details pre-filled in the chat box.
 * Customer just has to press 'Send'.
 */
export function openWhatsAppQuote(data: QuoteFormData, customNumber?: string, title?: string) {
  const phone = (customNumber || OWNER_WHATSAPP_NUMBER).replace(/[^0-9]/g, '')
  const message = formatWhatsAppMessage(data, title)
  const encodedText = encodeURIComponent(message)
  const url = `https://wa.me/${phone}?text=${encodedText}`

  // Open WhatsApp in a new tab/window or app
  window.open(url, '_blank')
}
