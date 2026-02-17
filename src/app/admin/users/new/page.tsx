'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewAdminPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin')
      }

      router.push('/admin/users')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="p-8 text-[#013765] max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/users"
          className="text-gray-500 hover:text-[#FE6B01] transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold">Add New Admin</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01]/20 outline-none transition-all"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01]/20 outline-none transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01]/20 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <Link
              href="/admin/users"
              className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-[#FE6B01] text-white hover:bg-[#e55a00] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
