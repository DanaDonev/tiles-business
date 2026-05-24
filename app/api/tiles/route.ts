import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')?.split(',') || []
    const color = searchParams.get('color')
    const dimensions = searchParams.get('dimensions')

    const session = await getServerSession(authOptions)

    // Build where clause
    const where: any = {}

    if (type.length > 0 && type[0]) {
      where.type = { in: type }
    }

    if (color) {
      where.color = { equals: color, mode: 'insensitive' }
    }

    if (dimensions) {
      where.dimensions = { equals: dimensions, mode: 'insensitive' }
    }

    // Fetch tiles
    const tiles = await prisma.tile.findMany({
      where,
      include: {
        likes: session?.user?.id
          ? {
              where: { userId: session.user.id },
              select: { id: true }
            }
          : false
      }
    })

    // Format response
    const formattedTiles = tiles.map(tile => ({
      ...tile,
      liked: session?.user?.id && tile.likes && (tile.likes as any).length > 0
    }))

    return NextResponse.json({ tiles: formattedTiles })
  } catch (error) {
    console.error('Get tiles error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tiles' },
      { status: 500 }
    )
  }
}
