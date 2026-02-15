import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductCard from '../../../components/ProductCard'
import ProductFilter from '../../../components/ProductFilter'
import Pagination from '../../../components/Pagination'
import ProductBanner from '../../../components/ProductBanner'
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
    getProducts({ page, categoryId, lang }),
    getCategories(lang),
  ])

  // Insert banner logic: try to insert after 3rd item if we have enough items
  const products = [...productsData.products]
  const showBanner = products.length >= 2 

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex flex-col">
      <Navbar dictionary={dictionary} lang={lang} />
      
      {/* Hero Introduction */}
      <section className="px-6 md:px-16 py-12 bg-neutral-dark/30 border-b border-border-dark pt-32">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {dictionary.products.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            {dictionary.products.description}
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row px-6 md:px-16 py-12 gap-12 max-w-[1920px] mx-auto w-full">
        {/* Sidebar Filters */}
        <ProductFilter categories={categories} dictionary={dictionary} />

        {/* Product Content Area */}
        <div className="flex-1">
          {/* Sorting & Layout Toggle (Visual Only for now) */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-dark">
            <p className="text-slate-400 text-sm">
              Showing <span className="text-white font-bold">{productsData.products.length}</span> Premium Items
            </p>
            <div className="flex items-center gap-4 hidden md:flex">
               <select className="bg-neutral-dark border-border-dark text-white rounded-lg text-sm focus:ring-primary pr-10 py-2">
                <option>Sort by: Popularity</option>
                <option>Sort by: Newest Arrival</option>
                <option>Sort by: Harvest Season</option>
              </select>
            </div>
          </div>

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <React.Fragment key={product.id}>
                    {/* Render standard product card */}
                    <ProductCard product={product} dictionary={dictionary} />
                    
                    {/* Inject Banner after the 3rd item (index 2) */}
                    {index === 2 && showBanner && (
                      <ProductBanner />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Fallback if banner didn't get inserted because fewer than 3 items, 
                  but we still want to show it maybe at the end? 
                  For now adhering to "grid flow" logic above. */}

              <Pagination 
                totalPages={productsData.totalPages} 
                currentPage={productsData.currentPage} 
              />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {dictionary.product_page.no_products}
              </h3>
              <p className="text-slate-400">
                {dictionary.product_page.no_products_desc}
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer dictionary={dictionary} />
    </main>
  )
}

import React from 'react' // Needed for Fragment
