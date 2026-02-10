'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product, Category } from '@prisma/client'

interface ProductCardProps {
  product: Product & { category: Category }
  dictionary: any
}

export default function ProductCard({ product, dictionary }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="group block relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Decorative Corner Stitches */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#FE6B01] rounded-tl-2xl stitch-corner opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#FE6B01] rounded-br-2xl stitch-corner opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#013765] shadow-sm">
          {product.category.name}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FE6B01] transition-colors mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 line-clamp-2 text-sm">
          {product.description}
        </p>
        <div className="mt-4 flex items-center text-[#FE6B01] font-semibold text-sm group-hover:translate-x-1 transition-transform">
          {dictionary.product_page.view_details}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
