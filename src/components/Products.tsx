import Link from 'next/link'

export default function Products({ dictionary }: { dictionary: any }) {
  // Mapping keys to icons/colors
  // Fixed 'brown' to 'stone' as brown is not default tailwind
  const products = [
    { key: 'fruits', color: 'bg-orange-100 text-orange-600', icon: '🍎' },
    { key: 'vegetables', color: 'bg-green-100 text-green-600', icon: '🥦' },
    { key: 'dates', color: 'bg-orange-100 text-bled-orange', icon: '🌴' },
    { key: 'spreads', color: 'bg-stone-200 text-stone-800', icon: '🌰' }, 
    { key: 'chocolates', color: 'bg-zinc-100 text-zinc-800', icon: '🍫' },
    { key: 'biscuits', color: 'bg-yellow-50 text-yellow-600', icon: '🍪' },
    { key: 'olive_oil', color: 'bg-lime-100 text-lime-700', icon: '🫒' },
  ]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {dictionary.products.title}
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            {dictionary.about_page.presentation.content}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.key} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group border border-gray-100 flex flex-col items-center">
              <div className={`w-full h-40 flex items-center justify-center text-6xl ${product.color} group-hover:scale-105 transition duration-500`}>
                {product.icon}
              </div>
              <div className="p-6 text-center w-full">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-bled-orange transition">
                  {dictionary.products[product.key]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
