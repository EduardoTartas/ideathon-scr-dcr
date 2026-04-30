import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast"

export function CidadaoResgatarPage() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setOpen(true)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Resgate fiscal
        </p>
        <h1 className="font-heading text-3xl">Solicitar abatimento de IPTU</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para gerar o protocolo de abatimento.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Formulario de resgate</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">CPF</label>
              <Input placeholder="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Matricula do imovel</label>
              <Input placeholder="IPTU-12345" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor desejado (R$)</label>
              <Input type="number" min="0" step="0.01" placeholder="250,00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ano fiscal</label>
              <Input placeholder="2026" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Solicitar abatimento
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toast open={open} onOpenChange={setOpen} duration={4000}>
        <ToastTitle>Solicitacao enviada</ToastTitle>
        <ToastDescription>
          Seu protocolo foi gerado. A prefeitura enviara a confirmacao por email.
        </ToastDescription>
      </Toast>
    </div>
  )
}
