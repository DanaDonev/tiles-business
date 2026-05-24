'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const TILE_TYPES = ['GENERAL', 'BATHROOM', 'KITCHEN', 'OUTDOORS']
const COLORS = ['White', 'Black', 'Gray', 'Beige', 'Brown', 'Blue', 'Green', 'Red', 'Marble', 'Mosaic']
const DIMENSIONS = ['20x20cm', '30x30cm', '30x60cm', '60x60cm', '10x10cm', '40x40cm']

interface FilterBarProps {
  onFilterChange?: () => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get('type')?.split(',').filter(Boolean) || []
  )
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || '')
  const [selectedDimensions, setSelectedDimensions] = useState(searchParams.get('dimensions') || '')

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedTypes.length > 0) {
      params.set('type', selectedTypes.join(','))
    }
    if (selectedColor) {
      params.set('color', selectedColor)
    }
    if (selectedDimensions) {
      params.set('dimensions', selectedDimensions)
    }

    const queryString = params.toString()
    router.push(`/tiles${queryString ? '?' + queryString : ''}`)
    onFilterChange?.()
  }

  const resetFilters = () => {
    setSelectedTypes([])
    setSelectedColor('')
    setSelectedDimensions('')
    router.push('/tiles')
    onFilterChange?.()
  }

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold mb-6">Filter Tiles</h3>

      {/* Type Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Tile Type</h4>
        <div className="space-y-2">
          {TILE_TYPES.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="w-4 h-4 rounded"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Color</h4>
        <select
          value={selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Colors</option>
          {COLORS.map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Dimensions Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Dimensions</h4>
        <select
          value={selectedDimensions}
          onChange={e => setSelectedDimensions(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Dimensions</option>
          {DIMENSIONS.map(dim => (
            <option key={dim} value={dim}>
              {dim}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={applyFilters}
          className="flex-1 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
