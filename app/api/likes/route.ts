import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { tileId } = await request.json()

    if (!tileId) {
      return NextResponse.json(
        { error: 'Tile ID is required' },
        { status: 400 }
      )
    }

    // Check if tile exists
    const tile = await prisma.tile.findUnique({
      where: { id: tileId }
    })

    if (!tile) {
      return NextResponse.json(
        { error: 'Tile not found' },
        { status: 404 }
      )
    }

    // Check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_tileId: {
          userId: session.user.id,
          tileId
        }
      }
    })

    if (existingLike) {
      return NextResponse.json(
        { error: 'Already liked' },
        { status: 409 }
      )
    }

    // Create like
    await prisma.like.create({
      data: {
        userId: session.user.id,
        tileId
      }
    })

    return NextResponse.json({ message: 'Tile liked successfully' })
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json(
      { error: 'Failed to like tile' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { tileId } = await request.json()

    if (!tileId) {
      return NextResponse.json(
        { error: 'Tile ID is required' },
        { status: 400 }
      )
    }

    // Delete like
    await prisma.like.delete({
      where: {
        userId_tileId: {
          userId: session.user.id,
          tileId
        }
      }
    })

    return NextResponse.json({ message: 'Like removed successfully' })
  } catch (error) {
    console.error('Unlike error:', error)
    return NextResponse.json(
      { error: 'Failed to remove like' },
      { status: 500 }
    )
  }
}
