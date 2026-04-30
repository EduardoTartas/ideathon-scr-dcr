import { MapPinned, Plus, Minus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { pontosDeColeta } from "@/data/mockData"
import vilhenaMap from "@/assets/vilhena-map.png"
import { useMemo, useState } from "react"

export function PontosDeColetaPage() {
  const mapaPins: Record<number, { x: string; y: string }> = {
    1: { x: "46%", y: "53%" },
    2: { x: "30%", y: "46%" },
    3: { x: "72%", y: "48%" },
  }

  const [zoom, setZoom] = useState(1)
  const zoomPercent = useMemo(() => Math.round(zoom * 100), [zoom])

  function zoomIn() {
    setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))
  }
  function zoomOut() {
    setZoom((z) => Math.max(0.6, +(z - 0.15).toFixed(2)))
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Pontos de entrega voluntaria
        </p>
        <h1 className="font-heading text-4xl">Pontos de coleta ativos</h1>
        <p className="max-w-2xl text-muted-foreground">
          Consulte horarios e tipos de residuos aceitos em cada PEV. Use esta pagina
          para planejar sua entrega.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          {pontosDeColeta.map((ponto) => (
            <Card key={ponto.id} className="border-none bg-muted/40">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{ponto.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">{ponto.endereco}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ponto.tipo.map((tipo) => (
                    <Badge key={tipo} variant="secondary">
                      {tipo}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPinned className="h-4 w-4" /> {ponto.horario}
                </span>
                <span>Lat {ponto.lat.toFixed(2)} | Lng {ponto.lng.toFixed(2)}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none bg-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Mapa de Vilhena, RO</CardTitle>
            <p className="text-sm text-muted-foreground">
              Visualizacao ilustrada com os pontos ativos.
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 overflow-hidden rounded-2xl bg-background">
              <div className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-lg bg-white/90 p-2 shadow">
                <button onClick={zoomOut} className="flex h-8 w-8 items-center justify-center rounded border bg-white">
                  <Minus className="h-4 w-4" />
                </button>
                <div className="text-xs font-medium">{zoomPercent}%</div>
                <button onClick={zoomIn} className="flex h-8 w-8 items-center justify-center rounded border bg-white">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div
                className="absolute inset-0 transform-gpu origin-center"
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={vilhenaMap}
                  alt="Mapa de Vilhena, RO"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute left-4 top-4 rounded-full border border-emerald-200 bg-white/85 px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm">
                Vilhena • RO
              </div>

              {pontosDeColeta.map((ponto) => {
                const pos = mapaPins[ponto.id]
                if (!pos) return null
                return (
                  <div
                    key={ponto.id}
                    className="absolute"
                    style={{ left: pos.x, top: pos.y, transform: `translate(-50%,-100%) scale(${1 / zoom})` }}
                  >
                    <div className="relative">
                      <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-primary/30" />
                      <span className="absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <div className="mt-3 rounded-lg border bg-white/90 px-2 py-1 text-[10px] font-semibold text-emerald-900 shadow-sm">
                        {ponto.nome}
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="absolute bottom-4 right-4 rounded-lg border bg-white/80 px-3 py-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  PEVs ativos
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-6 rounded-full bg-amber-200" />
                  Eixos viarios
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
