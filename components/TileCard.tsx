'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Tile {
  id: string
  name: string
  type: string
  color: string
  dimensions: string
  price: number
  imageUrl: string
  liked?: boolean
}

interface TileCardProps {
  tile: Tile
  onLikeChange?: (tileId: string, isLiked: boolean) => void
}

export default function TileCard({ tile, onLikeChange }: TileCardProps) {
  const [isLiked, setIsLiked] = useState(tile.liked || false)
  const [likeCount, setLikeCount] = useState(0)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/likes', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tileId: tile.id })
      })

      if (response.ok) {
        const newLikedState = !isLiked
        setIsLiked(newLikedState)
        onLikeChange?.(tile.id, newLikedState)
      } else if (response.status === 401) {
        // Redirect to login
        window.location.href = '/auth/login'
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <Link href={`/tiles/${tile.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-6xl opacity-30">🏠</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{tile.name}</h3>

          {/* Attributes */}
          <div className="space-y-1 text-sm text-gray-600 mb-3 flex-grow">
            <p>
              <span className="font-medium">Type:</span> {tile.type}
            </p>
            <p>
              <span className="font-medium">Dimensions:</span> {tile.dimensions}
            </p>
            <p>
              <span className="font-medium">Color:</span> {tile.color}
            </p>
          </div>

          {/* Price and Like */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-xl font-bold text-purple-600">${tile.price.toFixed(2)}</span>
            <button
              onClick={handleLike}
              className={`px-3 py-2 rounded-lg transition ${
                isLiked
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
