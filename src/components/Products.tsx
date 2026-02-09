'use client'

import { useRef } from 'react'

export default function Products({ dictionary }: { dictionary: any }) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const products = [
    { key: 'fruits', color: 'bg-orange-100 text-orange-600', icon: '🍎' },
    { key: 'vegetables', color: 'bg-green-100 text-green-600', icon: '🥦' },
    { key: 'dates', color: 'bg-orange-100 text-bled-orange', icon: '🌴' },
    { key: 'spreads', color: 'bg-stone-200 text-stone-800', icon: '🌰' }, 
    { key: 'chocolates', color: 'bg-zinc-100 text-zinc-800', icon: '🍫' },
    { key: 'biscuits', color: 'bg-yellow-50 text-yellow-600', icon: '🍪' },
    { key: 'olive_oil', color: 'bg-lime-100 text-lime-700', icon: '🫒' },
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 320 // Width of card + gap
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
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {dictionary.products.title}
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            {dictionary.about_page.presentation.content}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#FE6B01] hover:text-white group"
            aria-label="Scroll left"
          >
            <svg 
              className="w-6 h-6 text-[#013765] group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slider */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div 
                key={product.key} 
                className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group border border-gray-100 snap-center"
              >
                <div className={`w-full h-48 flex items-center justify-center text-7xl ${product.color} group-hover:scale-105 transition duration-500`}>
                  {product.icon}
                </div>
                <div className="p-6 text-center w-full">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-bled-orange transition">
                    {dictionary.products[product.key]}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#FE6B01] hover:text-white group"
            aria-label="Scroll right"
          >
            <svg 
              className="w-6 h-6 text-[#013765] group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((product, index) => (
            <button
              key={product.key}
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.scrollTo({
                    left: index * 320,
                    behavior: 'smooth'
                  })
                }
              }}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#FE6B01] transition-colors"
              aria-label={`Go to ${dictionary.products[product.key]}`}
            />
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
