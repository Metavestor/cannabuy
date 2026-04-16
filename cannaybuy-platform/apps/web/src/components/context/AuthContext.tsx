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
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
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
        .single()

      if (error || !data) return null
      return data as UserProfile
    },
    []
  )

  const refreshProfile = useCallback(async () => {
    if (!session?.user) return
    const profile = await fetchProfile(session.user.id)
    if (profile) {
      setUser({ id: session.user.id, email: session.user.email ?? '', profile })
    }
  }, [session, fetchProfile])

  // Listen to auth state changes and load profile
  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setIsLoading(false)
      return
    }

    const {
      data: { subscription },
    } = supabase().auth.onAuthStateChange(async (_event, session) => {
      setSession(session as Session | null)
      if (session?.user) {
        const profile = await fetchProfile(session.user.id)
        setUser(
          profile
            ? { id: session.user.id, email: session.user.email ?? '', profile }
            : null
        )
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    // Initial session check
    supabase()
      .auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session as Session | null)
        if (session?.user) {
          fetchProfile(session.user.id).then((profile) => {
            setUser(
              profile
                ? {
                    id: session.user.id,
                    email: session.user.email ?? '',
                    profile,
                  }
                : null
            )
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
      .catch(() => setIsLoading(false))

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  const signIn = async (email: string, password: string) => {
    if (!hasSupabaseConfig()) {
      return { error: new Error('Supabase environment variables are missing') }
    }

    const { error } = await supabase().auth.signInWithPassword({
      email,
      password,
    })
    return { error: error as Error | null }
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
