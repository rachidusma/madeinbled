'use client'

import { useState, useEffect } from 'react'
import { sendContactEmail } from '../lib/actions'
import { useSearchParams } from 'next/navigation'

interface ContactFormProps {
  dictionary: any
}

export default function ContactForm({ dictionary }: ContactFormProps) {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [productInfo, setProductInfo] = useState<{ name: string; url: string } | null>(null)

  useEffect(() => {
    const product = searchParams.get('product')
    const url = searchParams.get('url')
    if (product && url) {
      setProductInfo({ name: product, url })
    }
  }, [searchParams])

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    const result = await sendContactEmail({
      ...formData,
      productLink: productInfo ? `${productInfo.name} (${productInfo.url})` : undefined
    })

    if (result.success) {
      setStatus('success')
      setFormData({
        name: '',
        company: '',
        country: '',
        email: '',
        message: ''
      })
    } else {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (include country code without + or spaces)
    const phoneNumber = '213556249103' // Update this with actual number
    const message = encodeURIComponent('Hello, I would like to inquire about your products.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* Hero Section with Stitch Loop Animation */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Stitch Loop Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stitchPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path 
                  d="M0 20 Q10 15, 20 20 T40 20" 
                  stroke="#FE6B01" 
                  strokeWidth="2" 
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-stitch"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stitchPattern)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#013765]">
            {dictionary.contact.title}
          </h1>
        
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {dictionary.contact.description}
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative Corner Stitches */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#FE6B01] rounded-tl-2xl stitch-corner"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#FE6B01] rounded-br-2xl stitch-corner"></div>

          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#013765] mb-4">Message Sent!</h3>
              <p className="text-gray-600 mb-8">Thank you for contacting us. We will get back to you shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[#FE6B01] font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              {productInfo && (
                <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FE6B01] text-white rounded-lg flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div>
                    <p className="text-xs text-[#FE6B01] font-bold uppercase tracking-wider">Inquiry for:</p>
                    <p className="text-[#013765] font-bold">{productInfo.name}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Failed to send message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="form-group">
              <label 
                htmlFor="name" 
                className="block text-sm font-semibold text-[#013765] mb-2"
              >
                {dictionary.contact.form.name}
              </label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01] focus:ring-opacity-20 transition-all duration-300 outline-none text-gray-900"
                placeholder={dictionary.contact.form.namePlaceholder}
              />
            </div>

            {/* Company Field */}
            <div className="form-group">
              <label 
                htmlFor="company" 
                className="block text-sm font-semibold text-[#013765] mb-2"
              >
                {dictionary.contact.form.company}
              </label>
              <input 
                type="text" 
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01] focus:ring-opacity-20 transition-all duration-300 outline-none text-gray-900"
                placeholder={dictionary.contact.form.companyPlaceholder}
              />
            </div>

            {/* Country Field */}
            <div className="form-group">
              <label 
                htmlFor="country" 
                className="block text-sm font-semibold text-[#013765] mb-2"
              >
                {dictionary.contact.form.country}
              </label>
              <input 
                type="text" 
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01] focus:ring-opacity-20 transition-all duration-300 outline-none text-gray-900"
                placeholder={dictionary.contact.form.countryPlaceholder}
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-[#013765] mb-2"
              >
                {dictionary.contact.form.email}
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01] focus:ring-opacity-20 transition-all duration-300 outline-none text-gray-900"
                placeholder={dictionary.contact.form.emailPlaceholder}
              />
            </div>

            {/* Message Field */}
            <div className="form-group">
              <label 
                htmlFor="message" 
                className="block text-sm font-semibold text-[#013765] mb-2"
              >
                {dictionary.contact.form.message}
              </label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01] focus:ring-opacity-20 transition-all duration-300 outline-none resize-none text-gray-900"
                placeholder={dictionary.contact.form.messagePlaceholder}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full sm:w-auto bg-gradient-to-r from-[#FE6B01] to-[#ff8534] text-white px-12 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#ff8534] hover:to-[#FE6B01] disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
              >
                {status === 'loading' && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {status === 'loading' ? 'Sending...' : dictionary.contact.form.submit}
              </button>
            </div>
          </form>
          </>
          )}
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Contact us on WhatsApp"
      >
        <svg 
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </span>
      </button>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes stitch {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 20;
          }
        }

        .animate-stitch {
          animation: stitch 2s linear infinite;
        }

        .stitch-corner {
          border-style: dashed;
        }

        .form-group {
          position: relative;
        }

        .form-group input:focus + label,
        .form-group textarea:focus + label {
          color: #FE6B01;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* WhatsApp button pulse animation */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  )
}
