import { getDictionary } from '../../../../get-dictionary'
import { Locale } from '../../../../i18n-config'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import { getProduct } from '../../../../lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProductPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string }
}) {
  const dictionary = await getDictionary(lang)
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar dictionary={dictionary} lang={lang} />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link href={`/${lang}/products`} className="hover:text-[#FE6B01] transition-colors">
            {dictionary.products.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Base Image Container */}
            <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] bg-gray-100 p-8 flex items-center justify-center">
              {/* Stitch Decoration */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#FE6B01] rounded-tl-3xl stitch-corner"></div>
              
              {product.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-center relative">
               {/* Stitch Decoration */}
               <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#FE6B01] rounded-br-3xl stitch-corner"></div>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-orange-100 text-[#FE6B01] rounded-full text-sm font-semibold mb-4">
                  {product.category.name}
                </span>
                <h1 className="text-4xl font-extrabold text-[#013765] mb-4">
                  {product.name}
                </h1>
                <div className="w-20 h-1 bg-[#FE6B01] rounded-full mb-6"></div>
              </div>

              <div className="prose prose-lg text-gray-600 mb-8">
                <p>{product.description}</p>
              </div>

              <div className="mt-auto">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-[#FE6B01] to-[#ff8534] hover:from-[#ff8534] hover:to-[#FE6B01] shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Contact Us About This Product
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer dictionary={dictionary} />
    </main>
  )
}
