// src/context/ProductsContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getAllProducts } from '../firebase/products'
import { SAMPLE_PRODUCTS } from '../assets/sampleData'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 10000])

  // Load products from Firestore (falls back to sample data)
  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllProducts()
      // If Firestore is empty / not configured, use sample data
      setAllProducts(data.length > 0 ? data : SAMPLE_PRODUCTS)
    } catch {
      setAllProducts(SAMPLE_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  // Filtered products
  const filteredProducts = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    return matchSearch && matchCategory && matchPrice
  })

  return (
    <ProductsContext.Provider value={{
      allProducts, filteredProducts, loading,
      searchQuery, setSearchQuery,
      selectedCategory, setSelectedCategory,
      priceRange, setPriceRange,
      refreshProducts: loadProducts,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
