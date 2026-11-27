import React, { useState } from 'react'
import { submitInquiry, ProjectInquiry } from '../../lib/supabase'
import { checkRateLimit, scanForThreats } from '../../lib/security'
import { Button } from '../ui/Button'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const SERVICE_OPTIONS = [
  "Architectural photography",
  "Interior photography",
  "Branding and identity",
  "Graphic design",
  "Film and video",
  "Social media strategy",
  "Website and digital experience",
  "Multiple services",
  "Other"
]

const BUDGET_RANGES = [
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000 – ₹5,00,000",
  "₹5,00,000 – ₹10,00,000",
  "₹10,00,000+",
  "To be determined / Custom scope"
]

const TIMELINE_OPTIONS = [
  "Immediately (Within 2 weeks)",
  "1 – 2 Months",
  "3 – 6 Months",
  "Flexible / Long-term Planning"
]

interface InquiryFormProps {
  defaultService?: string
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ defaultService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: defaultService || SERVICE_OPTIONS[0],
    budgetRange: BUDGET_RANGES[1],
    projectLocation: '',
    projectTimeline: TIMELINE_OPTIONS[1],
    projectDescription: '',
    consentToContact: true,
    // Honeypot field for spam prevention
    honeypot: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [serverErrorMsg, setServerErrorMsg] = useState('')

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).'
    } else {
      const threat = scanForThreats(formData.fullName)
      if (!threat.isSafe) newErrors.fullName = threat.reason || 'Invalid characters detected.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    } else {
      const threat = scanForThreats(formData.email)
      if (!threat.isSafe) newErrors.email = threat.reason || 'Invalid characters in email.'
    }

    const phoneRegex = /^[+0-9\s\-()]{8,20}$/
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid phone or WhatsApp number (at least 8 digits).'
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Please provide a brief description of your project or requirements (at least 10 characters).'
    } else {
      const threat = scanForThreats(formData.projectDescription)
      if (!threat.isSafe) newErrors.projectDescription = threat.reason || 'Unauthorized command or script syntax detected.'
    }

    if (formData.companyName) {
      const threat = scanForThreats(formData.companyName)
      if (!threat.isSafe) newErrors.companyName = threat.reason || 'Invalid characters detected.'
    }

    if (formData.projectLocation) {
      const threat = scanForThreats(formData.projectLocation)
      if (!threat.isSafe) newErrors.projectLocation = threat.reason || 'Invalid characters detected.'
    }

    if (!formData.consentToContact) {
      newErrors.consentToContact = 'Please confirm consent to be contacted regarding this inquiry.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Silently reject spam bots filling the hidden honeypot
    if (formData.honeypot) {
      setSubmitStatus('success')
      return
    }

    if (!validate()) {
      return
    }

    // Rate Limiting Protection (Anti-Spam / Anti-DDoS)
    const rateCheck = checkRateLimit('inquiry_form_submission', 5, 60000, 300000)
    if (!rateCheck.allowed) {
      setSubmitStatus('error')
      setServerErrorMsg(`Rate limit exceeded for security. Please wait ${rateCheck.retryAfterSec || 60} seconds before submitting again.`)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setServerErrorMsg('')

    try {
      const payload: Omit<ProjectInquiry, 'id' | 'created_at' | 'status'> = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        service_type: formData.serviceType,
        budget_range: formData.budgetRange,
        project_location: formData.projectLocation,
        project_timeline: formData.projectTimeline,
        project_description: formData.projectDescription,
        consent_to_contact: formData.consentToContact
      }

      const result = await submitInquiry(payload)

      if (result.success) {
        setSubmitStatus('success')
        // Reset form data except defaults
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          serviceType: SERVICE_OPTIONS[0],
          budgetRange: BUDGET_RANGES[1],
          projectLocation: '',
          projectTimeline: TIMELINE_OPTIONS[1],
          projectDescription: '',
          consentToContact: true,
          honeypot: ''
        })
      } else {
        setSubmitStatus('error')
        setServerErrorMsg(result.error || 'Submission could not be completed. Please try again or reach out directly.')
      }
    } catch (err: any) {
      setSubmitStatus('error')
      setServerErrorMsg(err.message || 'An unexpected error occurred during submission.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white border border-neutral-200 p-6 sm:p-8 lg:p-10 shadow-sm relative">
      <div className="mb-8 border-b border-neutral-100 pb-5">
        <h3 className="text-2xl sm:text-3xl font-condensed font-bold uppercase tracking-tight text-brand-black">
          PROJECT INQUIRY DOSSIER
        </h3>
        <p className="text-neutral-500 text-sm mt-1 font-sans">
          Tell us about your studio, project, or brand vision. We respond within 24 to 48 business hours.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-8 p-6 bg-neutral-900 text-white border-l-4 border-brand-gold animate-in fade-in duration-300">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-condensed font-bold uppercase tracking-wider text-base text-brand-gold">
                Inquiry Successfully Received
              </h4>
              <p className="text-neutral-300 text-sm mt-1 leading-relaxed">
                Thank you for reaching out to Graphi Media House. Your project details have been securely recorded. Our leadership team will review your requirements and connect with you shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-5 bg-red-50 text-red-900 border-l-4 border-red-500 animate-in fade-in duration-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-condensed font-bold uppercase tracking-wider text-sm">
                Submission Notice
              </h4>
              <p className="text-red-700 text-xs mt-1">
                {serverErrorMsg}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Honeypot hidden input */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_bot_check">Leave this empty</label>
          <input
            id="website_bot_check"
            type="text"
            tabIndex={-1}
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            autoComplete="off"
          />
        </div>

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Full Name <span className="text-brand-gold">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              required
              maxLength={100}
              placeholder="e.g. Ar. Rajesh Mehta"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-3 bg-neutral-50 border text-sm text-brand-charcoal placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
                errors.fullName ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.fullName && <p className="text-red-600 text-xs mt-1.5">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Email Address <span className="text-brand-gold">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={120}
              placeholder="studio@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 bg-neutral-50 border text-sm text-brand-charcoal placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
                errors.email ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1.5">{errors.email}</p>}
          </div>
        </div>

        {/* Row 2: Phone & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Phone / WhatsApp <span className="text-brand-gold">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              maxLength={25}
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 bg-neutral-50 border text-sm text-brand-charcoal placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
                errors.phone ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.phone && <p className="text-red-600 text-xs mt-1.5">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="companyName" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Studio / Practice / Company Name
            </label>
            <input
              id="companyName"
              type="text"
              maxLength={120}
              placeholder="e.g. Atelier Urban Architects"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-sm text-brand-charcoal placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Service Type & Budget Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="serviceType" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Service Required <span className="text-brand-gold">*</span>
            </label>
            <select
              id="serviceType"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            >
              {SERVICE_OPTIONS.map((srv) => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="budgetRange" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Budget Range (INR)
            </label>
            <select
              id="budgetRange"
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            >
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <span className="block text-[11px] text-neutral-400 mt-1">
              Indicative range to tailor proposal scope appropriately.
            </span>
          </div>
        </div>

        {/* Row 4: Project Location & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="projectLocation" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Project Location
            </label>
            <input
              id="projectLocation"
              type="text"
              maxLength={100}
              placeholder="e.g. Surat, Ahmedabad, Mumbai, etc."
              value={formData.projectLocation}
              onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-sm text-brand-charcoal placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            />
          </div>

          <div>
            <label htmlFor="projectTimeline" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
              Expected Timeline
            </label>
            <select
              id="projectTimeline"
              value={formData.projectTimeline}
              onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            >
              {TIMELINE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-xs font-condensed font-bold uppercase tracking-editorial-wide text-brand-charcoal mb-2">
            Project Description & Objectives <span className="text-brand-gold">*</span>
          </label>
          <textarea
            id="projectDescription"
            rows={4}
            required
            maxLength={2500}
            placeholder="Tell us about the project typologies, architectural intent, specific deliverables required, and any pertinent deadlines..."
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            className={`w-full px-4 py-3 bg-neutral-50 border text-sm text-brand-charcoal placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
              errors.projectDescription ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.projectDescription && <p className="text-red-600 text-xs mt-1.5">{errors.projectDescription}</p>}
        </div>

        {/* Row 6: Consent Checkbox */}
        <div className="pt-1">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentToContact}
              onChange={(e) => setFormData({ ...formData, consentToContact: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-black focus:ring-brand-gold"
            />
            <span className="text-xs text-neutral-600 leading-relaxed font-sans">
              I consent to Graphi Media House processing my details to review this inquiry and contact me regarding this project. Details remain strictly confidential.
            </span>
          </label>
          {errors.consentToContact && <p className="text-red-600 text-xs mt-1.5">{errors.consentToContact}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[220px]"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                <span>SUBMITTING DOSSIER...</span>
              </span>
            ) : (
              <span>TRANSMIT INQUIRY</span>
            )}
          </Button>

          <span className="text-xs text-neutral-400 font-condensed tracking-editorial-wider uppercase">
            SECURE &bull; CONFIDENTIAL &bull; SURAT, INDIA
          </span>
        </div>
      </form>
    </div>
  )
}
