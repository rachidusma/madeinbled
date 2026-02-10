import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductCard from '../../../components/ProductCard'
import ProductFilter from '../../../components/ProductFilter'
import Pagination from '../../../components/Pagination'
import { getProducts, getCategories } from '../../../lib/actions'

export default async function Products({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const dictionary = await getDictionary(lang)
  
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const categoryId = typeof searchParams.category === 'string' ? searchParams.category : undefined

  // Fetch data in parallel
  const [productsData, categories] = await Promise.all([
    getProducts({ page, categoryId }),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar dictionary={dictionary} lang={lang} />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#013765] sm:text-5xl mb-4">
            {dictionary.products.title}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {dictionary.about_page.presentation.content}
          </p>
        </div>

        <ProductFilter categories={categories} dictionary={dictionary} />

        {productsData.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {productsData.products.map((product) => (
                <ProductCard key={product.id} product={product} dictionary={dictionary} />
              ))}
            </div>

            <Pagination 
              totalPages={productsData.totalPages} 
              currentPage={productsData.currentPage} 
            />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {dictionary.product_page.no_products}
            </h3>
            <p className="text-gray-500">
              {dictionary.product_page.no_products_desc}
            </p>
          </div>
        )}
      </div>

      <Footer dictionary={dictionary} />
    </main>
  )
}
