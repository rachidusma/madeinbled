import Link from 'next/link'

export default function ContactCTA({ dictionary }: { dictionary: any }) {
  return (
    <section id="contact" className="py-32 bg-[#0A0D14] border-t border-gray-800/50 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <blockquote className="mb-12">
          <p className="text-3xl md:text-4xl italic font-light text-gray-300 leading-snug mb-8">
            &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
          </p>
          <footer className="text-[#3B82F6] font-bold text-xs uppercase tracking-[0.3em]">
            — CURATED PERSPECTIVE
          </footer>
        </blockquote>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact" 
            className="w-full sm:w-auto bg-[#2563EB] text-white px-10 py-5 rounded-xl font-bold text-sm tracking-wide hover:bg-[#1D4ED8] transition-all duration-300 shadow-xl shadow-blue-900/20 active:scale-95"
          >
            Join the Collective
          </Link>
          <Link 
            href="/products" 
            className="w-full sm:w-auto bg-transparent border border-[#2D3748] text-gray-200 px-10 py-5 rounded-xl font-bold text-sm tracking-wide hover:bg-[#1A1F2B] hover:border-[#4A5568] transition-all duration-300 active:scale-95"
          >
            View Lookbook
          </Link>
        </div>
      </div>
    </section>
  )
}
