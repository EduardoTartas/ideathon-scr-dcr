import { Link, NavLink } from "react-router-dom"
import { ChevronDown, Leaf, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMockAuth } from "@/hooks/useMockAuth"

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/pontos-de-coleta", label: "Pontos de coleta" },
  { to: "/tabela-de-creditos", label: "Tabela de creditos" },
]

export function SiteHeader() {
  const { role, logout } = useMockAuth()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-heading text-base uppercase tracking-[0.18em]">SCR-DCR</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "transition hover:text-foreground"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link to="/cidadao/login">Sou Cidadao</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground">
            <Link to="/operador/login">Sou Operador</Link>
          </Button>

          {role && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  Perfil {role} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
