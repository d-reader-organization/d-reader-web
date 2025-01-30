import { createStore } from 'zustand/vanilla'

export type AuthState = {
  accessToken: string
  isAuthenticated: boolean
}

export type AuthStore = AuthState

export const defaultInitState: AuthState = {
  accessToken: '',
  isAuthenticated: false,
}

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(() => initState)
}
