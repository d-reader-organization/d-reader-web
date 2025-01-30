'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { AuthStore, createAuthStore } from '@/stores/auth-store'

export type AuthStoreApi = ReturnType<typeof createAuthStore>

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined)

export type AuthStoreProviderProps = {
  accessToken: string
  children: ReactNode
  isAuthenticated: boolean
}

export const AuthStoreProvider = ({ accessToken, isAuthenticated, children }: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createAuthStore({
      accessToken,
      isAuthenticated,
    })
  }

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>
}

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext)

  if (!authStoreContext) {
    throw new Error(`useAuthStore must be used within AuthStoreProvider`)
  }

  return useStore(authStoreContext, selector)
}
