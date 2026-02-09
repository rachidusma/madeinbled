import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProcessComponent from '../../../components/Process'

export default async function Process({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen">
      <Navbar dictionary={dictionary} lang={lang} />
      <div className="pt-32">
         {/* Reusing Process component */}
        <ProcessComponent dictionary={dictionary} />
      </div>
      <Footer dictionary={dictionary} />
    </main>
  )
}
