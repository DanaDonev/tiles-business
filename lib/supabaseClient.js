import { createClient } from '@supabase/supabase-js'

// Client-side Supabase client (anon key for browser)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Server-side Supabase client (service role key for server operations)
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Database table query helpers
export const db = {
  users: () => supabaseServer.from('users'),
  tiles: () => supabase.from('tiles'),
  likes: () => supabase.from('likes'),
  contacts: () => supabase.from('contacts')
}