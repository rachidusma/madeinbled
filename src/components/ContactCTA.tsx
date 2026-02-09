import Link from 'next/link'

export default function ContactCTA({ dictionary }: { dictionary: any }) {
  return (
    <section id="contact" className="py-20 bg-bled-blue text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl mb-8">
          {dictionary.cta_final.title}
        </h2>
        <Link 
          href="/contact" 
          className="inline-block bg-white text-bled-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-lg"
        >
          {dictionary.cta_final.button}
        </Link>
      </div>
    </section>
  )
}
