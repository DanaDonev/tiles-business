import { db, supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    const { data: tile, error } = await db.tiles()
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !tile) {
      return NextResponse.json(
        { error: 'Tile not found' },
        { status: 404 }
      )
    }

    // Check if user has liked this tile
    let liked = false
    if (session?.user?.id) {
      const { data: like } = await supabase
        .from('likes')
        .select('id')
        .eq('userId', session.user.id)
        .eq('tileId', params.id)
        .single()

      liked = !!like
    }

    return NextResponse.json({
      tile: {
        ...tile,
        liked
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
