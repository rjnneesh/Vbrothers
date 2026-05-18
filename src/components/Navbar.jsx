// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HiMenu, HiX, HiSearch } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { useWhatsApp } from '../hooks/useWhatsApp'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const navigate = useNavigate()
  const { generalInquiry } = useWhatsApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`)
      setSearchOpen(false)
      setSearchVal('')
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-2xl font-bold text-gold-gradient tracking-wider">
              V Brothers
            </span>
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-mono">
              Premium Menswear
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm tracking-widest uppercase font-medium transition-colors duration-200 relative group ${
                      isActive ? 'text-gold-400' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-gold-500 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Search"
            >
              <HiSearch size={20} />
            </button>

            {/* WhatsApp */}
            <button
              onClick={generalInquiry}
              className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 tracking-wider uppercase"
            >
              <FaWhatsapp size={16} />
              WhatsApp
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-black/95 border-t border-white/5 px-4 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase font-medium transition-colors ${
                    isActive ? 'text-gold-400' : 'text-white/70'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => { generalInquiry(); setMenuOpen(false) }}
              className="flex items-center gap-2 bg-green-600 text-white text-xs font-semibold px-4 py-3 rounded-full w-fit tracking-wider uppercase mt-2"
            >
              <FaWhatsapp size={16} />
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-start justify-center pt-32 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
        >
          <form onSubmit={handleSearch} className="w-full max-w-xl">
            <div className="relative">
              <HiSearch
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400"
              />
              <input
                autoFocus
                type="text"
                placeholder="Search for shirts, kurtas, jeans…"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="w-full bg-white/5 border border-gold-500/40 text-white placeholder-white/30 pl-12 pr-14 py-4 text-lg focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <HiX size={22} />
              </button>
            </div>
            <p className="text-white/30 text-xs mt-3 text-center tracking-wider">
              Press Enter to search · Esc to close
            </p>
          </form>
        </div>
      )}
    </>
  )
}
