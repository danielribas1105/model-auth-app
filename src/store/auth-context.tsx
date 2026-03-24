import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { authApi, UserResponse } from "@/src/services/api"
import { tokenStorage } from "@/src/services/tokenStorage"

interface AuthState {
   user: UserResponse | null
   isLoading: boolean
   isAuthenticated: boolean
}

interface AuthContextValue extends AuthState {
   login: (email: string, password: string) => Promise<void>
   logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [state, setState] = useState<AuthState>({
      user: null,
      isLoading: true,
      isAuthenticated: false,
   })

   // Restore session on app launch
   useEffect(() => {
      ;(async () => {
         try {
            const token = await tokenStorage.getAccessToken()
            if (token) {
               const user = await authApi.me(token)
               setState({ user, isLoading: false, isAuthenticated: true })
            } else {
               setState((s) => ({ ...s, isLoading: false }))
            }
         } catch {
            await tokenStorage.clearTokens()
            setState({ user: null, isLoading: false, isAuthenticated: false })
         }
      })()
   }, [])

   const login = useCallback(async (email: string, password: string) => {
      const tokens = await authApi.login({ email, password })
      await tokenStorage.setTokens(tokens.access_token, tokens.refresh_token)
      const user = await authApi.me(tokens.access_token)
      setState({ user, isLoading: false, isAuthenticated: true })
   }, [])

   const logout = useCallback(async () => {
      await tokenStorage.clearTokens()
      setState({ user: null, isLoading: false, isAuthenticated: false })
   }, [])

   return (
      <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
   )
}

export function useAuth(): AuthContextValue {
   const ctx = useContext(AuthContext)
   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
   return ctx
}
