'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react'
import { hasSupabaseConfig, supabase } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'
import type { UserProfile, AuthUser } from '@/lib/supabase/types'

interface AuthContextValue {
  user: AuthUser | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null; session: Session | null }>
  signOut: () => Promise<{ error: Error | null }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = useCallback(
    async (userId: string): Promise<UserProfile | null> => {
      if (!hasSupabaseConfig()) return null

      const { data, error } = await supabase()
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error || !data) return null
      return data as UserProfile
    },
    []
  )

  const bootstrapProfile = useCallback(async (): Promise<UserProfile | null> => {
    if (!hasSupabaseConfig()) return null

    try {
      const response = await fetch('/api/auth/bootstrap-profile', { method: 'POST' })
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        console.warn('[AuthContext] bootstrap-profile failed:', payload?.error ?? response.statusText)
        return null
      }

      return (payload?.profile ?? null) as UserProfile | null
    } catch (error) {
      console.warn('[AuthContext] bootstrap-profile request failed:', error)
      return null
    }
  }, [])

  const loadSessionUser = useCallback(
    async (currentSession: Session | null) => {
      setSession(currentSession)

      if (!currentSession?.user) {
        setUser(null)
        return
      }

      const userId = currentSession.user.id
      const userEmail = currentSession.user.email ?? ''

      setUser({
        id: userId,
        email: userEmail,
        profile: null,
      })

      let profile = await fetchProfile(userId)
      if (!profile) {
        const bootstrapped = await bootstrapProfile()
        profile = bootstrapped ?? (await fetchProfile(userId))
      }

      setUser({
        id: userId,
        email: userEmail,
        profile,
      })
    },
    [bootstrapProfile, fetchProfile]
  )

  const refreshProfile = useCallback(async () => {
    if (!session?.user) return
    const profile = await fetchProfile(session.user.id)
    setUser({
      id: session.user.id,
      email: session.user.email ?? '',
      profile,
    })
  }, [session, fetchProfile])

  // Listen to auth state changes and load profile
  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setIsLoading(false)
      return
    }

    const {
      data: { subscription },
    } = supabase().auth.onAuthStateChange((_event, session) => {
      void loadSessionUser(session as Session | null)
        .catch((error) => {
          console.warn('[AuthContext] auth state sync failed:', error)
        })
        .finally(() => setIsLoading(false))
    })

    // Initial session check
    supabase()
      .auth.getSession()
      .then(({ data: { session } }) => {
        void loadSessionUser(session as Session | null)
          .catch((error) => {
            console.warn('[AuthContext] initial session load failed:', error)
          })
          .finally(() => setIsLoading(false))
      })
      .catch(() => setIsLoading(false))

    return () => subscription.unsubscribe()
  }, [loadSessionUser])

  const signIn = async (email: string, password: string) => {
    if (!hasSupabaseConfig()) {
      return { error: new Error('Supabase environment variables are missing'), session: null }
    }

    const { data, error } = await supabase().auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      void loadSessionUser(data.session ?? null).catch((profileError) => {
        console.warn('[AuthContext] post-login profile load failed:', profileError)
      })
    }

    return { error: error as Error | null, session: data.session ?? null }
  }

  const signOut = async () => {
    if (!hasSupabaseConfig()) {
      setUser(null)
      setSession(null)
      return { error: null }
    }

    const { error } = await supabase().auth.signOut()
    setUser(null)
    setSession(null)
    return { error: error as Error | null }
  }

  return (
    <AuthContext.Provider
      value={{ user, session, isLoading, signIn, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
