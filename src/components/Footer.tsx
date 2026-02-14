import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer({ dictionary }: { dictionary: any }) {
  return (
    <footer className="bg-background-dark border-t border-white/10 pt-20 pb-10 px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-white">
                <span className="material-symbols-outlined text-2xl">local_shipping</span>
              </div>
              <span className="text-xl font-black uppercase tracking-tighter text-white">Made in Bled <span className="text-primary">Trading</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Setting the standard in Algerian agricultural exports through innovation, transparency, and logistical excellence.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/share/1C6KsuuutN/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-navy-deep border border-white/10 text-white hover:bg-primary transition-all"
              >
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a 
                href="https://www.instagram.com/made_in_bled_trading?igsh=eHlhZzdxd3UzYjhj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-navy-deep border border-white/10 text-white hover:bg-primary transition-all"
              >
                <span className="material-symbols-outlined">language</span>
              </a>
            </div>
          </div>
          
          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.home}</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.about}</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.products}</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">{dictionary.navigation.contact}</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Global Contact Center</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-primary">phone_iphone</span>
                  <span className="text-sm">+213 559 100 042</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <span className="text-sm">Madeinbledtrading@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-primary">public</span>
                  <span className="text-sm">www.Madeinbledtrading.com</span>
                </div>
              </div>
              <div className="flex gap-3 text-slate-400">
                <span className="material-symbols-outlined text-primary flex-shrink-0">location_on</span>
                <span className="text-sm">Main Export Hub, Industrial Zone, Algiers, Algeria</span>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-lg grayscale border border-white/10 h-32 w-full">
              <img 
                alt="Location Map" 
                className="h-full w-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCab4bE-qDa0nGvFtDqhoEcLJ3mBCAec7nINseybl7MGHhzzZR0ysZP0KR9hF3taEmnQj3AoUibOWh7BGaC0GUlB2ctdDvo25LVVJTZWRNwsTSuVYZWV2sb_gX5wTb9qWnfULQOHxSZ5f3a7H6z392SQEZQjrbcMS1uEXzZ4mwdAgDcgtXf18FV3MXmYAP2RWYMfN-5NCtEvbx59ErKxWJfo3nNHcmuw0oQqMdAqB7thuLg9TTdmOBpBzWNFClJ00uGT6zJ07Zhws0"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Made in Bled Trading. All Rights Reserved. 2026 Edition Ready.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-white text-xs">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-white text-xs">Export Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
