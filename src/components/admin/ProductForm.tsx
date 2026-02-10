'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Category {
  id: string
  name: string
}

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialData?: {
    id: string
    name: string
    description: string | null
    image: string | null
    categoryId: string
  } | null
  categories: Category[]
}

export default function ProductForm({ isOpen, onClose, onSuccess, initialData, categories }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    categoryId: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || '',
        image: initialData.image || '',
        categoryId: initialData.categoryId
      })
    } else if (categories.length > 0) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }))
    }
  }, [initialData, categories])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = initialData 
        ? `/api/admin/products` 
        : `/api/admin/products`
      
      const method = initialData ? 'PUT' : 'POST'
      const body = initialData ? { ...formData, id: initialData.id } : formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save product')
      }

      onSuccess()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#013765]">
            {initialData ? 'Edit Product' : 'New Product'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Argan Oil"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all bg-white"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Product description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    try {
                      setLoading(true)
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                      })
                      const data = await res.json()
                      if (data.url) {
                        setFormData(prev => ({ ...prev, image: data.url }))
                      }
                    } catch (err) {
                      setError('Failed to upload image')
                    } finally {
                      setLoading(false)
                    }
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FE6B01] focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="hidden" // Hiding the text input but keeping it for state management if needed or fallback
              />
            </div>
          </div>

          {formData.image && (
            <div className="mt-2 h-32 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
              <Image 
                src={formData.image} 
                alt="Preview" 
                fill
                className="object-contain"
              />
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#FE6B01] text-white rounded-lg hover:bg-[#e56001] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
