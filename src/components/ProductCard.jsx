// src/components/ProductCard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlineTag } from 'react-icons/hi'
import { useWhatsApp } from '../hooks/useWhatsApp'

function SkeletonCard() {
  return (
    <div className="bg-white/3 border border-white/5">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-9 w-full rounded" />
      </div>
    </div>
  )
}

export { SkeletonCard }

export default function ProductCard({ product }) {
  const { inquireProduct } = useWhatsApp()
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  if (!product) return <SkeletonCard />

  const {
    id, name, category, price, originalPrice,
    sizes = [], images = [], inStock = true
  } = product

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null

  const thumbnail = images[0] || `https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80`

  return (
    <div className="group relative bg-charcoal-800 border border-white/5 hover:border-gold-500/30 transition-all duration-300 card-hover">
      {/* Image */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden aspect-[3/4]">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80' : thumbnail}
          alt={name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true) }}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <span className="bg-gold-500 text-black text-[10px] font-bold px-2 py-0.5 tracking-widest uppercase">
              {discount}% OFF
            </span>
          )}
          {!inStock && (
            <span className="bg-black/80 text-white/60 text-[10px] font-bold px-2 py-0.5 tracking-widest uppercase border border-white/20">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick WhatsApp overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent p-4">
          <button
            onClick={(e) => { e.preventDefault(); inquireProduct(product) }}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold py-2.5 rounded-full transition-colors"
          >
            <FaWhatsapp size={15} />
            Inquire on WhatsApp
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center gap-1 text-gold-400/70 text-[10px] tracking-widest uppercase mb-1 font-mono">
          <HiOutlineTag size={11} />
          {category}
        </div>

        {/* Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-display text-white font-medium text-base leading-snug hover:text-gold-400 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-gold-400 font-bold text-lg">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-white/30 text-sm line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {sizes.slice(0, 5).map(s => (
              <span
                key={s}
                className="text-[10px] border border-white/10 text-white/40 px-2 py-0.5 font-mono"
              >
                {s}
              </span>
            ))}
            {sizes.length > 5 && (
              <span className="text-[10px] text-white/30">+{sizes.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
