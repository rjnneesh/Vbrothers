// src/admin/AdminLayout.jsx
import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  HiViewGrid, HiPlus, HiCollection, HiLogout, HiMenu, HiX
} from 'react-icons/hi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/admin/dashboard', icon: <HiViewGrid size={18} />, label: 'Dashboard' },
  { to: '/admin/products', icon: <HiCollection size={18} />, label: 'Products' },
  { to: '/admin/add-product', icon: <HiPlus size={18} />, label: 'Add Product' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-charcoal-900 border-r border-white/5 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5">
          <p className="font-display text-xl font-bold text-gold-gradient">V Brothers</p>
          <p className="text-white/30 text-[10px] tracking-widest uppercase font-mono mt-1">
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-white/40 hover:text-red-400 text-sm font-medium w-full px-4 py-3 hover:bg-red-500/5 transition-all"
          >
            <HiLogout size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-charcoal-900/80 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(v => !v)}
          >
            {sidebarOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
          <div className="hidden md:block">
            <p className="text-white/40 text-xs font-mono">Welcome back,</p>
            <p className="text-white font-semibold text-sm">Rajneesh 👋</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/40 hover:text-red-400 text-xs transition-colors"
          >
            <HiLogout size={15} />
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
