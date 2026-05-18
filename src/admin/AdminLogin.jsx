// src/admin/AdminLogin.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiEye, HiEyeOff, HiLockClosed } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back, Rajneesh!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-4xl font-bold text-gold-gradient">V Brothers</p>
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-mono mt-2">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="glass-card border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
              <HiLockClosed size={16} className="text-gold-400" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">Admin Login</h1>
              <p className="text-white/30 text-xs">Manage V Brothers store</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-white/50 text-xs tracking-widest uppercase font-mono mb-2">
                Email Address
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="admin@vbrothers.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-dark"
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs tracking-widest uppercase font-mono mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-dark pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  {showPass ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-6">
            Only authorized admins can access this panel.
          </p>
        </div>

        <p className="text-center mt-6 text-white/20 text-xs">
          © {new Date().getFullYear()} V Brothers, Jaunpur
        </p>
      </div>
    </div>
  )
}
