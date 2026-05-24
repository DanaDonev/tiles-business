'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

interface Tile {
  id: string
  name: string
  type: string
  color: string
  dimensions: string
  price: number
  imageUrl: string
  description: string
  liked?: boolean
}

export default function TileDetail({ params }: { params: { id: string } }) {
  const [tile, setTile] = useState<Tile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    fetchTile()
  }, [params.id])

  const fetchTile = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/tiles/${params.id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch tile')
      }

      const data = await response.json()
      setTile(data.tile)
      setIsLiked(data.tile.liked || false)
    } catch (err) {
      setError('Failed to load tile details. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tileId: params.id })
      })

      if (response.ok) {
        setIsLiked(!isLiked)
      } else if (response.status === 401) {
        window.location.href = '/auth/login'
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="animate-pulse space-y-6">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !tile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="bg-red-50 text-red-800 p-6 rounded-lg border border-red-200 mb-6">
            {error || 'Tile not found'}
          </div>
          <Link href="/tiles" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Back to Tiles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Back Button */}
        <Link href="/tiles" className="text-purple-600 hover:text-purple-700 font-semibold mb-6 inline-block">
          ← Back to Tiles
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96">
              <span className="text-8xl opacity-20">🏠</span>
            </div>

            {/* Details */}
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{tile.name}</h1>
                  <p className="text-gray-600 text-lg mb-4">{tile.description}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold">{tile.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-semibold">{tile.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-semibold">{tile.color}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-3xl font-bold text-purple-600">${tile.price.toFixed(2)}</span>
                  <button
                    onClick={handleLike}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      isLiked
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    {isLiked ? '❤️ Liked' : '🤍 Like'}
                  </button>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Have Questions About This Tile?</h2>
          <p className="text-gray-700 mb-4">
            Our experts are ready to help you choose the perfect tile for your project.
          </p>
          <Link href="/qa" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
            Ask an Expert
          </Link>
        </div>

        {/* Related Tiles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Similar Tiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 text-center">
                <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-5xl opacity-20">🏠</span>
                </div>
                <p className="text-gray-600">Similar tile #{i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
