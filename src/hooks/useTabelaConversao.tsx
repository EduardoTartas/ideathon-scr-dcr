import { useCallback, useEffect, useState } from "react"

import { tabelaConversao, type ConversaoItem } from "@/data/mockData"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage"

export function useTabelaConversao() {
  const [tabela, setTabela] = useState<ConversaoItem[]>(() =>
    loadFromStorage<ConversaoItem[]>(STORAGE_KEYS.tabelaConversao, tabelaConversao)
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.tabelaConversao, tabela)
  }, [tabela])

  const atualizarTabela = useCallback((next: ConversaoItem[]) => {
    setTabela(next)
  }, [])

  return { tabela, atualizarTabela }
}
