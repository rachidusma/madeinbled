'use client'

import { useRef } from 'react'
import { Category } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

interface ProductsProps {
  dictionary: any
  categories: Category[]
  lang: string
}

export default function Products({ dictionary, categories, lang }: ProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 350 // Updated width for rectangular cards
      const newScrollPosition = direction === 'left' 
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount
      
      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="bg-navy-section py-24 px-6 lg:px-20" id="products">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6">
          <div>
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white">{dictionary.products.title}</h3>
          </div>
          <p className="max-w-2xl text-slate-400 text-lg">
            {dictionary.products.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const getCategoryDetails = (name: string) => {
              const lowerName = name.toLowerCase()
              if (lowerName.includes('fruit')) return {
                icon: 'nutrition',
                desc: 'Premium Algerian citrus, dates, and seasonal exotic fruits harvested at peak ripeness.',
                features: ['Deglet Nour Dates', 'Clementines & Oranges']
              }
              if (lowerName.includes('vege')) return {
                icon: 'eco',
                desc: 'Farm-fresh premium vegetables cultivated in the fertile Saharan and Coastal regions.',
                features: ['Tomatoes & Bell Peppers', 'Onions & Potatoes']
              }
              if (lowerName.includes('oil')) return {
                icon: 'water_drop',
                desc: 'Award-winning extra virgin olive oils cold-pressed from heritage Algerian orchards.',
                features: ['Extra Virgin Grade', 'Bulk & Retail Export']
              }
              return {
                icon: 'verified',
                desc: 'Promoting and exporting Algeria\'s leading domestic agro-industrial manufacturers.',
                features: ['Certified Local Partners', 'Industrial Packaging']
              }
            }

            const details = getCategoryDetails(category.name)

            return (
              <Link 
                key={category.id}
                href={`/${lang}/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-navy-deep border border-white/5 p-8 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Background Image */}
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                
                {/* Gradient Overlay - Light blue */}
                <div className={`absolute inset-0 bg-gradient-to-br from-sky-400/90 to-blue-900/90 mix-blend-multiply z-10 transition-opacity duration-300 ${category.image ? 'opacity-90' : 'opacity-0'}`} />
                
                {/* Content */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Icon removed as requested */}
                  <h4 className="mb-3 text-2xl font-bold text-white drop-shadow-md mt-4">{category.name}</h4>
                  <p className="text-slate-100 text-sm leading-relaxed mb-6 drop-shadow-sm font-medium">
                    {details.desc}
                  </p>
                  <ul className="space-y-2 mb-8 mt-auto">
                    {details.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-white font-medium drop-shadow-sm">
                        <span className="material-symbols-outlined text-primary text-sm shadow-sm bg-white/20 rounded-full p-0.5">check_circle</span> 
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="h-1 w-0 bg-primary transition-all group-hover:w-full"></div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
