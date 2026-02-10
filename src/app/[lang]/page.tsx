import { getDictionary } from '../../get-dictionary'
import { Locale } from '../../i18n-config'
import Hero from '../../components/Hero'
import Products from '../../components/Products'
import Process from '../../components/Process'
import ContactCTA from '../../components/ContactCTA'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getCategories } from '../../lib/actions'

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  const categories = await getCategories()

  return (
    <main className="min-h-screen">
      <Navbar dictionary={dictionary} lang={lang} />
      <Hero dictionary={dictionary} />
      <Products dictionary={dictionary} categories={categories} />

      <Process dictionary={dictionary} />
      <ContactCTA dictionary={dictionary} />
      <Footer dictionary={dictionary} />
    </main>
  )
}
