import { Link } from "react-router-dom"
import { Mail, MapPin, Phone } from "lucide-react"

import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-3">
            <h3 className="font-heading text-lg">SCR-DCR</h3>
            <p className="text-sm text-muted-foreground">
              Um programa municipal que recompensa o descarte correto, reduzindo
              impactos ambientais e criando economia local.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Navegacao</p>
            <Link className="block text-muted-foreground hover:text-foreground" to="/como-funciona">
              Como funciona
            </Link>
            <Link className="block text-muted-foreground hover:text-foreground" to="/pontos-de-coleta">
              Pontos de coleta
            </Link>
            <Link className="block text-muted-foreground hover:text-foreground" to="/tabela-de-creditos">
              Tabela de creditos
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Contato municipal</p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> Prefeitura Municipal
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" /> (00) 0000-0000
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" /> scr-dcr@municipio.gov
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-xs text-muted-foreground">
          Prefeitura Municipal • Programa SCR-DCR • 2026
        </p>
      </div>
    </footer>
  )
}
