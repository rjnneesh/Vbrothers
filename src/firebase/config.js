// src/firebase/config.js
// ─────────────────────────────────────────────────────────────
// Replace the placeholder values below with your actual Firebase
// project credentials from https://console.firebase.google.com
// ─────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// }

const firebaseConfig = {
  apiKey: "AIzaSyCocQsL-_ooiLYLX8nDv3F19yFKATTAxgM",
  authDomain: "vbrothers-shop.firebaseapp.com",
  projectId: "vbrothers-shop",
  storageBucket: "vbrothers-shop.firebasestorage.app",
  messagingSenderId: "847219411145",
  appId: "1:847219411145:web:a0b630551838813f142518"
};


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
