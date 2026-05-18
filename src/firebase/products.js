// src/firebase/products.js
// All Firestore + Storage operations for products

import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, where, orderBy, limit
} from 'firebase/firestore'
import {
  ref, uploadBytes, getDownloadURL, deleteObject
} from 'firebase/storage'
import { db, storage } from './config'

const COLLECTION = 'products'

// ── Upload a single image ─────────────────────────────────────
export async function uploadImage(file, productId) {
  const path = `products/${productId}/${Date.now()}_${file.name}`
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(snapshot.ref)
}

// ── Delete an image by its full URL ──────────────────────────
export async function deleteImage(url) {
  try {
    const imgRef = ref(storage, url)
    await deleteObject(imgRef)
  } catch (e) {
    console.warn('Image delete failed', e)
  }
}

// ── Add a new product ────────────────────────────────────────
export async function addProduct(data) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    inStock: true,
  })
  return docRef.id
}

// ── Update a product ─────────────────────────────────────────
export async function updateProduct(id, data) {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, { ...data, updatedAt: new Date() })
}

// ── Delete a product (and its images) ────────────────────────
export async function deleteProduct(id, imageUrls = []) {
  for (const url of imageUrls) {
    await deleteImage(url)
  }
  await deleteDoc(doc(db, COLLECTION, id))
}

// ── Get ALL products ─────────────────────────────────────────
export async function getAllProducts() {
  const snap = await getDocs(
    query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  )
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Get products by category ──────────────────────────────────
export async function getProductsByCategory(category) {
  const snap = await getDocs(
    query(
      collection(db, COLLECTION),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    )
  )
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Get a single product ──────────────────────────────────────
export async function getProduct(id) {
  const snap = await getDoc(doc(db, COLLECTION, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

// ── Get new arrivals (latest 8) ───────────────────────────────
export async function getNewArrivals() {
  const snap = await getDocs(
    query(collection(db, COLLECTION), orderBy('createdAt', 'desc'), limit(8))
  )
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Get featured products ──────────────────────────────────────
export async function getFeaturedProducts() {
  const snap = await getDocs(
    query(
      collection(db, COLLECTION),
      where('featured', '==', true),
      limit(8)
    )
  )
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
