import Link from 'next/link'
import Image from 'next/image'

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
            <p className="text-gray-400 text-sm">
              {dictionary.hero.subtitle}
            </p>
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
