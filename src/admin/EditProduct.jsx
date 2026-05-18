// src/admin/EditProduct.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import ProductForm from './ProductForm'

export default function EditProduct() {
  const { id } = useParams()
  const { allProducts } = useProducts()
  const product = allProducts.find(p => p.id === id)

  if (!product) {
    return (
      <div className="text-white/40 text-center py-20">
        <p className="font-display text-2xl text-white mb-2">Product not found</p>
        <p className="text-sm">It may have been deleted or the ID is incorrect.</p>
      </div>
    )
  }

  return <ProductForm existing={product} />
}
