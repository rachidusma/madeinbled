import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Image from 'next/image'

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-white">
      <Navbar dictionary={dictionary} lang={lang} />
      
      {/* Hero Section */}
      <div className="bg-[#013765] text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{dictionary.about_page.title}</h1>
            <div className="w-24 h-1 bg-[#FE6B01]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Presentation Section */}
        <section className="max-w-4xl mb-20">
            <h2 className="text-3xl font-bold text-[#013765] mb-6">
                {dictionary.about_page.presentation.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-[#FE6B01] pl-6 py-2">
                {dictionary.about_page.presentation.content}
            </p>
        </section>
      </div>

      <section className="relative w-full min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about-mission-bg.png" 
            alt="Mission Background" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FE6B01]/95 via-[#FE6B01]/90 to-[#FE6B01]/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <div className="mb-6 bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {dictionary.about_page.mission.title}
            </h2>
            <p className="text-xl text-white/95 leading-relaxed font-light">
              {dictionary.about_page.mission.content}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#013765] mb-16 text-center">
            {dictionary.about_page.values.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dictionary.about_page.values.items.map((value: string, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300 border-t-4 border-[#013765] hover:border-[#FE6B01] transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#013765]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FE6B01] group-hover:bg-[#FE6B01]/10 transition-colors">
                  {index === 0 && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                  {index === 1 && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>}
                  {index === 2 && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>}
                  {index === 3 && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>}
                </div>
                <h3 className="text-xl font-bold text-[#013765]">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section - Full Width with Background */}
      <section className="relative w-full min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/vision-bg.png" 
            alt="Vision Background" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#013765]/95 via-[#013765]/90 to-[#013765]/75"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl ml-auto text-right">
            <div className="mb-6 bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center ml-auto">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {dictionary.about_page.vision.title}
            </h2>
            <p className="text-xl text-white/95 leading-relaxed font-light">
              {dictionary.about_page.vision.content}
            </p>
          </div>
        </div>
      </section>

      <Footer dictionary={dictionary} />
    </main>
  )
}
