import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    await requireAuth()
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { products: true } } }
    })
    return NextResponse.json(categories)
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
    const { name, name_fr, name_ar, description, description_fr, description_ar, image } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name, name_fr, name_ar, description, description_fr, description_ar, image }
    })

    revalidatePath('/[lang]', 'page')
    revalidatePath('/[lang]/products', 'page')

    return NextResponse.json(category)
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
    const { id, name, name_fr, name_ar, description, description_fr, description_ar, image } = body

    if (!id || !name) {
      return NextResponse.json({ error: 'ID and Name are required' }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name, name_fr, name_ar, description, description_fr, description_ar, image }
    })

    revalidatePath('/[lang]', 'page')
    revalidatePath('/[lang]/products', 'page')

    return NextResponse.json(category)
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

    await prisma.category.delete({ where: { id } })
    
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
