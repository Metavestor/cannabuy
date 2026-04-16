import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Factory function that returns a Supabase client instance bound to the
 * current browser context. Use this instead of importing the client directly.
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase/client'
 *   const client = supabase()
 */
export function supabase(): SupabaseClient {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
