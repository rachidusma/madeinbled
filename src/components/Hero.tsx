import Link from 'next/link'

export default function Hero({ dictionary }: { dictionary: any }) {
  return (
    <section className="relative bg-bled-blue text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Placeholder for Hero Image - simulating agriculture field */}
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          {dictionary.hero.title}
        </h1>
        <p className="max-w-2xl text-xl md:text-2xl mb-10 text-gray-200">
          {dictionary.hero.subtitle}
        </p>
        <Link 
          href="#contact" 
          className="bg-bled-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          {dictionary.hero.cta}
        </Link>
      </div>
    </section>
  )
}
