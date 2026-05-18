// src/pages/ContactPage.jsx
import React from 'react'
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { HiClock, HiMail } from 'react-icons/hi'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from '../components/SectionHeader'

export default function ContactPage() {
  const { generalInquiry } = useWhatsApp()
  useScrollReveal()

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Get In Touch"
        title="Contact V Brothers"
        subtitle="We'd love to help you find the perfect outfit. Reach out to us anytime."
      />

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Info panel */}
        <div className="space-y-8 reveal">
          {/* Store card */}
          <div className="glass-card gold-border p-8 space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-1">V Brothers</h2>
              <p className="text-gold-400 text-sm tracking-widest uppercase font-mono">
                Premium Men's Fashion Store
              </p>
            </div>

            <div className="space-y-5">
              <InfoRow icon={<FaMapMarkerAlt className="text-gold-400" />} label="Location">
                Rampur Bazar, Jaunpur,<br />Uttar Pradesh, India — 222001
              </InfoRow>

              <InfoRow icon={<FaPhone className="text-gold-400" />} label="Phone / WhatsApp">
                <a href="tel:+918528026985" className="hover:text-gold-400 transition-colors">
                  +91 85280 26985
                </a>
              </InfoRow>

              <InfoRow icon={<HiMail className="text-gold-400" />} label="Owner">
                Rajneesh (V Brothers)
              </InfoRow>

              <InfoRow icon={<HiClock className="text-gold-400" />} label="Shop Hours">
                Monday – Saturday: 10:00 AM – 9:00 PM<br />
                Sunday: 11:00 AM – 7:00 PM
              </InfoRow>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={generalInquiry}
              className="flex-1 flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 text-sm tracking-wider uppercase"
            >
              <FaWhatsapp size={20} />
              Chat on WhatsApp
            </button>
            <a
              href="tel:+918528026985"
              className="flex-1 flex items-center justify-center gap-3 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black font-semibold py-4 px-6 transition-all duration-200 text-sm tracking-wider uppercase"
            >
              <FaPhone size={16} />
              Call Now
            </a>
          </div>

          {/* Quick message */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg text-white mb-4">Send a Quick Message</h3>
            <div className="space-y-3">
              {[
                'I want to see your latest shirts collection',
                'Tell me about ethnic wear for a wedding',
                'What jeans sizes do you have?',
                'I need a complete outfit for a formal event',
              ].map(msg => (
                <button
                  key={msg}
                  onClick={() => {
                    const PHONE = '918528026985'
                    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
                  }}
                  className="w-full text-left text-sm text-white/50 hover:text-gold-400 border border-white/5 hover:border-gold-500/30 px-4 py-3 transition-all duration-150 flex items-center justify-between group"
                >
                  <span>"{msg}"</span>
                  <FaWhatsapp size={14} className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="space-y-5 reveal">
          <div className="overflow-hidden border border-white/10 aspect-video md:aspect-auto md:h-96 lg:h-[500px]">
            <iframe
              title="V Brothers Location – Jaunpur"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.5!2d82.6837!3d25.7469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fd0c31a8e0b1b%3A0x1234567890abcdef!2sRampur%20Bazar%2C%20Jaunpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Directions card */}
          <div className="glass-card p-6">
            <h3 className="font-display text-lg text-white mb-3">How to Reach Us</h3>
            <ul className="space-y-2 text-white/50 text-sm">
              <li className="flex gap-2">
                <span className="text-gold-400">→</span>
                Located in Rampur Bazar market area, Jaunpur
              </li>
              <li className="flex gap-2">
                <span className="text-gold-400">→</span>
                Near the main market road — easy auto/rickshaw access
              </li>
              <li className="flex gap-2">
                <span className="text-gold-400">→</span>
                Ask locals for "V Brothers kapde ki dukan"
              </li>
            </ul>
            <a
              href="https://maps.google.com/?q=Rampur+Bazar+Jaunpur+Uttar+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 btn-outline-gold inline-block text-xs"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 shrink-0 w-5">{icon}</div>
      <div>
        <p className="text-white/30 text-xs tracking-widest uppercase font-mono mb-1">{label}</p>
        <div className="text-white/70 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
