import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabaseServer, db } from './supabaseClient'

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        // Use Supabase Auth to verify credentials
        const { data, error } = await supabaseServer.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })

        if (error || !data.user) {
          throw new Error('Invalid email or password')
        }

        // Get user profile from users table
        const { data: userProfile } = await db.users()
          .select('*')
          .eq('id', data.user.id)
          .single()

        return {
          id: data.user.id,
          email: data.user.email,
          name: userProfile?.name || data.user.user_metadata?.name,
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
