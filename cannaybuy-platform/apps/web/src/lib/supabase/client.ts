import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

function getSupabaseKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
}

export function hasSupabaseConfig(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && getSupabaseKey())
}

/**
 * Factory function that returns a Supabase client instance bound to the
 * current browser context. Use this instead of importing the client directly.
 */
export function supabase(): SupabaseClient {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase environment variables are missing')
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabaseKey()!
  )
}
