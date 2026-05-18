// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Context providers
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'

// Layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CategoriesPage from './pages/CategoriesPage'
import ContactPage from './pages/ContactPage'

// Admin pages
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminProducts from './admin/AdminProducts'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'

// Public layout wrapper
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-charcoal-900 flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <BrowserRouter>
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1a1a1a',
                color: '#f5f5f0',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 0,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#C9A227', secondary: '#1a1a1a' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#1a1a1a' },
              },
            }}
          />

          <Routes>
            {/* ── Public routes ── */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/shop"
              element={
                <PublicLayout>
                  <ShopPage />
                </PublicLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PublicLayout>
                  <ProductDetailPage />
                </PublicLayout>
              }
            />
            <Route
              path="/categories"
              element={
                <PublicLayout>
                  <CategoriesPage />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactPage />
                </PublicLayout>
              }
            />

            {/* ── Admin routes ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Route>

            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <p className="font-display text-8xl font-bold text-gold-500/20 mb-4">404</p>
                    <p className="font-display text-3xl text-white mb-3">Page Not Found</p>
                    <p className="text-white/40 mb-8">
                      The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="btn-gold">Go Home</a>
                  </div>
                </PublicLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </AuthProvider>
  )
}
