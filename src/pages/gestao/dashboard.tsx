import { useMemo, useState } from "react"
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { kpisPrefeitura, historicoDescartesCidadao } from "@/data/mockData"
import { loadFromStorage, STORAGE_KEYS } from "@/lib/storage"
import type { DescarteItem } from "@/data/mockData"

const semanaData = [
  { semana: "Sem 1", descartes: 820 },
  { semana: "Sem 2", descartes: 980 },
  { semana: "Sem 3", descartes: 1100 },
  { semana: "Sem 4", descartes: 990 },
]

const distribuicao = [
  { name: "RSU", value: 64 },
  { name: "RCC", value: 36 },
]

const materiaisTop = [
  { name: "Plastico", value: 920 },
  { name: "Papel", value: 780 },
  { name: "Metal", value: 640 },
  { name: "Vidro", value: 510 },
  { name: "Oleo usado", value: 430 },
]

const pieColors = ["#2d7a4f", "#f59e0b"]

export function GestaoDashboardPage() {
  const [page, setPage] = useState(1)
  const pageSize = 5

  const transacoes = useMemo(() => {
    const locais = loadFromStorage<DescarteItem[]>(STORAGE_KEYS.descartes, [])
    return [...locais, ...historicoDescartesCidadao]
  }, [])

  const totalPages = Math.max(1, Math.ceil(transacoes.length / pageSize))
  const pageSlice = transacoes.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Gestao municipal
        </p>
        <h1 className="font-heading text-3xl">Dashboard gerencial</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Cidadaos cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {kpisPrefeitura.totalCidadaosCadastrados}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Descartes no mes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {kpisPrefeitura.totalDescartesMes}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Creditos emitidos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {kpisPrefeitura.totalCreditosEmitidosMes}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Residuos coletados
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {kpisPrefeitura.totalResiduosColetadosKg} kg
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
              Economia estimada
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            R$ {kpisPrefeitura.economiaMunicipalEstimada}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Evolucao semanal de descartes</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={semanaData}>
                <XAxis dataKey="semana" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <Tooltip />
                <Line type="monotone" dataKey="descartes" stroke="#2d7a4f" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribuicao por categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribuicao} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {distribuicao.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top 5 materiais descartados</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={materiaisTop} layout="vertical" barSize={18}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={90} />
              <Tooltip />
              <Bar dataKey="value" fill="#2d7a4f" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ultimas transacoes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Creditos</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageSlice.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.data}</TableCell>
                  <TableCell>{item.material}</TableCell>
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

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Pagina {page} de {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                className="rounded-md border px-3 py-1"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                Anterior
              </button>
              <button
                className="rounded-md border px-3 py-1"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Proxima
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
