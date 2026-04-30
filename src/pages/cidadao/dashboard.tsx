import { useEffect, useMemo, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowUpRight, PiggyBank } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCreditos } from "@/hooks/useCreditos"

export function CidadaoDashboardPage() {
  const { resumo } = useCreditos()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const ultimos = useMemo(() => resumo.historico.slice(0, 5), [resumo.historico])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Painel do cidadao
          </p>
          <h1 className="font-heading text-3xl">Seu saldo e impacto</h1>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link to="/cidadao/resgatar">
            Resgatar creditos no IPTU <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Saldo em creditos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <p className="text-3xl font-semibold text-primary">
                {resumo.saldoCreditos.toFixed(1)} cr
              </p>
            )}
            <Badge variant="secondary" className="animate-pulse">
              R$ {resumo.saldoReais.toFixed(2)} equivalente
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Residuos descartados</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <p className="text-3xl font-semibold">{resumo.totalResiduosKg.toFixed(1)} kg</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-sm text-primary-foreground/80">
              Economia gerada para o municipio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <Skeleton className="h-8 w-24 bg-primary-foreground/20" />
            ) : (
              <p className="text-3xl font-semibold">R$ 18.500</p>
            )}
            <p className="text-xs text-primary-foreground/80">
              Cada descarte correto reduz custos de limpeza urbana.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Creditos nos ultimos 6 meses</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resumo.mensal} barSize={32}>
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={32} />
                  <Tooltip cursor={{ fill: "rgba(26, 71, 49, 0.08)" }} />
                  <Bar dataKey="creditos" fill="var(--color-chart-3)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mensagem do programa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Seu compromisso com o descarte correto ja representa a economia de 1,2
              toneladas de residuos no ultimo trimestre.
            </p>
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs">
              <PiggyBank className="h-4 w-4 text-primary" />
              Mantenha o saldo ativo para resgates trimestrais.
            </div>
            <Button asChild variant="outline">
              <Link to="/cidadao/historico">Ver historico completo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ultimos descartes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Creditos</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ultimos.map((item) => (
                <TableRow key={item.id}>
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
        </CardContent>
      </Card>
    </div>
  )
}
