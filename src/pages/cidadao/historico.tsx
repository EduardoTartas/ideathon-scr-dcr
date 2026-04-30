import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCreditos } from "@/hooks/useCreditos"

export function CidadaoHistoricoPage() {
  const { resumo } = useCreditos()

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Historico
        </p>
        <h1 className="font-heading text-3xl">Todos os descartes</h1>
        <p className="text-muted-foreground">
          Acompanhe cada registro e o status de confirmacao.
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
            {resumo.historico.map((item) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
