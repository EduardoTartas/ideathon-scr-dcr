import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { useTabelaConversao } from "@/hooks/useTabelaConversao"

export function GestaoParametrizacaoPage() {
  const { tabela, atualizarTabela } = useTabelaConversao()
  const [toastOpen, setToastOpen] = useState(false)

  const media = useMemo(() => {
    const total = tabela.reduce((acc, item) => acc + item.creditos, 0)
    return tabela.length ? total / tabela.length : 0
  }, [tabela])

  const handleUpdate = (index: number, field: "creditos" | "valorReais", value: string) => {
    const numeric = Number(value.replace(",", "."))
    if (Number.isNaN(numeric)) return
    const next = tabela.map((item, idx) =>
      idx === index ? { ...item, [field]: numeric } : item
    )
    atualizarTabela(next)
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Parametrizacao
        </p>
        <h1 className="font-heading text-3xl">Tabela de conversao</h1>
        <p className="text-muted-foreground">
          Ajuste creditos e valores referenciais conforme diretrizes municipais.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Valores vigentes</CardTitle>
          <Button onClick={() => setToastOpen(true)}>Salvar alteracoes</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Creditos</TableHead>
                <TableHead>Valor R$</TableHead>
                <TableHead>Comparativo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tabela.map((item, index) => (
                <TableRow key={item.material}>
                  <TableCell className="font-medium">{item.categoria}</TableCell>
                  <TableCell>{item.material}</TableCell>
                  <TableCell>{item.unidade}</TableCell>
                  <TableCell>
                    <Input
                      defaultValue={item.creditos.toFixed(2)}
                      onBlur={(event) => handleUpdate(index, "creditos", event.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={item.valorReais.toFixed(2)}
                      onBlur={(event) => handleUpdate(index, "valorReais", event.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.creditos >= media ? "success" : "warning"}>
                      {item.creditos >= media ? "Acima" : "Abaixo"} da media
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Toast open={toastOpen} onOpenChange={setToastOpen} duration={3500}>
        <ToastTitle>Alteracoes salvas</ToastTitle>
        <ToastDescription>
          A nova tabela foi persistida no armazenamento local.
        </ToastDescription>
      </Toast>
    </div>
  )
}
