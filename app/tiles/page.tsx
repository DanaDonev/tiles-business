'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterBar from '@/components/FilterBar'
import TileGrid from '@/components/TileGrid'

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

export default function TilesPage() {
  const searchParams = useSearchParams()
  const [tiles, setTiles] = useState<Tile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTiles()
  }, [searchParams])

  const fetchTiles = async () => {
    setIsLoading(true)
    setError('')

    try {
      const queryString = searchParams.toString()
      const response = await fetch(`/api/tiles${queryString ? '?' + queryString : ''}`)

      if (!response.ok) {
        throw new Error('Failed to fetch tiles')
      }

      const data = await response.json()
      setTiles(data.tiles || [])
    } catch (err) {
      setError('Failed to load tiles. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-2">Browse Our Collection</h1>
        <p className="text-gray-600 mb-12">Find the perfect tiles for your space</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div>
            <FilterBar onFilterChange={fetchTiles} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6 border border-red-200">
                {error}
              </div>
            )}

            <TileGrid tiles={tiles} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
