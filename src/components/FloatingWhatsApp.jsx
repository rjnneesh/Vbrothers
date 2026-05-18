// src/components/FloatingWhatsApp.jsx
import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'
import { useWhatsApp } from '../hooks/useWhatsApp'

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true)
  const { generalInquiry } = useWhatsApp()

  return (
    <div className="floating-whatsapp flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="relative bg-white text-gray-800 text-sm font-medium px-4 py-2.5 rounded-2xl rounded-br-sm shadow-xl flex items-center gap-2 max-w-[200px]">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-0.5"
          >
            <HiX size={12} className="text-gray-600" />
          </button>
          Chat with us!
          <br />
          <span className="text-xs text-gray-500">We reply instantly</span>
        </div>
      )}
      <button
        onClick={generalInquiry}
        className="w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-200 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} className="text-white" />
      </button>
    </div>
  )
}
