'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar({ dictionary, lang }: { dictionary: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}`}>
              <Image 
                src="/logo.jpg" 
                alt="MadeINBladi Logo" 
                width={180} 
                height={60} 
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href={`/${lang}`} className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              {dictionary.navigation.home}
            </Link>
            <Link href={`/${lang}/about`} className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              {dictionary.navigation.about}
            </Link>
            <Link href={`/${lang}/products`} className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              {dictionary.navigation.products}
            </Link>
            <Link href={`/${lang}/process`} className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              {dictionary.navigation.process}
            </Link>
            <Link href={`/${lang}/contact`} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
              {dictionary.navigation.contact}
            </Link>
            
            {/* Language Switcher */}
            <div className="flex space-x-2 text-sm text-gray-500">
              <Link href="/fr" className={`hover:text-green-600 ${lang === 'fr' ? 'font-bold text-green-600' : ''}`}>FR</Link>
              <span>|</span>
              <Link href="/en" className={`hover:text-green-600 ${lang === 'en' ? 'font-bold text-green-600' : ''}`}>EN</Link>
              <span>|</span>
              <Link href="/ar" className={`hover:text-green-600 ${lang === 'ar' ? 'font-bold text-green-600' : ''}`}>AR</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href={`/${lang}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">
              {dictionary.navigation.home}
            </Link>
            <Link href={`/${lang}/about`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">
              {dictionary.navigation.about}
            </Link>
            <Link href={`/${lang}/products`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">
              {dictionary.navigation.products}
            </Link>
            <Link href={`/${lang}/process`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">
              {dictionary.navigation.process}
            </Link>
            <Link href={`/${lang}/contact`} className="block px-3 py-2 rounded-md text-base font-medium text-green-600 font-bold hover:bg-gray-50">
              {dictionary.navigation.contact}
            </Link>
            <div className="flex space-x-4 px-3 py-2 text-base font-medium text-gray-500">
              <Link href="/fr" className={lang === 'fr' ? 'text-green-600 font-bold' : ''}>Français</Link>
              <Link href="/en" className={lang === 'en' ? 'text-green-600 font-bold' : ''}>English</Link>
              <Link href="/ar" className={lang === 'ar' ? 'text-green-600 font-bold' : ''}>العربية</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
