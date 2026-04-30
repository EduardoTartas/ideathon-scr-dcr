import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  Award,
  Building2,
  Coins,
  Leaf,
  MapPin,
  Recycle,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { tabelaConversao } from "@/data/mockData"

const passos = [
  {
    titulo: "Leve seus residuos ao PEV",
    texto: "Separe corretamente e entregue em um ponto autorizado.",
    icon: MapPin,
  },
  {
    titulo: "Registro imediato",
    texto: "O operador valida o descarte e gera um codigo de transacao.",
    icon: Recycle,
  },
  {
    titulo: "Creditos liberados",
    texto: "Os creditos entram automaticamente no seu saldo.",
    icon: Coins,
  },
  {
    titulo: "Resgate fiscal",
    texto: "Use os creditos para abater IPTU e taxa de lixo.",
    icon: Award,
  },
]

const metas = [
  { label: "Residuos desviados de descarte irregular", valor: 52800, sufixo: "kg" },
  { label: "Creditos emitidos no mes", valor: 48320, sufixo: "cr" },
  { label: "Cidadaos ativos", valor: 1247, sufixo: "+" },
]

function AnimatedStat({ label, valor, sufixo }: { label: string; valor: number; sufixo: string }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let frame = 0
    const totalFrames = 24
    const step = valor / totalFrames

    const interval = window.setInterval(() => {
      frame += 1
      setCurrent((prev) => Math.min(valor, Math.round(prev + step)))
      if (frame >= totalFrames) {
        window.clearInterval(interval)
        setCurrent(valor)
      }
    }, 40)

    return () => window.clearInterval(interval)
  }, [valor])

  return (
    <div className="space-y-2">
      <p className="text-3xl font-semibold text-primary">
        {current.toLocaleString("pt-BR")} {sufixo}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function LandingPage() {
  const resumoTabela = useMemo(() => tabelaConversao.slice(0, 4), [])

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Leaf className="h-4 w-4" /> Programa municipal de creditos verdes
            </p>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Descarte correto vira desconto real no IPTU.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground">
              O SCR-DCR transforma residuos em creditos fiscais, com rastreabilidade total e
              impacto ambiental direto na cidade. Simples para o cidadao, eficiente para
              a prefeitura.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-primary text-primary-foreground">
                <Link to="/cidadao/login">Sou Cidadao</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/gestao/login">Sou Empresa</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Prefeitura Municipal
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div>Programa ativo desde 2025</div>
            </div>
          </div>

          <Card className="border-none bg-gradient-to-br from-primary/10 via-background to-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">Impacto direto em 90 dias</CardTitle>
              <CardDescription>Resultados estimados a partir dos PEVs ativos.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {metas.map((meta) => (
                <AnimatedStat key={meta.label} {...meta} />
              ))}
              <Button asChild className="w-full">
                <Link to="/como-funciona" className="flex items-center justify-center gap-2">
                  Ver como funciona <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">
          {passos.map((passo) => {
            const Icon = passo.icon
            return (
              <Card key={passo.titulo} className="border-none bg-background">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{passo.titulo}</CardTitle>
                  <CardDescription>{passo.texto}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Conversao rapida
              </p>
              <h2 className="font-heading text-3xl">Creditos por tipo de residuo</h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/tabela-de-creditos" className="flex items-center gap-2">
                Ver tabela completa <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {resumoTabela.map((item) => (
              <Card key={item.material}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{item.material}</CardTitle>
                  <CardDescription>
                    {item.categoria} • {item.unidade}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-primary">{item.creditos}</p>
                    <p className="text-xs text-muted-foreground">creditos por unidade</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">R$ {item.valorReais.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">valor referencial</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
