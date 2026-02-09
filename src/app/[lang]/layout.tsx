import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { i18n } from '../../i18n-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MadeINBladi - Export de Produits Algériens',
  description: 'Exportation de produits agricoles et agroalimentaires algériens.',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
