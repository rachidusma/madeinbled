'use server'

import nodemailer from 'nodemailer'
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

export async function sendContactEmail(formData: {
  name: string
  company: string
  country: string
  email: string
  message: string
  productLink?: string
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"Made In Bled Contact" <${process.env.SMTP_USER}>`,
    to: 'usmarachid9@gmail.com',
    subject: `New Contact Form Submission from ${formData.name}`,
    text: `
      Name: ${formData.name}
      Company: ${formData.company}
      Country: ${formData.country}
      Email: ${formData.email}
      Message: ${formData.message}
      ${formData.productLink ? `Product Link: ${formData.productLink}` : ''}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Country:</strong> ${formData.country}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${formData.message}</p>
      ${formData.productLink ? `<p><strong>Product Link:</strong> <a href="${formData.productLink}">${formData.productLink}</a></p>` : ''}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send message' }
  }
}
