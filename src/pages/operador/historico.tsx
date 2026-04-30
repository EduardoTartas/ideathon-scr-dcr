import { useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { loadFromStorage, STORAGE_KEYS } from "@/lib/storage"
import type { DescarteItem } from "@/data/mockData"

export function OperadorHistoricoPage() {
  const [registros, setRegistros] = useState<DescarteItem[]>([])

  useEffect(() => {
    setRegistros(loadFromStorage<DescarteItem[]>(STORAGE_KEYS.descartes, []))
  }, [])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Historico do PEV
        </p>
        <h1 className="font-heading text-3xl">Descartes registrados</h1>
        <p className="text-muted-foreground">
          Todos os descartes registrados neste ponto.
        </p>
      </div>

      <div className="rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Creditos</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhum descarte registrado ainda.
                </TableCell>
              </TableRow>
            ) : (
              registros.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.data}</TableCell>
                  <TableCell>{item.material}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>{item.creditos.toFixed(1)}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "confirmado" ? "success" : "warning"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
