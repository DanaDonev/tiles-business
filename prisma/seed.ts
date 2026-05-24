import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  // Clear existing data
  await prisma.like.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.tile.deleteMany()
  await prisma.user.deleteMany()

  console.log('Creating demo user...')
  const hashedPassword = await bcrypt.hash('password123', 10)
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User'
    }
  })
  console.log('Demo user created:', demoUser.email)

  console.log('Creating tiles...')
  const tiles = [
    // Bathroom tiles
    {
      name: 'Classic White Ceramic',
      type: 'BATHROOM' as const,
      description: 'Elegant white ceramic tiles perfect for modern bathrooms',
      dimensions: '30x30cm',
      color: 'White',
      price: 25.99,
      imageUrl: '/tile-images/white-ceramic.jpg'
    },
    {
      name: 'Marble Luxury Collection',
      type: 'BATHROOM' as const,
      description: 'Premium marble tiles for luxurious bathroom aesthetics',
      dimensions: '60x60cm',
      color: 'Marble',
      price: 89.99,
      imageUrl: '/tile-images/marble-luxury.jpg'
    },
    {
      name: 'Ocean Blue Mosaic',
      type: 'BATHROOM' as const,
      description: 'Beautiful blue mosaic tiles with water-resistant coating',
      dimensions: '20x20cm',
      color: 'Blue',
      price: 42.50,
      imageUrl: '/tile-images/ocean-blue.jpg'
    },
    {
      name: 'Gold Trim Elegance',
      type: 'BATHROOM' as const,
      description: 'Sophisticated tiles with gold accents',
      dimensions: '40x40cm',
      color: 'Beige',
      price: 79.99,
      imageUrl: '/tile-images/gold-trim.jpg'
    },
    // Kitchen tiles
    {
      name: 'Rustic Terracotta',
      type: 'KITCHEN' as const,
      description: 'Warm terracotta tiles for a kitchen with character',
      dimensions: '30x30cm',
      color: 'Brown',
      price: 35.99,
      imageUrl: '/tile-images/rustic-terracotta.jpg'
    },
    {
      name: 'Matte Black Minimalist',
      type: 'KITCHEN' as const,
      description: 'Sleek and modern black tiles for contemporary kitchens',
      dimensions: '30x60cm',
      color: 'Black',
      price: 45.00,
      imageUrl: '/tile-images/black-minimalist.jpg'
    },
    {
      name: 'Subway Style White',
      type: 'KITCHEN' as const,
      description: 'Timeless subway tiles, perfect for kitchen backsplashes',
      dimensions: '10x20cm',
      color: 'White',
      price: 28.50,
      imageUrl: '/tile-images/subway-white.jpg'
    },
    {
      name: 'Forest Green Botanical',
      type: 'KITCHEN' as const,
      description: 'Nature-inspired green tiles for a fresh kitchen feel',
      dimensions: '30x30cm',
      color: 'Green',
      price: 38.99,
      imageUrl: '/tile-images/forest-green.jpg'
    },
    // Outdoor tiles
    {
      name: 'Slate Stone Outdoor',
      type: 'OUTDOORS' as const,
      description: 'Durable slate tiles for outdoor patios and pathways',
      dimensions: '60x60cm',
      color: 'Gray',
      price: 52.99,
      imageUrl: '/tile-images/slate-stone.jpg'
    },
    {
      name: 'Terracotta Garden',
      type: 'OUTDOORS' as const,
      description: 'Rustic terracotta tiles for garden patios',
      dimensions: '30x30cm',
      color: 'Brown',
      price: 32.50,
      imageUrl: '/tile-images/garden-terracotta.jpg'
    },
    {
      name: 'Natural Stone Beige',
      type: 'OUTDOORS' as const,
      description: 'Premium natural stone tiles for sophisticated outdoor spaces',
      dimensions: '40x40cm',
      color: 'Beige',
      price: 58.99,
      imageUrl: '/tile-images/stone-beige.jpg'
    },
    {
      name: 'Granite Hardscape',
      type: 'OUTDOORS' as const,
      description: 'Heavy-duty granite tiles for driveways and paths',
      dimensions: '60x60cm',
      color: 'Gray',
      price: 72.50,
      imageUrl: '/tile-images/granite-hardscape.jpg'
    },
    // General tiles
    {
      name: 'Universal Beige',
      type: 'GENERAL' as const,
      description: 'Versatile beige tiles suitable for any room',
      dimensions: '30x30cm',
      color: 'Beige',
      price: 22.99,
      imageUrl: '/tile-images/universal-beige.jpg'
    },
    {
      name: 'Timeless Gray',
      type: 'GENERAL' as const,
      description: 'Neutral gray tiles that work with any design style',
      dimensions: '30x30cm',
      color: 'Gray',
      price: 24.99,
      imageUrl: '/tile-images/timeless-gray.jpg'
    },
    {
      name: 'Modern Geometric Pattern',
      type: 'GENERAL' as const,
      description: 'Contemporary geometric patterned tiles for accent walls',
      dimensions: '20x20cm',
      color: 'Mosaic',
      price: 48.99,
      imageUrl: '/tile-images/geometric-pattern.jpg'
    },
    {
      name: 'Classic Cream',
      type: 'GENERAL' as const,
      description: 'Soft cream tiles for elegant spaces',
      dimensions: '30x30cm',
      color: 'White',
      price: 26.50,
      imageUrl: '/tile-images/classic-cream.jpg'
    },
    {
      name: 'Bold Red Statement',
      type: 'GENERAL' as const,
      description: 'Vibrant red tiles for bold accent features',
      dimensions: '20x20cm',
      color: 'Red',
      price: 39.99,
      imageUrl: '/tile-images/bold-red.jpg'
    },
    {
      name: 'Sophisticated Black Marble',
      type: 'GENERAL' as const,
      description: 'Elegant black marble tiles for luxury spaces',
      dimensions: '60x60cm',
      color: 'Black',
      price: 95.99,
      imageUrl: '/tile-images/black-marble.jpg'
    }
  ]

  for (const tile of tiles) {
    await prisma.tile.create({
      data: tile
    })
  }

  console.log(`Created ${tiles.length} tiles`)

  // Create some likes
  const allTiles = await prisma.tile.findMany()
  if (allTiles.length > 0) {
    await prisma.like.create({
      data: {
        userId: demoUser.id,
        tileId: allTiles[0].id
      }
    })
    console.log('Created sample like')
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
