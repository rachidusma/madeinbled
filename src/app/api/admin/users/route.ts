import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// GET: List all admins
export async function GET() {
  try {
    await requireAuth()

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        // Exclude password
      },
      orderBy: {
        email: 'asc'
      }
    })

    return NextResponse.json(admins)
  } catch (error) {
    console.error('Error fetching admins:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    )
  }
}

// POST: Create a new admin
export async function POST(request: Request) {
  try {
    await requireAuth()
    
    const body = await request.json()
    const { name, email, password } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return NextResponse.json(newAdmin, { status: 201 })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    )
  }
}
