import { useMemo, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { historicoDescartesCidadao } from "@/data/mockData"
import { loadFromStorage, STORAGE_KEYS } from "@/lib/storage"
import type { DescarteItem } from "@/data/mockData"

export function GestaoAuditoriaPage() {
  const [busca, setBusca] = useState("")

  const transacoes = useMemo(() => {
    const locais = loadFromStorage<DescarteItem[]>(STORAGE_KEYS.descartes, [])
    return [...locais, ...historicoDescartesCidadao]
  }, [])

  const filtradas = transacoes.filter((item) =>
    [item.id, item.material, item.ponto].some((campo) =>
      campo.toLowerCase().includes(busca.toLowerCase())
    )
  )

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Auditoria
        </p>
        <h1 className="font-heading text-3xl">Transacoes para auditoria</h1>
        <p className="text-muted-foreground">
          Pesquise por codigo, material ou ponto de coleta.
        </p>
      </div>

      <Input
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
        placeholder="Buscar transacao"
        className="max-w-sm"
      />

      <div className="rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Ponto</TableHead>
              <TableHead>Creditos</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtradas.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.data}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell>{item.ponto}</TableCell>
                <TableCell>{item.creditos.toFixed(1)}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "confirmado" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
