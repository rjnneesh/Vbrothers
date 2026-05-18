# V Brothers – Premium Men's Fashion Website

A complete, production-ready React + Firebase website for **V Brothers**, a premium menswear store
located at Rampur Bazar, Jaunpur, Uttar Pradesh.

---

## 📁 Project Structure

```
vbrothers/
├── src/
│   ├── components/          # Shared UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── FloatingWhatsApp.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Public-facing pages
│   │   ├── HomePage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CategoriesPage.jsx
│   │   └── ContactPage.jsx
│   ├── admin/               # Admin panel (protected)
│   │   ├── AdminLogin.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProducts.jsx
│   │   ├── ProductForm.jsx
│   │   ├── AddProduct.jsx
│   │   └── EditProduct.jsx
│   ├── firebase/            # Firebase services
│   │   ├── config.js        ← ADD YOUR CREDENTIALS HERE
│   │   └── products.js
│   ├── context/             # React Context (state management)
│   │   ├── AuthContext.jsx
│   │   └── ProductsContext.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollReveal.js
│   │   └── useWhatsApp.js
│   ├── assets/
│   │   └── sampleData.js    # Sample products & categories
│   ├── App.jsx              # Root with all routes
│   ├── main.jsx
│   └── index.css
├── firestore.rules
├── storage.rules
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (e.g. `vbrothers-shop`)
3. Enable **Authentication** → Email/Password
4. Enable **Firestore Database** (start in test mode, then apply rules)
5. Enable **Storage**
6. Go to Project Settings → Your Apps → Web App → Copy config

### 3. Add Firebase config
Open `src/firebase/config.js` and replace the placeholder values:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "vbrothers-shop.firebaseapp.com",
  projectId: "vbrothers-shop",
  storageBucket: "vbrothers-shop.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

### 4. Create Admin Account
In Firebase Console → Authentication → Users → Add User:
- Email: `admin@vbrothers.com` (or any email)
- Password: (choose a strong password)

### 5. Deploy Security Rules
```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools
firebase login

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage
```

### 6. Start the dev server
```bash
npm run dev
```

Site runs at `http://localhost:3000`

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page – hero, featured, new arrivals, offers |
| `/shop` | Full product listing with search + filters |
| `/product/:id` | Individual product detail page |
| `/categories` | All category grid |
| `/contact` | Contact info, map, WhatsApp buttons |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Stats overview |
| `/admin/products` | Product management table |
| `/admin/add-product` | Add new product |
| `/admin/edit-product/:id` | Edit existing product |

---

## ✨ Features

- **Mobile-first** responsive design
- **Dark + Gold** premium fashion aesthetic
- **WhatsApp integration** — every product links directly to WhatsApp chat
- **Firebase Auth** — secure admin login
- **Firestore** — real-time product database
- **Firebase Storage** — image uploads from admin panel
- **Sample data fallback** — works without Firebase during development
- **Search & Filter** — by name, category, price range
- **Scroll animations** — smooth reveal effects
- **Loading skeletons** — while products load
- **Toast notifications** — for all admin actions
- **SEO-friendly** — semantic HTML, proper meta tags

---

## 📞 Store Info

| Field | Value |
|-------|-------|
| Shop Name | V Brothers |
| Owner | Rajneesh |
| Phone | +91 85280 26985 |
| WhatsApp | +91 85280 26985 |
| Location | Rampur Bazar, Jaunpur, UP |

---

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** with custom gold/charcoal theme
- **Firebase** (Auth + Firestore + Storage)
- **React Router v6**
- **react-hot-toast** for notifications
- **react-icons** for icons
- **Playfair Display** + **DM Sans** typography

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to Firebase Hosting, Vercel, or Netlify.

### Deploy to Firebase Hosting
```bash
firebase init hosting
npm run build
firebase deploy
```
