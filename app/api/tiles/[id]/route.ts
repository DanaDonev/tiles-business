import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    const tile = await prisma.tile.findUnique({
      where: { id: params.id },
      include: {
        likes: session?.user?.id
          ? {
              where: { userId: session.user.id },
              select: { id: true }
            }
          : false
      }
    })

    if (!tile) {
      return NextResponse.json(
        { error: 'Tile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      tile: {
        ...tile,
        liked: session?.user?.id && tile.likes && (tile.likes as any).length > 0
      }
    })
  } catch (error) {
    console.error('Get tile error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tile' },
      { status: 500 }
    )
  }
}
