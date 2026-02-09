import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export interface AdminSession {
  email: string
  id: string
}

export async function verifyCredentials(email: string, password: string): Promise<string | null> {
  const admin = await prisma.admin.findUnique({
    where: { email }
  })

  if (!admin) return null

  const isValid = await bcrypt.compare(password, admin.password)
  return isValid ? admin.id : null
}

export async function createSession(email: string, id: string): Promise<void> {
  const cookieStore = cookies()
  // In production, sign this token!
  const sessionData = JSON.stringify({ email, id })
  
  cookieStore.set('admin_session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie) {
      return null
    }

    const session = JSON.parse(sessionCookie.value) as AdminSession
    return session
  } catch (error) {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete('admin_session')
}

export async function requireAuth(): Promise<AdminSession> {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  return session
}
