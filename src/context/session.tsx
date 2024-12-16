'use client'

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import type { User } from '@/http/geral/get-me'
import type { verifySession } from '@/lib/dal'
import { AXIOS_INSTANCE } from '@/services/axios-instance'

type SessionContextProviderProps = PropsWithChildren & {
  initialSession: Awaited<ReturnType<typeof verifySession>>
}

type SessionContext = {
  user: User | undefined
  token: string | undefined
}

export const SessionContext = createContext({} as SessionContext)

export const SessionContextProvider = ({
  children,
  initialSession,
}: SessionContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>(initialSession?.user)
  const [token, setToken] = useState<string | undefined>(initialSession?.token)

  useEffect(() => {
    if (!initialSession) {
      setUser(undefined)
      setToken(undefined)
      AXIOS_INSTANCE.defaults.headers.Authorization = ''

      return
    }

    setUser(initialSession.user)
    setToken(initialSession.token)
    AXIOS_INSTANCE.defaults.headers.Authorization = `Bearer ${initialSession.token}`
  }, [initialSession])

  return (
    <SessionContext.Provider value={{ user, token }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('SessionContext must be used within SessionContextProvider')
  }

  return context
}
