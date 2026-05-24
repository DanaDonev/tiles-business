'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              TilesPro
            </h3>
            <p className="text-gray-400">
              Premium tiles for every space. Transform your home with quality and style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/tiles" className="hover:text-white transition">Browse Tiles</Link></li>
              <li><Link href="/qa" className="hover:text-white transition">Q&A</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition">Login</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition">Sign Up</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white transition cursor-pointer">General</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Bathroom</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Kitchen</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Outdoors</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: <span className="text-white">info@tilespro.com</span></li>
              <li>Phone: <span className="text-white">+1 (555) 123-4567</span></li>
              <li className="pt-2">
                <Link href="/qa" className="text-purple-400 hover:text-purple-300 transition">
                  Have questions? Contact us →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © {currentYear} TilesPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
