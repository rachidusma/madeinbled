'use client'

import { useRef } from 'react'
import { Category } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

interface ProductsProps {
  dictionary: any
  categories: Category[]
}

export default function Products({ dictionary, categories }: ProductsProps) {
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
    <section id="products" className="py-24 bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {dictionary.products.title}
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              {dictionary.products.description}
            </p>
          </div>
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-white font-medium hover:text-[#3B82F6] transition-colors whitespace-nowrap"
          >
            {dictionary.products.discover_more}
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative group/slider">
          {/* Slider */}
          <div 
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.id}`}
                className="flex-shrink-0 w-[320px] h-[480px] group snap-start block relative rounded-[2rem] overflow-hidden bg-[#1A1F2B]"
              >
                {category.image ? (
                  <Image 
                    src={category.image} 
                    alt={category.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content at Bottom-Left */}
                <div className="absolute bottom-10 left-8 right-8">
                  <span className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-widest block mb-3">
                    {String(index + 1).padStart(2, '0')} / {category.name.split(' ')[0]}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {categories.map((_, index) => (
              <div 
                key={index}
                className={`h-[2px] transition-all duration-300 ${index === 0 ? 'w-10 bg-[#3B82F6]' : 'w-4 bg-gray-700'}`}
              />
            ))}
          </div>
          <span className="text-[#475569] text-[10px] font-medium uppercase tracking-wider">
            {dictionary.products.showing_of
              .replace('{count}', Math.min(categories.length, 3).toString())
              .replace('{total}', categories.length.toString())}
          </span>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
