'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          TilesPro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/tiles" className="text-gray-700 hover:text-purple-600 transition">
            Browse Tiles
          </Link>
          <Link href="/qa" className="text-gray-700 hover:text-purple-600 transition">
            Q&A
          </Link>
          <Link href="/auth/login" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition">
            Login
          </Link>
          <Link href="/auth/signup" className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`h-0.5 w-6 bg-gray-700 transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-gray-700 transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-gray-700 transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3">
          <Link href="/tiles" className="block text-gray-700 hover:text-purple-600 py-2">
            Browse Tiles
          </Link>
          <Link href="/qa" className="block text-gray-700 hover:text-purple-600 py-2">
            Q&A
          </Link>
          <Link href="/auth/login" className="block text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
            Login
          </Link>
          <Link href="/auth/signup" className="block text-center px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  )
}
