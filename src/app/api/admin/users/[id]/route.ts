import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// GET: Get specific admin details
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()
    
    const admin = await prisma.admin.findUnique({
      where: { id: params.id },
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
    console.error('Error fetching admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin details' },
      { status: 500 }
    )
  }
}

// PUT: Update admin details
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth()
    
    const body = await request.json()
    const { name, email, password } = body

    // Check if admin exits
    const existingAdmin = await prisma.admin.findUnique({
      where: { id: params.id }
    })

    if (!existingAdmin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // If email is changing, check for uniqueness
    if (email && email !== existingAdmin.email) {
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
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return NextResponse.json(updatedAdmin)
  } catch (error) {
    console.error('Error updating admin:', error)
    return NextResponse.json(
      { error: 'Failed to update admin' },
      { status: 500 }
    )
  }
}

// DELETE: Delete admin
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth()

    // Prevent deleting self
    if (session.id === params.id) {
       return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    await prisma.admin.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting admin:', error)
    return NextResponse.json(
      { error: 'Failed to delete admin' },
      { status: 500 }
    )
  }
}
