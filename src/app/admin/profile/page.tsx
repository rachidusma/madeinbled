'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    currentPassword: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/admin/profile')
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data = await response.json()
      setFormData(prev => ({
        ...prev,
        name: data.name || '',
        email: data.email || ''
      }))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword
      }
      
      if (formData.password) {
        payload.password = formData.password
      }

      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess('Profile updated successfully')
      setFormData(prev => ({ ...prev, password: '', currentPassword: '' }))
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
        setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading) return <div className="p-8 text-center">Loading profile...</div>

  return (
    <div className="p-8 text-[#013765] max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {success}
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

          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-semibold text-lg mb-4">Security</h3>
            
            <div className="space-y-4">
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

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#FE6B01]">
                  Current Password <span className="text-red-500">*</span> <span className="text-gray-400 font-normal">(Required to save changes)</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FE6B01] focus:ring-2 focus:ring-[#FE6B01]/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-[#FE6B01] text-white hover:bg-[#e55a00] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
