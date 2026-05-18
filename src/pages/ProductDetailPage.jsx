// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa'
import { HiOutlineTag, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useProducts } from '../context/ProductsContext'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProductCard, { SkeletonCard } from '../components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { allProducts, loading } = useProducts()
  const { inquireProduct } = useWhatsApp()
  const [selectedImg, setSelectedImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  useScrollReveal()

  const product = allProducts.find(p => p.id === id)
  const related = product
    ? allProducts.filter(p => p.category === product.category && p.id !== id).slice(0, 4)
    : []

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setSelectedImg(0)
    setSelectedSize(null)
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="skeleton aspect-square w-full" />
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4 rounded" />
            <div className="skeleton h-6 w-1/2 rounded" />
            <div className="skeleton h-24 w-full rounded" />
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
        <p className="font-display text-4xl text-white mb-4">Product not found</p>
        <Link to="/shop" className="btn-gold mt-4 inline-block">Browse Shop</Link>
      </main>
    )
  }

  const {
    name, category, price, originalPrice,
    sizes = [], images = [], description, inStock, tags = []
  } = product

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null

  const imgs = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80']

  const prevImg = () => setSelectedImg(i => (i - 1 + imgs.length) % imgs.length)
  const nextImg = () => setSelectedImg(i => (i + 1) % imgs.length)

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-white/30 text-sm mb-8 reveal">
        <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-gold-400 transition-colors">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${category}`} className="hover:text-gold-400 transition-colors">
          {category}
        </Link>
        <span>/</span>
        <span className="text-white/60 truncate max-w-[200px]">{name}</span>
      </div>

      {/* Product layout */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-4 reveal">
          {/* Main image */}
          <div className="relative overflow-hidden aspect-[4/5] bg-charcoal-800 border border-white/5">
            <img
              src={imgs[selectedImg]}
              alt={name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {!inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-black/80 border border-white/20 text-white/60 px-6 py-3 text-sm tracking-widest uppercase font-mono">
                  Out of Stock
                </span>
              </div>
            )}
            {discount && (
              <div className="absolute top-4 left-4 bg-gold-500 text-black text-xs font-bold px-3 py-1 tracking-widest uppercase">
                {discount}% OFF
              </div>
            )}
            {/* Arrows */}
            {imgs.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black flex items-center justify-center text-white transition-colors"
                >
                  <HiChevronLeft size={22} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black flex items-center justify-center text-white transition-colors"
                >
                  <HiChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {imgs.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`shrink-0 w-20 h-20 overflow-hidden border-2 transition-colors ${
                    selectedImg === i ? 'border-gold-500' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6 reveal">
          {/* Category */}
          <div className="flex items-center gap-1 text-gold-400 text-xs tracking-widest uppercase font-mono">
            <HiOutlineTag size={12} />
            {category}
          </div>

          {/* Name */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            {name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-gold-400 font-bold text-3xl">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && (
              <>
                <span className="text-white/30 text-xl line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="text-green-400 text-sm font-semibold">
                  Save ₹{(originalPrice - price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* Availability */}
          <div className={`flex items-center gap-2 text-sm font-medium ${inStock ? 'text-green-400' : 'text-red-400'}`}>
            <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-400' : 'bg-red-400'}`} />
            {inStock ? 'In Stock' : 'Out of Stock'}
          </div>

          {/* Description */}
          <p className="text-white/60 text-base leading-relaxed border-t border-white/5 pt-6">
            {description}
          </p>

          {/* Sizes */}
          {sizes.length > 0 && (
            <div>
              <p className="text-white/50 text-xs tracking-widest uppercase font-mono mb-3">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] py-2 px-3 border text-sm font-mono transition-all duration-150 ${
                      selectedSize === s
                        ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                        : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <span
                  key={t}
                  className="text-[11px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
            <button
              onClick={() => inquireProduct(product)}
              disabled={!inStock}
              className="flex-1 flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 transition-all duration-200 text-sm tracking-wider uppercase rounded-full"
            >
              <FaWhatsapp size={18} />
              Inquire on WhatsApp
            </button>
            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 border border-white/10 hover:border-gold-500 text-white/60 hover:text-gold-400 py-4 px-5 transition-all duration-200 text-sm"
            >
              <FaArrowLeft size={14} />
              Back
            </Link>
          </div>

          {/* Store info */}
          <div className="glass-card p-4 text-sm text-white/40 leading-relaxed">
            📍 Visit us at <strong className="text-white/70">V Brothers</strong>, Rampur Bazar,
            Jaunpur, UP. Call/WhatsApp:{' '}
            <a href="tel:+918528026985" className="text-gold-400 hover:underline">
              +91 85280 26985
            </a>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24 reveal">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              You May Also Like
            </h2>
            <Link to={`/shop?category=${category}`} className="text-gold-400 text-sm hover:underline">
              View all {category}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  )
}
