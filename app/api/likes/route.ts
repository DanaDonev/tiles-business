import { db, supabase } from '@/lib/supabaseClient'
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
    const { data: tile, error: tileError } = await db.tiles()
      .select('id')
      .eq('id', tileId)
      .single()

    if (tileError || !tile) {
      return NextResponse.json(
        { error: 'Tile not found' },
        { status: 404 }
      )
    }

    // Check if like already exists
    const { data: existingLike, error: likeError } = await supabase
      .from('likes')
      .select('id')
      .eq('userId', session.user.id)
      .eq('tileId', tileId)
      .single()

    if (existingLike) {
      return NextResponse.json(
        { error: 'Already liked' },
        { status: 409 }
      )
    }

    // Create like
    const { error: createError } = await supabase
      .from('likes')
      .insert({
        userId: session.user.id,
        tileId
      })

    if (createError) {
      throw createError
    }

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
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('userId', session.user.id)
      .eq('tileId', tileId)

    if (error) {
      throw error
    }

    return NextResponse.json({ message: 'Like removed successfully' })
  } catch (error) {
    console.error('Unlike error:', error)
    return NextResponse.json(
      { error: 'Failed to remove like' },
      { status: 500 }
    )
  }
}
