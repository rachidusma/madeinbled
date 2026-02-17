'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Admin {
  id: string
  name: string
  email: string
}

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (!response.ok) {
        throw new Error('Failed to fetch admins')
      }
      const data = await response.json()
      setAdmins(data)
    } catch (err) {
        console.error(err)
      setError('Error loading admins')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete admin')
      }

      setAdmins(admins.filter(admin => admin.id !== id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading admins...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="p-8 text-[#013765]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Users</h1>
        <Link
          href="/admin/users/new"
          className="bg-[#FE6B01] text-white px-6 py-2 rounded-lg hover:bg-[#e55a00] transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Admin
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 font-semibold text-gray-600">Name</th>
              <th className="p-6 font-semibold text-gray-600">Email</th>
              <th className="p-6 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-6 font-medium">{admin.name}</td>
                <td className="p-6 text-gray-600">{admin.email}</td>
                <td className="p-6 text-right space-x-4">
                  <Link
                    href={`/admin/users/${admin.id}`}
                    className="text-[#013765] hover:text-[#FE6B01] font-medium transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
                <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                        No admins found. This should not happen.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
