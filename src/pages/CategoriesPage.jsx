// src/pages/CategoriesPage.jsx
import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { CATEGORIES } from '../assets/sampleData'
import CategoryCard from '../components/CategoryCard'
import SectionHeader from '../components/SectionHeader'

export default function CategoriesPage() {
  useScrollReveal()
  const cats = CATEGORIES.filter(c => c !== 'All')

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Men's Wear"
        title="All Categories"
        subtitle="Explore our complete range of premium menswear categories."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 reveal">
        {cats.map(c => (
          <CategoryCard key={c} name={c} />
        ))}
      </div>
    </main>
  )
}
