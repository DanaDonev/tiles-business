'use client'

import TileCard from './TileCard'

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

interface TileGridProps {
  tiles: Tile[]
  isLoading?: boolean
}

export default function TileGrid({ tiles, isLoading }: TileGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg h-80 animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tiles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No tiles found matching your filters.</p>
        <p className="text-gray-500 mt-2">Try adjusting your filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiles.map(tile => (
        <TileCard key={tile.id} tile={tile} />
      ))}
    </div>
  )
}
