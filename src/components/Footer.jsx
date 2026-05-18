// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { useWhatsApp } from '../hooks/useWhatsApp'

export default function Footer() {
  const { generalInquiry } = useWhatsApp()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-900 border-t border-white/5">
      {/* Top CTA strip */}
      <div className="bg-gold-500/10 border-b border-gold-500/20 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl text-white font-semibold">
              Ready to upgrade your wardrobe?
            </p>
            <p className="text-white/50 text-sm mt-1">
              Chat with us directly on WhatsApp for personalised style advice.
            </p>
          </div>
          <button
            onClick={generalInquiry}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 whitespace-nowrap"
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex flex-col leading-none mb-4">
            <span className="font-display text-2xl font-bold text-gold-gradient">V Brothers</span>
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-mono">
              Premium Menswear
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed">
            Your trusted destination for premium men's fashion in Jaunpur.
            Curated styles for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'Home', to: '/' },
              { label: 'Shop All', to: '/shop' },
              { label: 'Categories', to: '/categories' },
              { label: 'New Arrivals', to: '/shop?filter=new' },
              { label: 'Contact Us', to: '/contact' },
            ].map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-white/40 hover:text-gold-400 text-sm transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
            Categories
          </h4>
          <ul className="space-y-3">
            {['Shirts', 'T-Shirts', 'Jeans', 'Kurta', 'Jackets', 'Ethnic Wear'].map(c => (
              <li key={c}>
                <Link
                  to={`/shop?category=${c}`}
                  className="text-white/40 hover:text-gold-400 text-sm transition-colors duration-200"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
            Visit Us
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-white/40 text-sm">
              <FaMapMarkerAlt className="text-gold-400 mt-0.5 shrink-0" size={15} />
              <span>Rampur Bazar, Jaunpur,<br />Uttar Pradesh, India</span>
            </li>
            <li>
              <a
                href="tel:+918528026985"
                className="flex gap-3 text-white/40 hover:text-gold-400 text-sm transition-colors"
              >
                <FaPhone className="text-gold-400 mt-0.5 shrink-0" size={14} />
                +91 85280 26985
              </a>
            </li>
            <li>
              <button
                onClick={generalInquiry}
                className="flex gap-3 text-white/40 hover:text-green-400 text-sm transition-colors"
              >
                <FaWhatsapp className="text-green-400 mt-0.5 shrink-0" size={16} />
                WhatsApp us
              </button>
            </li>
            <li className="flex gap-3 text-white/40 text-sm">
              <HiMail className="text-gold-400 mt-0.5 shrink-0" size={16} />
              <span>Owner: Rajneesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-white/25 text-xs">
          <span>© {year} V Brothers. All rights reserved.</span>
          <Link to="/admin/login" className="hover:text-white/50 transition-colors">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  )
}
