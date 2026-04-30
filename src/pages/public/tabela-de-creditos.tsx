import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { tabelaConversao } from "@/data/mockData"

export function TabelaDeCreditosPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Conversao municipal
        </p>
        <h1 className="font-heading text-4xl">Tabela completa de creditos</h1>
        <p className="max-w-2xl text-muted-foreground">
          Valores de referencia atualizados pela prefeitura. O resgate segue a tabela
          vigente na data do descarte.
        </p>
      </div>

      <div className="rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Creditos</TableHead>
              <TableHead>Valor em R$</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tabelaConversao.map((item) => (
              <TableRow key={item.material}>
                <TableCell className="font-medium">{item.categoria}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell>{item.unidade}</TableCell>
                <TableCell>{item.creditos.toFixed(1)}</TableCell>
                <TableCell>R$ {item.valorReais.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
