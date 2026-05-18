// src/components/CategoryCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const CATEGORY_IMAGES = {
  Shirts: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80',
  'T-Shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  Jeans: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
  Kurta: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=400&q=80',
  Jackets: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
  Trousers: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80',
  'Ethnic Wear': 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&q=80',
}

export default function CategoryCard({ name }) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(name)}`}
      className="group relative overflow-hidden aspect-square block"
    >
      <img
        src={CATEGORY_IMAGES[name] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80'}
        alt={name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Gold border on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500 transition-all duration-300" />
      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <p className="font-display text-white font-semibold text-lg leading-none group-hover:text-gold-400 transition-colors duration-200">
          {name}
        </p>
        <p className="text-white/40 text-xs tracking-widest uppercase mt-1 group-hover:text-white/70 transition-colors">
          Explore →
        </p>
      </div>
    </Link>
  )
}
