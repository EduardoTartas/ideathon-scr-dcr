export const STORAGE_KEYS = {
  tabelaConversao: "scr_dcr_tabela_conversao",
  descartes: "scr_dcr_descartes",
  auth: "scr_dcr_auth",
} as const

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
}
