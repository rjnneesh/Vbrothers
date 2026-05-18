// // src/admin/ProductForm.jsx
// // Reusable form for Add and Edit product pages

// import React, { useState, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { HiPhotograph, HiX, HiSave } from 'react-icons/hi'
// import toast from 'react-hot-toast'
// import { addProduct, updateProduct, uploadImage } from '../firebase/products'
// import { useProducts } from '../context/ProductsContext'
// import { CATEGORIES } from '../assets/sampleData'

// const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40']

// const EMPTY = {
//   name: '',
//   category: 'Shirts',
//   price: '',
//   originalPrice: '',
//   description: '',
//   sizes: [],
//   tags: '',
//   featured: false,
//   inStock: true,
// }

// export default function ProductForm({ existing = null }) {
//   const isEdit = !!existing
//   const navigate = useNavigate()
//   const { refreshProducts } = useProducts()
//   const fileRef = useRef()

//   const [form, setForm] = useState(
//     isEdit
//       ? {
//           ...existing,
//           tags: (existing.tags || []).join(', '),
//         }
//       : EMPTY
//   )
//   const [imageFiles, setImageFiles] = useState([])       // new File objects
//   const [imagePreviews, setImagePreviews] = useState(
//     isEdit ? (existing.images || []) : []
//   )
//   const [saving, setSaving] = useState(false)

//   const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

//   const handleImagePick = (e) => {
//     const files = Array.from(e.target.files)
//     if (!files.length) return
//     const newPreviews = files.map(f => URL.createObjectURL(f))
//     setImageFiles(prev => [...prev, ...files])
//     setImagePreviews(prev => [...prev, ...newPreviews])
//   }

//   const removeImage = (idx) => {
//     setImageFiles(prev => {
//       const next = [...prev]
//       next.splice(idx - (imagePreviews.length - imageFiles.length), 1)
//       return next
//     })
//     setImagePreviews(prev => {
//       const next = [...prev]
//       next.splice(idx, 1)
//       return next
//     })
//   }

//   const toggleSize = (s) => {
//     set('sizes', form.sizes.includes(s)
//       ? form.sizes.filter(x => x !== s)
//       : [...form.sizes, s]
//     )
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!form.name || !form.price || !form.category) {
//       toast.error('Name, category and price are required')
//       return
//     }

//     setSaving(true)
//     try {
//       // Determine product ID for image upload path
//       const tempId = isEdit ? existing.id : `p_${Date.now()}`

//       // Upload any new images to Firebase Storage
//       let uploadedUrls = []
//       for (const file of imageFiles) {
//         const url = await uploadImage(file, tempId)
//         uploadedUrls.push(url)
//       }

//       // Existing images that weren't removed
//       const existingKept = isEdit
//         ? (existing.images || []).filter(url => imagePreviews.includes(url))
//         : []

//       const finalImages = [...existingKept, ...uploadedUrls]

//       const payload = {
//         name: form.name.trim(),
//         category: form.category,
//         price: Number(form.price),
//         originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
//         description: form.description.trim(),
//         sizes: form.sizes,
//         tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
//         featured: form.featured,
//         inStock: form.inStock,
//         images: finalImages,
//       }

//       if (isEdit) {
//         await updateProduct(existing.id, payload)
//         toast.success('Product updated!')
//       } else {
//         await addProduct(payload)
//         toast.success('Product added!')
//       }

//       refreshProducts()
//       navigate('/admin/products')
//     } catch (err) {
//       console.error(err)
//       toast.error('Something went wrong. Check Firebase config.')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const InputLabel = ({ children }) => (
//     <label className="block text-white/40 text-xs tracking-widest uppercase font-mono mb-2">
//       {children}
//     </label>
//   )

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
//       <div>
//         <h1 className="font-display text-3xl font-bold text-white">
//           {isEdit ? 'Edit Product' : 'Add New Product'}
//         </h1>
//         <p className="text-white/40 text-sm mt-1">
//           {isEdit ? `Editing: ${existing.name}` : 'Fill in the details below'}
//         </p>
//       </div>

//       <div className="glass-card border border-white/5 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Name */}
//         <div className="md:col-span-2">
//           <InputLabel>Product Name *</InputLabel>
//           <input
//             className="input-dark"
//             placeholder="e.g. Royal Linen Shirt"
//             value={form.name}
//             onChange={e => set('name', e.target.value)}
//             required
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <InputLabel>Category *</InputLabel>
//           <select
//             className="input-dark"
//             value={form.category}
//             onChange={e => set('category', e.target.value)}
//           >
//             {CATEGORIES.filter(c => c !== 'All').map(c => (
//               <option key={c} value={c} className="bg-black">{c}</option>
//             ))}
//           </select>
//         </div>

//         {/* Price */}
//         <div>
//           <InputLabel>Selling Price (₹) *</InputLabel>
//           <input
//             className="input-dark"
//             type="number"
//             placeholder="999"
//             min={0}
//             value={form.price}
//             onChange={e => set('price', e.target.value)}
//             required
//           />
//         </div>

//         {/* Original price */}
//         <div>
//           <InputLabel>Original Price (₹) — for discount display</InputLabel>
//           <input
//             className="input-dark"
//             type="number"
//             placeholder="1499"
//             min={0}
//             value={form.originalPrice || ''}
//             onChange={e => set('originalPrice', e.target.value)}
//           />
//         </div>

//         {/* Description */}
//         <div className="md:col-span-2">
//           <InputLabel>Description</InputLabel>
//           <textarea
//             className="input-dark resize-none"
//             rows={4}
//             placeholder="Describe the fabric, fit, occasion…"
//             value={form.description}
//             onChange={e => set('description', e.target.value)}
//           />
//         </div>

//         {/* Tags */}
//         <div className="md:col-span-2">
//           <InputLabel>Tags (comma separated)</InputLabel>
//           <input
//             className="input-dark"
//             placeholder="linen, casual, summer"
//             value={form.tags}
//             onChange={e => set('tags', e.target.value)}
//           />
//         </div>

//         {/* Sizes */}
//         <div className="md:col-span-2">
//           <InputLabel>Available Sizes</InputLabel>
//           <div className="flex flex-wrap gap-2">
//             {ALL_SIZES.map(s => (
//               <button
//                 key={s}
//                 type="button"
//                 onClick={() => toggleSize(s)}
//                 className={`px-3 py-1.5 text-sm font-mono border transition-all ${
//                   form.sizes.includes(s)
//                     ? 'border-gold-500 bg-gold-500/10 text-gold-400'
//                     : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Toggles */}
//         <div className="flex gap-6">
//           <label className="flex items-center gap-3 cursor-pointer">
//             <div
//               onClick={() => set('inStock', !form.inStock)}
//               className={`w-11 h-6 rounded-full transition-colors duration-200 flex items-center ${
//                 form.inStock ? 'bg-green-500' : 'bg-white/20'
//               }`}
//             >
//               <div className={`w-4 h-4 bg-white rounded-full mx-1 transition-transform duration-200 ${form.inStock ? 'translate-x-5' : 'translate-x-0'}`} />
//             </div>
//             <span className="text-white/60 text-sm">In Stock</span>
//           </label>

//           <label className="flex items-center gap-3 cursor-pointer">
//             <div
//               onClick={() => set('featured', !form.featured)}
//               className={`w-11 h-6 rounded-full transition-colors duration-200 flex items-center ${
//                 form.featured ? 'bg-gold-500' : 'bg-white/20'
//               }`}
//             >
//               <div className={`w-4 h-4 bg-white rounded-full mx-1 transition-transform duration-200 ${form.featured ? 'translate-x-5' : 'translate-x-0'}`} />
//             </div>
//             <span className="text-white/60 text-sm">Featured</span>
//           </label>
//         </div>
//       </div>

//       {/* Images */}
//       <div className="glass-card border border-white/5 p-6">
//         <InputLabel>Product Images</InputLabel>
//         <div className="flex flex-wrap gap-4">
//           {imagePreviews.map((src, i) => (
//             <div key={i} className="relative w-24 h-24 border border-white/10">
//               <img src={src} alt="" className="w-full h-full object-cover" />
//               <button
//                 type="button"
//                 onClick={() => removeImage(i)}
//                 className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white flex items-center justify-center rounded-full"
//               >
//                 <HiX size={12} />
//               </button>
//             </div>
//           ))}

//           {/* Upload button */}
//           <button
//             type="button"
//             onClick={() => fileRef.current?.click()}
//             className="w-24 h-24 border-2 border-dashed border-white/10 hover:border-gold-500/50 flex flex-col items-center justify-center gap-1 text-white/30 hover:text-gold-400 transition-colors"
//           >
//             <HiPhotograph size={22} />
//             <span className="text-[10px]">Add Image</span>
//           </button>
//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             multiple
//             className="hidden"
//             onChange={handleImagePick}
//           />
//         </div>
//         <p className="text-white/20 text-xs mt-3 font-mono">
//           Images upload to Firebase Storage when you save.
//         </p>
//       </div>

//       {/* Submit */}
//       <div className="flex gap-4">
//         <button
//           type="submit"
//           disabled={saving}
//           className="btn-gold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {saving ? (
//             <>
//               <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
//               Saving…
//             </>
//           ) : (
//             <>
//               <HiSave size={18} />
//               {isEdit ? 'Update Product' : 'Add Product'}
//             </>
//           )}
//         </button>
//         <button
//           type="button"
//           onClick={() => navigate('/admin/products')}
//           className="btn-outline-gold"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   )
// }


// src/admin/ProductForm.jsx
// Image URL based - Firebase Storage ki zaroorat nahi

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiX, HiSave, HiPlus } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { addProduct, updateProduct } from '../firebase/products'
import { useProducts } from '../context/ProductsContext'
import { CATEGORIES } from '../assets/sampleData'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40']

const EMPTY = {
  name: '',
  category: 'Shirts',
  price: '',
  originalPrice: '',
  description: '',
  sizes: [],
  tags: '',
  featured: false,
  inStock: true,
}

export default function ProductForm({ existing = null }) {
  const isEdit = !!existing
  const navigate = useNavigate()
  const { refreshProducts } = useProducts()

  const [form, setForm] = useState(
    isEdit
      ? { ...existing, tags: (existing.tags || []).join(', ') }
      : EMPTY
  )

  const [imageUrls, setImageUrls] = useState(
    isEdit ? (existing.images || []) : ['']
  )

  const [saving, setSaving] = useState(false)

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const toggleSize = (s) => {
    set('sizes', form.sizes.includes(s)
      ? form.sizes.filter(x => x !== s)
      : [...form.sizes, s]
    )
  }

  const updateUrl = (idx, val) => {
    setImageUrls(prev => {
      const next = [...prev]
      next[idx] = val
      return next
    })
  }

  const addUrlField = () => setImageUrls(prev => [...prev, ''])

  const removeUrl = (idx) => {
    setImageUrls(prev => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.price || !form.category) {
      toast.error('Name, category aur price zaroori hain')
      return
    }

    setSaving(true)
    try {
      const finalImages = imageUrls.filter(u => u.trim() !== '')

      const payload = {
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        description: form.description.trim(),
        sizes: form.sizes,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        featured: form.featured,
        inStock: form.inStock,
        images: finalImages,
      }

      if (isEdit) {
        await updateProduct(existing.id, payload)
        toast.success('Product update ho gaya!')
      } else {
        await addProduct(payload)
        toast.success('Product add ho gaya!')
      }

      refreshProducts()
      navigate('/admin/products')
    } catch (err) {
      console.error(err)
      toast.error('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const InputLabel = ({ children, required }) => (
    <label className="block text-white/40 text-xs tracking-widest uppercase font-mono mb-2">
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl pb-20">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">
          {isEdit ? 'Product Edit Karo' : 'Naya Product Add Karo'}
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {isEdit ? 'Edit: ' + existing.name : 'Neeche details bharo'}
        </p>
      </div>

      {/* Basic Details */}
      <div className="glass-card border border-white/5 p-6 space-y-6">
        <h2 className="text-white font-semibold text-sm tracking-widest uppercase">Basic Details</h2>

        <div>
          <InputLabel required>Product Ka Naam</InputLabel>
          <input
            className="input-dark"
            placeholder="jaise: Royal Linen Shirt"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputLabel required>Category</InputLabel>
            <select
              className="input-dark"
              value={form.category}
              onChange={e => set('category', e.target.value)}
            >
              {CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c} className="bg-black">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <InputLabel required>Selling Price (Rs.)</InputLabel>
            <input
              className="input-dark"
              type="number"
              placeholder="999"
              min={0}
              value={form.price}
              onChange={e => set('price', e.target.value)}
              required
            />
          </div>

          <div>
            <InputLabel>Original Price (Rs.) — discount ke liye</InputLabel>
            <input
              className="input-dark"
              type="number"
              placeholder="1499"
              min={0}
              value={form.originalPrice || ''}
              onChange={e => set('originalPrice', e.target.value)}
            />
          </div>

          <div>
            <InputLabel>Tags (comma se alag karo)</InputLabel>
            <input
              className="input-dark"
              placeholder="linen, casual, summer"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
            />
          </div>
        </div>

        <div>
          <InputLabel>Description</InputLabel>
          <textarea
            className="input-dark resize-none"
            rows={4}
            placeholder="Fabric, fit, occasion ke baare mein likho..."
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </div>
      </div>

      {/* Image URLs */}
      <div className="glass-card border border-white/5 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-sm tracking-widest uppercase">Product Images</h2>
            <p className="text-white/30 text-xs mt-1">Image URL paste karo (ImgBB ya Imgur se)</p>
          </div>
          <button
            type="button"
            onClick={addUrlField}
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 text-xs border border-gold-500/30 hover:border-gold-500 px-3 py-2 transition-all"
          >
            <HiPlus size={14} />
            Aur Add Karo
          </button>
        </div>

        <div className="space-y-4">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-1 space-y-2">
                <input
                  className="input-dark text-sm"
                  placeholder={'Image ' + (idx + 1) + ' URL — jaise: https://i.imgur.com/abc.jpg'}
                  value={url}
                  onChange={e => updateUrl(idx, e.target.value)}
                />
                {url.trim() && (
                  <img
                    src={url}
                    alt="preview"
                    className="w-20 h-20 object-cover border border-white/10"
                    onError={e => { e.target.src = 'https://via.placeholder.com/80x80/1a1a1a/666?text=Bad+URL' }}
                  />
                )}
              </div>
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUrl(idx)}
                  className="mt-3 p-2 text-white/30 hover:text-red-400 transition-colors"
                >
                  <HiX size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-gold-500/5 border border-gold-500/20 p-4">
          <p className="text-gold-400 text-xs font-semibold mb-3">
            Free Image URL kaise paayen — 3 aasaan tarike:
          </p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-gold-500 font-bold text-sm shrink-0">1.</span>
              <div>
                <p className="text-white/70 text-xs font-semibold">ImgBB (Sabse Aasaan)</p>
                <p className="text-white/40 text-xs">imgbb.com pe jao → photo upload karo → "Direct link" copy karo → yahan paste karo</p>
                <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-gold-400 text-xs underline">imgbb.com kholo →</a>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-gold-500 font-bold text-sm shrink-0">2.</span>
              <div>
                <p className="text-white/70 text-xs font-semibold">Imgur</p>
                <p className="text-white/40 text-xs">imgur.com pe upload karo → image pe right click → "Copy image address" → paste karo</p>
                <a href="https://imgur.com/upload" target="_blank" rel="noreferrer" className="text-gold-400 text-xs underline">imgur.com kholo →</a>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-gold-500 font-bold text-sm shrink-0">3.</span>
              <div>
                <p className="text-white/70 text-xs font-semibold">Postimages</p>
                <p className="text-white/40 text-xs">postimages.org pe upload karo → "Direct link" copy karo → yahan paste karo</p>
                <a href="https://postimages.org" target="_blank" rel="noreferrer" className="text-gold-400 text-xs underline">postimages.org kholo →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="glass-card border border-white/5 p-6 space-y-4">
        <h2 className="text-white font-semibold text-sm tracking-widest uppercase">Available Sizes</h2>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={'px-4 py-2 text-sm font-mono border transition-all ' + (
                form.sizes.includes(s)
                  ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="glass-card border border-white/5 p-6 space-y-4">
        <h2 className="text-white font-semibold text-sm tracking-widest uppercase">Settings</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center gap-4 cursor-pointer">
            <div
              onClick={() => set('inStock', !form.inStock)}
              className={'w-12 h-6 rounded-full transition-colors duration-200 flex items-center px-1 ' + (form.inStock ? 'bg-green-500' : 'bg-white/20')}
            >
              <div className={'w-4 h-4 bg-white rounded-full transition-transform duration-200 ' + (form.inStock ? 'translate-x-6' : 'translate-x-0')} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Stock Mein Hai</p>
              <p className="text-white/30 text-xs">{form.inStock ? 'Haan, available' : 'Out of stock'}</p>
            </div>
          </label>

          <label className="flex items-center gap-4 cursor-pointer">
            <div
              onClick={() => set('featured', !form.featured)}
              className={'w-12 h-6 rounded-full transition-colors duration-200 flex items-center px-1 ' + (form.featured ? 'bg-gold-500' : 'bg-white/20')}
            >
              <div className={'w-4 h-4 bg-white rounded-full transition-transform duration-200 ' + (form.featured ? 'translate-x-6' : 'translate-x-0')} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Featured Product</p>
              <p className="text-white/30 text-xs">{form.featured ? 'Homepage pe dikhega' : 'Normal listing'}</p>
            </div>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="btn-gold flex items-center gap-2 px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <HiSave size={18} />
              {isEdit ? 'Update Karo' : 'Product Add Karo'}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="btn-outline-gold px-8 py-4"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
