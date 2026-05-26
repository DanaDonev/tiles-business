import { supabaseServer, db } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Create user with Supabase Auth
    const { data: authUser, error: authError } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      user_metadata: { name }
    })

    if (authError) {
      // Check if user already exists
      if (authError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
      throw authError
    }

    // Create user profile in users table
    const { data: userProfile, error: profileError } = await db.users()
      .insert({
        id: authUser.user.id,
        email,
        name
      })
      .select()
      .single()

    if (profileError) {
      throw profileError
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
