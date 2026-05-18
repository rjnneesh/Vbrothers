// src/pages/ShopPage.jsx
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HiSearch, HiAdjustments, HiX } from 'react-icons/hi'
import { useProducts } from '../context/ProductsContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { CATEGORIES } from '../assets/sampleData'
import ProductCard, { SkeletonCard } from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const {
    filteredProducts, loading,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
  } = useProducts()

  const [showFilters, setShowFilters] = useState(false)
  useScrollReveal()

  // Sync URL params → context on mount
  useEffect(() => {
    const q = searchParams.get('search')
    const cat = searchParams.get('category')
    if (q) setSearchQuery(q)
    if (cat) setSelectedCategory(cat)
  }, []) // eslint-disable-line

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Men's Wear Collection"
        title="All Products"
        subtitle="Browse our full range of premium menswear."
      />

      {/* Search + Filter bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-8 reveal">
        {/* Search input */}
        <div className="relative flex-1">
          <HiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-dark pl-11 pr-4"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <HiX size={16} />
            </button>
          )}
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(v => !v)}
          className="flex items-center gap-2 border border-white/10 text-white/70 hover:border-gold-500 hover:text-gold-400 px-5 py-3 text-sm transition-colors md:hidden"
        >
          <HiAdjustments size={18} />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters — desktop always visible, mobile toggleable */}
        <aside
          className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 lg:w-64 shrink-0 space-y-8`}
        >
          {/* Category filter */}
          <div>
            <h3 className="text-white/60 text-xs tracking-widest uppercase font-mono mb-4">
              Category
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map(c => (
                <li key={c}>
                  <button
                    onClick={() => setSelectedCategory(c)}
                    className={`w-full text-left px-3 py-2 text-sm transition-all duration-150 ${
                      selectedCategory === c
                        ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-500'
                        : 'text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price range */}
          <div>
            <h3 className="text-white/60 text-xs tracking-widest uppercase font-mono mb-4">
              Price Range
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min={0}
                max={10000}
                step={100}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-gold-500"
              />
              <div className="flex justify-between text-white/40 text-xs font-mono">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Quick price presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { label: 'Under ₹500', range: [0, 500] },
                { label: '₹500–₹2k', range: [500, 2000] },
                { label: 'Above ₹2k', range: [2000, 10000] },
              ].map(p => (
                <button
                  key={p.label}
                  onClick={() => setPriceRange(p.range)}
                  className="text-[11px] border border-white/10 text-white/40 hover:border-gold-500 hover:text-gold-400 px-2 py-1 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('All')
              setPriceRange([0, 10000])
            }}
            className="text-white/30 hover:text-gold-400 text-xs tracking-widest uppercase transition-colors"
          >
            Reset Filters
          </button>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {/* Results count */}
          <p className="text-white/30 text-sm mb-6 font-mono">
            {loading ? 'Loading…' : `${filteredProducts.length} products found`}
          </p>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-6xl mb-4">🕵️</span>
              <p className="font-display text-2xl text-white mb-2">No products found</p>
              <p className="text-white/40 text-sm">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
