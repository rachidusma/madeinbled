import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer({ dictionary }: { dictionary: any }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <div className="mb-4 bg-white p-2 rounded inline-block">
               <Image 
                src="/logo.jpg" 
                alt="MadeINBladi Logo" 
                width={150} 
                height={50} 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              {dictionary.hero.subtitle}
            </p>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                {dictionary.footer.follow_us}
              </h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/share/1C6KsuuutN/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1877F2] transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/made_in_bled_trading?igsh=eHlhZzdxd3UzYjhj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E4405F] transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.tiktok.com/@made.in.bled.trad?_r=1&_t=ZS-93oGrAUyDr7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="24" 
                    height="24" 
                    fill="currentColor"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.88-.39-2.82-.14-.81.18-1.55.62-2.01 1.34-.43.68-.5 1.55-.26 2.3.24.78.85 1.45 1.62 1.75.95.34 2.05.22 2.91-.35.58-.4.96-.98 1.12-1.66.19-1.29.14-2.58.14-3.87.02-4.63-.01-9.26.02-13.89z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-green-400">{dictionary.navigation.home}</Link></li>
              <li><Link href="/about" className="hover:text-green-400">{dictionary.navigation.about}</Link></li>
              <li><Link href="/products" className="hover:text-green-400">{dictionary.navigation.products}</Link></li>
              <li><Link href="/contact" className="hover:text-green-400">{dictionary.navigation.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Algiers, Algeria</li>
              <li>info@madeinbladi.dz</li>
              <li>+213 555 123 456</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for updates.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-green-500" />
              <button className="bg-green-600 px-4 py-2 rounded-r-md hover:bg-green-700">OK</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MadeINBladi Trading. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
