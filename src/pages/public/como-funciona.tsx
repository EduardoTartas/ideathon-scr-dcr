import { CheckCircle, ClipboardList, QrCode, Sprout } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const fluxo = [
  {
    titulo: "Separacao e entrega",
    texto: "O cidadao organiza o residuo e leva ao PEV autorizado mais proximo.",
    icon: Sprout,
  },
  {
    titulo: "Pesagem e registro",
    texto: "O operador registra o material, valida e gera o codigo de transacao.",
    icon: ClipboardList,
  },
  {
    titulo: "Credito confirmado",
    texto: "Os creditos entram no saldo do cidadao com rastreabilidade completa.",
    icon: CheckCircle,
  },
  {
    titulo: "Resgate fiscal",
    texto: "O saldo pode ser usado para abater IPTU e taxa de lixo na prefeitura.",
    icon: QrCode,
  },
]

export function ComoFuncionaPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Fluxo do programa
        </p>
        <h1 className="font-heading text-4xl">Como funciona o SCR-DCR</h1>
        <p className="max-w-2xl text-muted-foreground">
          Uma jornada simples para quem descarta corretamente e um sistema transparente
          para a prefeitura acompanhar impacto ambiental e economia gerada.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {fluxo.map((item, index) => {
          const Icon = item.icon
          return (
            <Card key={item.titulo} className="border-none bg-muted/40">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">
                  {index + 1}. {item.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.texto}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator />

      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl">Beneficios diretos</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Economia no IPTU, com creditos acumulados de forma transparente.</li>
            <li>Reducao de descartes irregulares e melhoria na limpeza urbana.</li>
            <li>Relatorios auditaveis para a prefeitura e para o cidadao.</li>
          </ul>
        </div>
        <Card className="border-none bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-lg">Quer participar agora?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Consulte os pontos de coleta mais proximos e descubra quanto vale cada
              residuo para o seu saldo.
            </p>
            <div className="rounded-xl bg-primary-foreground/10 px-4 py-3 text-xs uppercase tracking-[0.3em]">
              Programa ativo em toda a cidade
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
