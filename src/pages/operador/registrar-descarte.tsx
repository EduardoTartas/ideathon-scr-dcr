import { useMemo, useState } from "react"

import { BadgeCheck, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { pontosDeColeta } from "@/data/mockData"
import { useCreditos } from "@/hooks/useCreditos"
import { useTabelaConversao } from "@/hooks/useTabelaConversao"

function gerarTransacao() {
  const code = Math.random().toString(36).slice(2, 10).toUpperCase()
  return `TXN-${code}`
}

export function OperadorRegistrarDescartePage() {
  const { tabela } = useTabelaConversao()
  const { salvarDescarte } = useCreditos()
  const [cpf, setCpf] = useState("")
  const [material, setMaterial] = useState(tabela[0]?.material ?? "")
  const [quantidade, setQuantidade] = useState("")
  const [ponto, setPonto] = useState(pontosDeColeta[0]?.nome ?? "")
  const [observacoes, setObservacoes] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [codigoTransacao, setCodigoTransacao] = useState("")

  const itemSelecionado = useMemo(
    () => tabela.find((item) => item.material === material),
    [material, tabela]
  )

  const creditosGerados = useMemo(() => {
    const valor = Number(quantidade.replace(",", "."))
    if (!itemSelecionado || Number.isNaN(valor)) return 0
    return valor * itemSelecionado.creditos
  }, [itemSelecionado, quantidade])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const codigo = gerarTransacao()
    setCodigoTransacao(codigo)

    if (itemSelecionado && quantidade) {
      salvarDescarte({
        id: codigo,
        data: new Date().toISOString().slice(0, 10),
        material: itemSelecionado.material,
        quantidade: `${quantidade} ${itemSelecionado.unidade}`,
        creditos: creditosGerados,
        ponto,
        status: "confirmado",
      })
    }

    setToastOpen(true)
    setDialogOpen(true)
    setCpf("")
    setQuantidade("")
    setObservacoes("")
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Operacao no PEV
        </p>
        <h1 className="font-heading text-3xl">Registrar descarte</h1>
        <p className="text-muted-foreground">
          Preencha os dados da pesagem e gere o comprovante do cidadao.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Formulario de registro</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">CPF do cidadao</label>
                <Input
                  value={cpf}
                  onChange={(event) => setCpf(event.target.value)}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ponto de coleta</label>
                <Select value={ponto} onValueChange={setPonto}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {pontosDeColeta.map((item) => (
                      <SelectItem key={item.id} value={item.nome}>
                        {item.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de residuo</label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {tabela.map((item) => (
                      <SelectItem key={item.material} value={item.material}>
                        {item.material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantidade ({itemSelecionado?.unidade})</label>
                <Input
                  value={quantidade}
                  onChange={(event) => setQuantidade(event.target.value)}
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="0"
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium">Observacoes</label>
                <Textarea
                  value={observacoes}
                  onChange={(event) => setObservacoes(event.target.value)}
                  placeholder="Observacoes adicionais"
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full">
                  Registrar descarte
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-none bg-muted/40">
          <CardHeader>
            <CardTitle className="text-lg">Preview de creditos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{creditosGerados.toFixed(1)} cr</p>
                <p className="text-xs text-muted-foreground">creditos estimados</p>
              </div>
            </div>
            <div className="rounded-xl border bg-background px-4 py-3 text-sm text-muted-foreground">
              O valor exibido e calculado em tempo real com base na tabela vigente.
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comprovante gerado</DialogTitle>
            <DialogDescription>
              Entregue o codigo ao cidadao para acompanhamento.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl border bg-muted/30">
              <QrCode className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm font-semibold">{codigoTransacao}</p>
          </div>
        </DialogContent>
      </Dialog>

      <Toast open={toastOpen} onOpenChange={setToastOpen} duration={3500}>
        <ToastTitle>Descarte registrado</ToastTitle>
        <ToastDescription>
          Codigo gerado e creditos vinculados ao CPF informado.
        </ToastDescription>
      </Toast>
    </div>
  )
}
