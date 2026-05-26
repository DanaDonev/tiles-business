import { db, supabase } from '@/lib/supabaseClient'
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

    // Build query with Supabase
    let query = db.tiles().select('*')

    // Apply filters
    if (type.length > 0 && type[0]) {
      query = query.in('type', type)
    }

    if (color) {
      query = query.ilike('color', color)
    }

    if (dimensions) {
      query = query.ilike('dimensions', dimensions)
    }

    const { data: tiles, error } = await query

    if (error) {
      throw error
    }

    // Get likes for current user if authenticated
    let userLikes: any[] = []
    if (session?.user?.id) {
      const { data: likes, error: likesError } = await supabase
        .from('likes')
        .select('tileId')
        .eq('userId', session.user.id)

      if (!likesError && likes) {
        userLikes = likes.map(like => like.tileId)
      }
    }

    // Format response
    const formattedTiles = tiles.map(tile => ({
      ...tile,
      liked: userLikes.includes(tile.id)
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
