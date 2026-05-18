// src/pages/HomePage.jsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useProducts } from '../context/ProductsContext'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { CATEGORIES } from '../assets/sampleData'
import ProductCard, { SkeletonCard } from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import SectionHeader from '../components/SectionHeader'

// ─── Hero Section ─────────────────────────────────────────────
function Hero() {
  const { generalInquiry } = useWhatsApp()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=85')`,
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Gold grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 md:py-0">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="hero-animate hero-animate-delay-1 flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.35em] uppercase font-mono flex items-center gap-1">
              <HiOutlineSparkles size={12} />
              Jaunpur's Finest
            </span>
          </div>

          {/* Main heading */}
          <h1 className="hero-animate hero-animate-delay-2 font-display font-bold leading-[1.05] mb-6">
            <span className="block text-5xl md:text-7xl lg:text-8xl text-white">
              V Brothers
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl text-gold-gradient mt-2">
              Premium Men's Fashion
            </span>
          </h1>

          {/* Tagline */}
          <p className="hero-animate hero-animate-delay-3 text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Discover curated menswear collections — from classic kurtas to modern
            streetwear. Dressed for every moment.
          </p>

          {/* CTA buttons */}
          <div className="hero-animate hero-animate-delay-4 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="group flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-black font-semibold px-8 py-4 transition-all duration-200 tracking-wider uppercase text-sm"
            >
              Explore Collection
              <FaArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <button
              onClick={generalInquiry}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-green-500 text-white font-semibold px-8 py-4 transition-all duration-200 tracking-wider uppercase text-sm"
            >
              <FaWhatsapp size={18} className="text-green-400" />
              WhatsApp Us
            </button>
          </div>

          {/* Trust badges */}
          <div className="hero-animate hero-animate-delay-4 flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { num: '500+', label: 'Products' },
              { num: '5★', label: 'Rating' },
              { num: '10+', label: 'Years in Business' },
            ].map(b => (
              <div key={b.label}>
                <p className="font-display text-2xl font-bold text-gold-400">{b.num}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-gold-500/0 to-gold-500" />
      </div>
    </section>
  )
}

// ─── Offer Banner ─────────────────────────────────────────────
function OfferBanner() {
  const { generalInquiry } = useWhatsApp()
  return (
    <section className="relative overflow-hidden bg-gold-500 py-16 px-4 reveal">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(0,0,0,0.1) 20px,
            rgba(0,0,0,0.1) 40px
          )`,
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-black/60 text-xs tracking-[0.4em] uppercase font-mono mb-3">
          Limited Time Offer
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-black mb-4">
          Up to 40% Off
        </h2>
        <p className="text-black/70 text-lg mb-8 max-w-lg mx-auto">
          On select ethnic wear and premium shirts. Message us to know which
          products are on sale today.
        </p>
        <button
          onClick={generalInquiry}
          className="inline-flex items-center gap-3 bg-black text-white font-semibold px-8 py-4 hover:bg-black/80 transition-all duration-200 tracking-wider uppercase text-sm"
        >
          <FaWhatsapp size={18} />
          Claim Your Offer
        </button>
      </div>
    </section>
  )
}

// ─── Why Us / Features strip ──────────────────────────────────
function WhyUs() {
  const features = [
    { icon: '✦', title: 'Premium Quality', desc: 'Carefully sourced fabrics and fine stitching on every piece.' },
    { icon: '✦', title: 'Latest Styles', desc: 'New arrivals every week — always ahead of the trend.' },
    { icon: '✦', title: 'Best Prices', desc: 'Premium fashion at prices that make sense for Jaunpur.' },
    { icon: '✦', title: 'Fast WhatsApp Service', desc: 'Ask us anything. We reply instantly on WhatsApp.' },
  ]
  return (
    <section className="py-20 px-4 bg-charcoal-800/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="reveal flex flex-col gap-3 group">
            <span className="text-gold-400 text-xl">{f.icon}</span>
            <h3 className="font-display text-white font-semibold text-lg group-hover:text-gold-400 transition-colors">
              {f.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Main HomePage ────────────────────────────────────────────
export default function HomePage() {
  const { allProducts, loading } = useProducts()
  useScrollReveal()

  const featured = allProducts.filter(p => p.featured).slice(0, 4)
  const newArrivals = [...allProducts].reverse().slice(0, 4)
  const categories = CATEGORIES.filter(c => c !== 'All')

  return (
    <main>
      <Hero />

      <WhyUs />

      {/* Categories grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Browse by Category"
          title="Shop Your Style"
          subtitle="From classic formals to festive ethnics — find it all under one roof."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 reveal">
          {categories.map(c => (
            <CategoryCard key={c} name={c} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-charcoal-800/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Hand-picked"
            title="Featured Collection"
            subtitle="Our most loved pieces — chosen for style, quality and value."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : featured.map(p => <ProductCard key={p.id} product={p} />)
            }
          </div>
          <div className="text-center mt-12 reveal">
            <Link to="/shop" className="btn-outline-gold inline-flex items-center gap-2">
              View All Products <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <OfferBanner />

      {/* New Arrivals */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Just In"
          title="New Arrivals"
          subtitle="Fresh stock added every week. Be the first to grab the latest styles."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : newArrivals.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>
        <div className="text-center mt-12 reveal">
          <Link to="/shop" className="btn-gold inline-flex items-center gap-2">
            Shop All New Arrivals <FaArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* Testimonial / store photo strip */}
      <section className="py-24 px-4 bg-gradient-to-b from-charcoal-800/30 to-black">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-mono">
            Our Happy Customers Say
          </span>
          <blockquote className="font-display text-3xl md:text-4xl text-white font-medium mt-6 leading-relaxed">
            "Best men's shop in Jaunpur. Quality is top-notch and prices are
            very reasonable. Rajneesh bhai gives great style advice!"
          </blockquote>
          <cite className="not-italic text-white/40 text-sm mt-6 block tracking-widest uppercase">
            — Regular Customer, Jaunpur
          </cite>
        </div>
      </section>
    </main>
  )
}
