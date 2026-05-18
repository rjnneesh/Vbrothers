// src/hooks/useWhatsApp.js
const PHONE = '918528026985' // country code + number

export function useWhatsApp() {
  const openWhatsApp = (message = '') => {
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${PHONE}?text=${encoded}`, '_blank')
  }

  const inquireProduct = (product) => {
    const msg =
      `Hi V Brothers! 👋\n\n` +
      `I'm interested in:\n` +
      `*${product.name}*\n` +
      `Category: ${product.category}\n` +
      `Price: ₹${product.price.toLocaleString()}\n\n` +
      `Please share availability and more details. Thank you!`
    openWhatsApp(msg)
  }

  const generalInquiry = () => {
    openWhatsApp(
      `Hi V Brothers! 👋\nI'd like to know more about your latest men's fashion collection.`
    )
  }

  return { openWhatsApp, inquireProduct, generalInquiry }
}
