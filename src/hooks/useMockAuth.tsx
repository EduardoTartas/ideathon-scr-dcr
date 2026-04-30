import { createContext, useContext, useMemo, useState } from "react"

import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage"

export type UserRole = "cidadao" | "operador" | "gestor"

type AuthState = {
  role: UserRole | null
}

type AuthContextValue = {
  role: UserRole | null
  login: (role: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() =>
    loadFromStorage<AuthState>(STORAGE_KEYS.auth, { role: null })
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      role: state.role,
      login: (role) => {
        const next = { role }
        setState(next)
        saveToStorage(STORAGE_KEYS.auth, next)
      },
      logout: () => {
        const next = { role: null }
        setState(next)
        saveToStorage(STORAGE_KEYS.auth, next)
      },
    }),
    [state.role]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useMockAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useMockAuth must be used within AuthProvider")
  }
  return context
}
