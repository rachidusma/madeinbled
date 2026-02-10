'use client'

import { Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProductFilterProps {
  categories: Category[]
  dictionary: any
}

export default function ProductFilter({ categories, dictionary }: ProductFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    // Reset page to 1 when filter changes
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
          !currentCategory
            ? 'bg-[#FE6B01] text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        {dictionary.product_page.all_products}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            currentCategory === category.id
              ? 'bg-[#FE6B01] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
