'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Category } from '@prisma/client'

interface CategoryCardProps {
  category: Category
  dictionary: any
  lang: string
}

export default function CategoryCard({ category, dictionary, lang }: CategoryCardProps) {
  // Determine gradient based on category name/type for visual variety if no image
  // For now using a consistent premium style
  
  return (
    <Link 
      href={`/${lang}/products?category=${category.id}`}
      className="group relative overflow-hidden rounded-2xl border border-border-dark bg-neutral-dark/40 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 block h-full"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-dark to-slate-900 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-slate-700 group-hover:text-primary/50 transition-colors">
              grid_view
            </span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-70" />
      
        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 transform translate-y-2 group-hover:translate-y-0">
            {category.description}
          </p>
        </div>
        
        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 border border-white/20">
            <span className="material-symbols-outlined text-white text-xl">arrow_forward</span>
        </div>
      </div>
    </Link>
  )
}
