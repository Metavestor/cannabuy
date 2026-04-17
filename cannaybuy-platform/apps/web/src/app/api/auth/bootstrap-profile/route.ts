'use server'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function createSessionClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase environment variables are missing')
  }

  const cookieStore = cookies()
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options })
      },
    },
  })
}

function createServiceClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured')
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

function normalizeRole(input: unknown): 'super_admin' | 'admin' | 'manager' | 'budtender' | 'viewer' {
  const value = typeof input === 'string' ? input : ''
  if (value === 'super_admin' || value === 'admin' || value === 'manager' || value === 'budtender' || value === 'viewer') {
    return value
  }
  return 'viewer'
}

export async function POST(request: Request) {
  try {
    const sessionClient = createSessionClient()
    const { data: userData, error: userError } = await sessionClient.auth.getUser()

    if (userError || !userData.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const serviceClient = createServiceClient()
    const user = userData.user
    const role = normalizeRole(user.user_metadata?.role ?? user.app_metadata?.role)

    const { data: existingProfile, error: profileLookupError } = await serviceClient
      .from('user_profiles')
      .select('id, tenant_id, role')
      .eq('id', user.id)
      .maybeSingle()

    if (profileLookupError) {
      return NextResponse.json({ error: profileLookupError.message }, { status: 400 })
    }

    if (existingProfile) {
      return NextResponse.json({ profile: existingProfile, created: false })
    }

    const { data: tenants, error: tenantError } = await serviceClient
      .from('tenants')
      .select('id')
      .eq('is_active', true)
      .order('name', { ascending: true })
      .limit(1)

    if (tenantError) {
      return NextResponse.json({ error: tenantError.message }, { status: 400 })
    }

    const tenantId = tenants?.[0]?.id
    if (!tenantId) {
      return NextResponse.json({ error: 'No active tenant available for profile bootstrap' }, { status: 400 })
    }

    const { data: createdProfile, error: insertError } = await serviceClient
      .from('user_profiles')
      .upsert(
        {
          id: user.id,
          tenant_id: tenantId,
          role,
        },
        { onConflict: 'id' }
      )
      .select('id, tenant_id, role')
      .single()

    if (insertError || !createdProfile) {
      return NextResponse.json({ error: insertError?.message ?? 'Failed to create profile' }, { status: 400 })
    }

    return NextResponse.json({ profile: createdProfile, created: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
