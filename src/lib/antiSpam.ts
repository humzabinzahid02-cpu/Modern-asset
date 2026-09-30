/**
 * Comprehensive Anti-Spam & Form Restriction Utility for Modern Assets
 * 
 * Prevents:
 * 1. Automated bot submissions (Honeypot trap + Time-to-submit verification)
 * 2. Spam backlinks & phishing (Strict URL / link blocking in messages)
 * 3. Disposable/fake emails & invalid formats
 * 4. Spam trigger keywords (casino, crypto, SEO, pharma, etc.)
 * 5. Form flooding & rapid repeated submissions (Client-side cooldown / rate-limit)
 */

// ── Known Disposable & Spam Mail Domains ──
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'guerrillamail.com',
  'throwawaymail.com',
  'yopmail.com',
  'trashmail.com',
  'sharklasers.com',
  'dispostable.com',
  'fakemailgenerator.com',
  'getnada.com',
  'mohmal.com',
  'burnermail.io',
  'crazymailing.com',
  'tmail.ws',
])

// ── Obvious Fake / Test Email Addresses ──
const FAKE_EMAIL_EXACT = new Set([
  'test@test.com',
  'admin@admin.com',
  'user@example.com',
  'asdf@asdf.com',
  'fake@fake.com',
  'no@no.com',
  '123@123.com',
  'abc@abc.com',
  'test@gmail.com',
])

// ── High-Risk Spam Keywords (B2B Fleet quotes do not use these) ──
const SPAM_KEYWORDS = [
  'casino',
  'viagra',
  'cialis',
  'crypto',
  'cryptocurrency',
  'bitcoin',
  'ethereum',
  'seo rank',
  'backlink',
  'guest post',
  'forex',
  'loan offer',
  'adult dating',
  'free money',
  'make money fast',
  'earn $$$',
  'lottery prize',
  'poker',
  'telegram group',
  't.me/',
  'wa.me/',
  'bit.ly',
  'tinyurl',
  'adult chat',
  'porn',
  'sex video',
]

// ── URL Pattern Detector (Blocks spam links) ──
const URL_PATTERN = /(https?:\/\/|www\.[a-z0-9]|ftp:\/\/|[a-z0-9-]+\.(?:ru|xyz|top|work|click|link|buzz|fit|rest|space)\b)/i

export interface FormSubmissionData {
  name: string
  company?: string
  email: string
  phone: string
  message?: string
  specifications?: string
  vehicleType?: string
  fleetSize?: string
  timeline?: string
  // Anti-bot security metadata
  honeypot?: string
  mountedAt?: number
}

export interface ValidationResult {
  isValid: boolean
  isBotTrap?: boolean
  errorEn?: string
  errorAr?: string
}

/**
 * Check if the user is submitting too frequently (rate limiting).
 */
export function checkRateLimit(formKey: string = 'general', cooldownSeconds = 30): { allowed: boolean; remainingSec: number } {
  try {
    const storageKey = `ma_last_sub_${formKey}`
    const lastTime = window.sessionStorage.getItem(storageKey)
    if (lastTime) {
      const elapsedSec = (Date.now() - parseInt(lastTime, 10)) / 1000
      if (elapsedSec < cooldownSeconds) {
        return { allowed: false, remainingSec: Math.ceil(cooldownSeconds - elapsedSec) }
      }
    }
  } catch (e) {
    // sessionStorage not available
  }
  return { allowed: true, remainingSec: 0 }
}

/**
 * Record successful form submission timestamp for cooldown.
 */
export function recordSubmission(formKey: string = 'general') {
  try {
    const storageKey = `ma_last_sub_${formKey}`
    window.sessionStorage.setItem(storageKey, Date.now().toString())
  } catch (e) {
    // ignore
  }
}

/**
 * Sanitize plain text: strips tags and control characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  return input
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '') // strip control chars
    .trim()
}

/**
 * Validate form submission against anti-spam and quality rules.
 */
export function validateAntiSpam(data: FormSubmissionData, isArabic = false): ValidationResult {
  // 1. Honeypot check (Bots fill hidden fields)
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      isValid: false,
      isBotTrap: true, // Silent drop for bots
      errorEn: 'Submission flagged by security filter.',
      errorAr: 'تم حظر الإرسال بواسطة مرشح الأمان.',
    }
  }

  // 2. Timing check (Submissions faster than 2.5s are automated bots)
  if (data.mountedAt && Date.now() - data.mountedAt < 2500) {
    return {
      isValid: false,
      errorEn: 'Form submitted too quickly. Please take a moment to review your details.',
      errorAr: 'تم إرسال النموذج بسرعة غير معتادة. يرجى مراجعة بياناتك ثم المحاولة ثانية.',
    }
  }

  // 3. Name validation
  const cleanName = sanitizeInput(data.name || '')
  if (cleanName.length < 2) {
    return {
      isValid: false,
      errorEn: 'Please enter a valid full name (minimum 2 characters).',
      errorAr: 'يرجى إدخال اسم كامل صحيح (حرفين على الأقل).',
    }
  }
  if (URL_PATTERN.test(cleanName)) {
    return {
      isValid: false,
      errorEn: 'Names cannot contain web addresses or links.',
      errorAr: 'لا يمكن أن يحتوي الاسم على روابط أو مواقع إلكترونية.',
    }
  }

  // 4. Email validation
  const cleanEmail = (data.email || '').trim().toLowerCase()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/
  if (!emailRegex.test(cleanEmail)) {
    return {
      isValid: false,
      errorEn: 'Please enter a valid business email address (e.g. name@company.com).',
      errorAr: 'يرجى إدخال بريد إلكتروني صالح للعمل (مثال: name@company.com).',
    }
  }

  if (FAKE_EMAIL_EXACT.has(cleanEmail)) {
    return {
      isValid: false,
      errorEn: 'Please provide a genuine business email address.',
      errorAr: 'يرجى تقديم بريد إلكتروني تجاري حقيقي.',
    }
  }

  const domain = cleanEmail.split('@')[1] || ''
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      errorEn: 'Temporary / disposable email addresses are not accepted for official quote requests.',
      errorAr: 'لا تُقبل عناوين البريد المؤقتة أو الوهمية لطلبات عروض الأسعار الرسمية.',
    }
  }

  // 5. Phone validation
  const cleanPhone = (data.phone || '').trim()
  const digitsOnly = cleanPhone.replace(/\D/g, '')
  if (digitsOnly.length < 7 || digitsOnly.length > 16) {
    return {
      isValid: false,
      errorEn: 'Please enter a valid phone or WhatsApp number (at least 7 digits).',
      errorAr: 'يرجى إدخال رقم هاتف أو واتساب صحيح (7 أرقام على الأقل).',
    }
  }

  // Reject repeated dummy digits like 0000000, 1111111, 12345678
  if (/^(\d)\1{6,}$/.test(digitsOnly) || digitsOnly === '12345678' || digitsOnly === '123456789') {
    return {
      isValid: false,
      errorEn: 'Please provide a genuine contact phone number.',
      errorAr: 'يرجى تزويدنا برقم اتصال حقيقي وصحيح.',
    }
  }

  // 6. Anti-URL & Spam Link Protection on Text Fields (message, specifications, company)
  const textPayload = [
    data.company || '',
    data.message || '',
    data.specifications || '',
  ].join(' ')

  if (URL_PATTERN.test(textPayload)) {
    return {
      isValid: false,
      errorEn: 'For spam and security protection, website links and URLs are not permitted in form messages. Please describe your specifications in plain text.',
      errorAr: 'لحماية البريد من الرسائل المزعجة، لا يمكن تضمين روابط أو عناوين مواقع في الرسالة. يرجى كتابة المواصفات كنص عادي.',
    }
  }

  // 7. Spam Keywords Detection
  const lowerText = textPayload.toLowerCase()
  for (const spamWord of SPAM_KEYWORDS) {
    if (lowerText.includes(spamWord)) {
      return {
        isValid: false,
        errorEn: 'Your message contains terms flagged by our spam prevention filter. Please revise your inquiry.',
        errorAr: 'تحتوي رسالتك على عبارات تم تصنيفها كرسائل غير مرغوب فيها. يرجى تعديل الطلب.',
      }
    }
  }

  // 8. Message minimum length check (if provided in Contact form)
  if (data.message && data.message.trim().length > 0 && data.message.trim().length < 8) {
    return {
      isValid: false,
      errorEn: 'Please provide a slightly more detailed inquiry (minimum 8 characters) so our engineers can assist you.',
      errorAr: 'يرجى كتابة تفاصيل أوضح عن متطلباتك (8 أحرف على الأقل) ليتمكن فريقنا الهندسي من خدمتك.',
    }
  }

  return { isValid: true }
}
