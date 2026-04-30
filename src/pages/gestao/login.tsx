import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMockAuth, type UserRole } from "@/hooks/useMockAuth"

export function GestaoLoginPage() {
  const navigate = useNavigate()
  const { login } = useMockAuth()
  const [role, setRole] = useState<UserRole>("gestor")

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    login(role)
    navigate("/gestao/dashboard")
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-6 py-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Acesso da gestao</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">CPF</label>
              <Input placeholder="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de acesso</label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cidadao">Cidadao</SelectItem>
                  <SelectItem value="operador">Operador</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <p className="text-xs text-muted-foreground">
              Login mock: qualquer CPF e senha funcionam.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
