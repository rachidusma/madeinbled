'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditAdminPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAdmin()
  }, [])

  const fetchAdmin = async () => {
    try {
      const response = await fetch(`/api/admin/users/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch admin')
      }
      const data = await response.json()
      setFormData({
        name: data.name || '',
        email: data.email || '',
        password: ''
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email
      }
      
      if (formData.password) {
        payload.password = formData.password
      }

      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update admin')
      }

      router.push('/admin/users')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading) return <div className="p-8 text-center">Loading admin details...</div>

  return (
    <div className="p-8 text-[#013765] max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/users"
          className="text-gray-500 hover:text-[#FE6B01] transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold">Edit Admin</h1>
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
            <label className="block text-sm font-semibold mb-2">
              New Password <span className="text-gray-400 font-normal">(Leave blank to keep current)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-[#FE6B01] text-white hover:bg-[#e55a00] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
