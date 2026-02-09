import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductsComponent from '../../../components/Products'

export default async function Products({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen">
      <Navbar dictionary={dictionary} lang={lang} />
      <div className="pt-32">
        {/* Reusing the Products component from homepage but maybe with more details later */}
        <ProductsComponent dictionary={dictionary} />
      </div>
      <Footer dictionary={dictionary} />
    </main>
  )
}
