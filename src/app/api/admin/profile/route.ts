import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// GET: Get current admin profile
export async function GET() {
  try {
    const session = await requireAuth()
    
    const admin = await prisma.admin.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(admin)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// PUT: Update current admin profile
export async function PUT(request: Request) {
  try {
    const session = await requireAuth()
    
    const body = await request.json()
    const { name, email, password, currentPassword } = body

    const admin = await prisma.admin.findUnique({
      where: { id: session.id }
    })

    if (!admin) {
        return NextResponse.json(
            { error: 'Admin not found' },
            { status: 404 }
        )
    }

    // Verify current password if changing sensitive info or setting new password
    // For simplicity, let's require current password for ANY profile update to ensure security
    if (!currentPassword) {
         return NextResponse.json(
            { error: 'Current password is required to update profile' },
            { status: 400 }
        )
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password)
    if (!isPasswordValid) {
        return NextResponse.json(
            { error: 'Invalid current password' },
            { status: 403 }
        )
    }

    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // If email is changing, check for uniqueness
    if (email && email !== admin.email) {
      const emailExists = await prisma.admin.findUnique({
        where: { email }
      })
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        )
      }
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: session.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return NextResponse.json(updatedAdmin)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
