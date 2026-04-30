import { BrowserRouter, Route, Routes } from "react-router-dom"

import { PageShell } from "@/components/shared/page-shell"
import { CidadaoDashboardPage } from "@/pages/cidadao/dashboard"
import { CidadaoHistoricoPage } from "@/pages/cidadao/historico"
import { CidadaoLoginPage } from "@/pages/cidadao/login"
import { CidadaoResgatarPage } from "@/pages/cidadao/resgatar"
import { GestaoAuditoriaPage } from "@/pages/gestao/auditoria"
import { GestaoDashboardPage } from "@/pages/gestao/dashboard"
import { GestaoLoginPage } from "@/pages/gestao/login"
import { GestaoParametrizacaoPage } from "@/pages/gestao/parametrizacao"
import { OperadorHistoricoPage } from "@/pages/operador/historico"
import { OperadorLoginPage } from "@/pages/operador/login"
import { OperadorRegistrarDescartePage } from "@/pages/operador/registrar-descarte"
import { ComoFuncionaPage } from "@/pages/public/como-funciona"
import { LandingPage } from "@/pages/public/landing"
import { PontosDeColetaPage } from "@/pages/public/pontos-de-coleta"
import { TabelaDeCreditosPage } from "@/pages/public/tabela-de-creditos"

export function App() {
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/como-funciona" element={<ComoFuncionaPage />} />
          <Route path="/pontos-de-coleta" element={<PontosDeColetaPage />} />
          <Route path="/tabela-de-creditos" element={<TabelaDeCreditosPage />} />

          <Route path="/cidadao/login" element={<CidadaoLoginPage />} />
          <Route path="/cidadao/dashboard" element={<CidadaoDashboardPage />} />
          <Route path="/cidadao/historico" element={<CidadaoHistoricoPage />} />
          <Route path="/cidadao/resgatar" element={<CidadaoResgatarPage />} />

          <Route path="/operador/login" element={<OperadorLoginPage />} />
          <Route
            path="/operador/registrar-descarte"
            element={<OperadorRegistrarDescartePage />}
          />
          <Route path="/operador/historico" element={<OperadorHistoricoPage />} />

          <Route path="/gestao/login" element={<GestaoLoginPage />} />
          <Route path="/gestao/dashboard" element={<GestaoDashboardPage />} />
          <Route path="/gestao/auditoria" element={<GestaoAuditoriaPage />} />
          <Route
            path="/gestao/parametrizacao"
            element={<GestaoParametrizacaoPage />}
          />
        </Routes>
      </PageShell>
    </BrowserRouter>
  )
}

export default App
