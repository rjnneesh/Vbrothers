// src/components/SectionHeader.jsx
import React from 'react'

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  const textAlign = align === 'left' ? 'text-left' : 'text-center'
  const itemsAlign = align === 'left' ? 'items-start' : 'items-center'

  return (
    <div className={`flex flex-col ${itemsAlign} gap-3 mb-12 reveal`}>
      {eyebrow && (
        <span className="text-gold-400 text-xs tracking-[0.35em] uppercase font-mono">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white ${textAlign}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-white/40 text-base md:text-lg max-w-xl leading-relaxed ${textAlign}`}>
          {subtitle}
        </p>
      )}
      <div className={`flex gap-2 mt-1 ${align === 'left' ? '' : 'justify-center'}`}>
        <div className="h-px w-12 bg-gold-500" />
        <div className="h-px w-4 bg-gold-500/40" />
      </div>
    </div>
  )
}
