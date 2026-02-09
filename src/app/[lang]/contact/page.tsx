import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ContactForm from '../../../components/ContactForm'

export default async function Contact({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar dictionary={dictionary} lang={lang} />
      <ContactForm dictionary={dictionary} />
      <Footer dictionary={dictionary} />
    </main>
  )
}
