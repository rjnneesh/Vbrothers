// src/admin/AdminDashboard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { HiCollection, HiPlus, HiCheckCircle, HiXCircle } from 'react-icons/hi'
import { useProducts } from '../context/ProductsContext'
import { CATEGORIES } from '../assets/sampleData'

function StatCard({ icon, label, value, color = 'gold' }) {
  return (
    <div className="glass-card border border-white/5 p-6 flex items-center gap-5">
      <div className={`w-12 h-12 flex items-center justify-center rounded-none
        ${color === 'gold' ? 'bg-gold-500/10 text-gold-400' :
          color === 'green' ? 'bg-green-500/10 text-green-400' :
          'bg-red-500/10 text-red-400'}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-white/40 text-xs tracking-widest uppercase font-mono">{label}</p>
        <p className="text-white font-bold text-2xl font-display mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { allProducts } = useProducts()
  const inStock = allProducts.filter(p => p.inStock !== false).length
  const outOfStock = allProducts.length - inStock

  const categoryCount = CATEGORIES.filter(c => c !== 'All').map(cat => ({
    name: cat,
    count: allProducts.filter(p => p.category === cat).length,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">V Brothers Store Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<HiCollection size={24} />}
          label="Total Products"
          value={allProducts.length}
          color="gold"
        />
        <StatCard
          icon={<HiCheckCircle size={24} />}
          label="In Stock"
          value={inStock}
          color="green"
        />
        <StatCard
          icon={<HiXCircle size={24} />}
          label="Out of Stock"
          value={outOfStock}
          color="red"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/add-product"
          className="glass-card border border-gold-500/20 hover:border-gold-500/50 p-6 flex items-center gap-4 transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-gold-500/10 group-hover:bg-gold-500/20 flex items-center justify-center transition-colors">
            <HiPlus size={20} className="text-gold-400" />
          </div>
          <div>
            <p className="text-white font-semibold">Add New Product</p>
            <p className="text-white/40 text-sm">Upload a new item to the store</p>
          </div>
        </Link>

        <Link
          to="/admin/products"
          className="glass-card border border-white/5 hover:border-white/20 p-6 flex items-center gap-4 transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
            <HiCollection size={20} className="text-white/60" />
          </div>
          <div>
            <p className="text-white font-semibold">Manage Products</p>
            <p className="text-white/40 text-sm">Edit, delete, mark stock status</p>
          </div>
        </Link>
      </div>

      {/* Category breakdown */}
      <div className="glass-card border border-white/5 p-6">
        <h2 className="font-display text-xl text-white font-semibold mb-6">
          Products by Category
        </h2>
        <div className="space-y-4">
          {categoryCount.map(c => (
            <div key={c.name} className="flex items-center gap-4">
              <span className="text-white/50 text-sm w-28 shrink-0">{c.name}</span>
              <div className="flex-1 bg-white/5 h-2">
                <div
                  className="h-2 bg-gold-500 transition-all duration-700"
                  style={{
                    width: allProducts.length > 0
                      ? `${(c.count / allProducts.length) * 100}%`
                      : '0%'
                  }}
                />
              </div>
              <span className="text-white/40 text-xs font-mono w-6 text-right">
                {c.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
