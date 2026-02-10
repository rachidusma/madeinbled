'use server'

import prisma from './prisma'

export async function getProducts({
  page = 1,
  limit = 12,
  categoryId,
}: {
  page?: number
  limit?: number
  categoryId?: string
}) {
  const skip = (page - 1) * limit

  try {
    const where = categoryId ? { categoryId } : {}

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ])

    return {
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!product) return null

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}
