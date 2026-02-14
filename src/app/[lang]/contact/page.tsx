import { Suspense } from 'react'
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
    <main className="min-h-screen bg-background-dark">
      <Navbar dictionary={dictionary} lang={lang} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ContactForm dictionary={dictionary} />
      </Suspense>
      <Footer dictionary={dictionary} />
    </main>
  )
}
