import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET(request: Request) {
  try {
    await requireAuth()
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const where = categoryId ? { categoryId } : {}

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    })

    return NextResponse.json(products)
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth()
    const body = await request.json()
    const { name, name_fr, name_ar, description, description_fr, description_ar, image, categoryId, isAvailable } = body

    if (!name || !categoryId) {
      return NextResponse.json({ error: 'Name and Category are required' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: { name, name_fr, name_ar, description, description_fr, description_ar, image, categoryId, isAvailable }
    })

    revalidatePath('/[lang]', 'page')
    revalidatePath('/[lang]/products', 'page')

    return NextResponse.json(product)
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await requireAuth()
    const body = await request.json()
    const { id, name, name_fr, name_ar, description, description_fr, description_ar, image, categoryId, isAvailable } = body

    if (!id || !name || !categoryId) {
      return NextResponse.json({ error: 'ID, Name, and Category are required' }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name, name_fr, name_ar, description, description_fr, description_ar, image, categoryId, isAvailable }
    })

    revalidatePath('/[lang]', 'page')
    revalidatePath('/[lang]/products', 'page')

    return NextResponse.json(product)
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAuth()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.product.delete({ where: { id } })
    
    revalidatePath('/[lang]', 'page')
    revalidatePath('/[lang]/products', 'page')

    return NextResponse.json({ success: true })
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
