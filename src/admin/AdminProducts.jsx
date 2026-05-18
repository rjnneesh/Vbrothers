// src/admin/AdminProducts.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiPencil, HiTrash, HiPlus, HiSearch } from 'react-icons/hi'
import { FaBoxOpen } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { deleteProduct, updateProduct } from '../firebase/products'
import { useProducts } from '../context/ProductsContext'

export default function AdminProducts() {
  const { allProducts, loading, refreshProducts } = useProducts()
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState(null)
  const [toggling, setToggling] = useState(null)

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setDeleting(product.id)
    try {
      await deleteProduct(product.id, product.images || [])
      toast.success('Product deleted')
      refreshProducts()
    } catch {
      toast.error('Failed to delete product')
    } finally {
      setDeleting(null)
    }
  }

  const toggleStock = async (product) => {
    setToggling(product.id)
    try {
      await updateProduct(product.id, { inStock: !product.inStock })
      toast.success(`Marked as ${product.inStock ? 'Out of Stock' : 'In Stock'}`)
      refreshProducts()
    } catch {
      toast.error('Update failed')
    } finally {
      setToggling(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Products</h1>
          <p className="text-white/40 text-sm mt-1">
            {allProducts.length} total products
          </p>
        </div>
        <Link to="/admin/add-product" className="btn-gold flex items-center gap-2 w-fit">
          <HiPlus size={18} />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <HiSearch
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-dark pl-10 text-sm"
        />
      </div>

      {/* Table */}
      <div className="glass-card border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-white/30 text-xs tracking-widest uppercase font-mono px-6 py-4">
                  Product
                </th>
                <th className="text-left text-white/30 text-xs tracking-widest uppercase font-mono px-4 py-4 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left text-white/30 text-xs tracking-widest uppercase font-mono px-4 py-4">
                  Price
                </th>
                <th className="text-left text-white/30 text-xs tracking-widest uppercase font-mono px-4 py-4 hidden sm:table-cell">
                  Status
                </th>
                <th className="text-right text-white/30 text-xs tracking-widest uppercase font-mono px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {Array(5).fill(0).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="skeleton h-4 rounded w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <FaBoxOpen size={40} className="text-white/20 mx-auto mb-3" />
                    <p className="text-white/30 text-sm">No products found</p>
                  </td>
                </tr>
              ) : (
                filtered.map(product => (
                  <tr
                    key={product.id}
                    className="border-b border-white/5 hover:bg-white/2 transition-colors"
                  >
                    {/* Product info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=80&q=60'}
                          alt={product.name}
                          className="w-10 h-10 object-cover border border-white/10 shrink-0"
                        />
                        <span className="text-white font-medium truncate max-w-[180px]">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 text-white/40 hidden md:table-cell">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 text-gold-400 font-mono font-medium">
                      ₹{product.price?.toLocaleString()}
                    </td>

                    {/* Stock toggle */}
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <button
                        onClick={() => toggleStock(product)}
                        disabled={toggling === product.id}
                        className={`text-xs px-3 py-1 border font-mono transition-all ${
                          product.inStock !== false
                            ? 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                            : 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                        } disabled:opacity-50`}
                      >
                        {toggling === product.id
                          ? '…'
                          : product.inStock !== false
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="p-2 text-white/40 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
                          title="Edit"
                        >
                          <HiPencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product)}
                          disabled={deleting === product.id}
                          className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <HiTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
