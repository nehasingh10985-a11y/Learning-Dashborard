import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Prevent build-time crashes on environments (e.g. CI/Vercel) where env vars
    // are not configured yet.
    return createClient('http://localhost:54321', 'anonymous')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
})()

