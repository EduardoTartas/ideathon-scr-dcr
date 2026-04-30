import { useCallback, useEffect, useMemo, useState } from "react"
import { addMonths, format, parseISO, subMonths } from "date-fns"

import {
  historicoDescartesCidadao,
  type DescarteItem,
  tabelaConversao,
} from "@/data/mockData"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage"

export type CreditosResumo = {
  saldoCreditos: number
  saldoReais: number
  totalResiduosKg: number
  historico: DescarteItem[]
  mensal: Array<{ mes: string; creditos: number }>
}

const hoje = new Date()

function parseQuantidadeKg(texto: string) {
  const match = texto.replace(",", ".").match(/([0-9]+(\.[0-9]+)?)/)
  if (!match) return 0
  const valor = Number(match[1])
  if (Number.isNaN(valor)) return 0
  if (texto.toLowerCase().includes("kg")) return valor
  return 0
}

export function useCreditos() {
  const [descartes, setDescartes] = useState<DescarteItem[]>(() =>
    loadFromStorage<DescarteItem[]>(STORAGE_KEYS.descartes, [])
  )

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.descartes) {
        setDescartes(
          loadFromStorage<DescarteItem[]>(STORAGE_KEYS.descartes, [])
        )
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const salvarDescarte = useCallback((item: DescarteItem) => {
    setDescartes((prev) => {
      const next = [item, ...prev]
      saveToStorage(STORAGE_KEYS.descartes, next)
      return next
    })
  }, [])

  const resumo = useMemo<CreditosResumo>(() => {
    const historico = [...descartes, ...historicoDescartesCidadao]
    const saldoCreditos = historico.reduce((acc, item) => acc + item.creditos, 0)
    const saldoReais = historico.reduce((acc, item) => {
      const tabela = tabelaConversao.find((row) => row.material === item.material)
      if (!tabela) return acc
      const fator = tabela.valorReais / tabela.creditos
      return acc + item.creditos * fator
    }, 0)
    const totalResiduosKg = historico.reduce(
      (acc, item) => acc + parseQuantidadeKg(item.quantidade),
      0
    )

    const mensal = Array.from({ length: 6 }).map((_, index) => {
      const mesData = addMonths(subMonths(hoje, 5), index)
      const mes = format(mesData, "MMM")
      const creditos = historico
        .filter((item) => {
          const data = parseISO(item.data)
          return (
            data.getMonth() === mesData.getMonth() &&
            data.getFullYear() === mesData.getFullYear()
          )
        })
        .reduce((acc, item) => acc + item.creditos, 0)
      return { mes, creditos }
    })

    return { saldoCreditos, saldoReais, totalResiduosKg, historico, mensal }
  }, [descartes])

  return { resumo, salvarDescarte }
}
