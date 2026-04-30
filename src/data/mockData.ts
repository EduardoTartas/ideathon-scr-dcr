export type ConversaoItem = {
  categoria: "RSU" | "RCC"
  material: string
  unidade: string
  creditos: number
  valorReais: number
}

export type PontoColeta = {
  id: number
  nome: string
  endereco: string
  tipo: Array<"RSU" | "RCC">
  horario: string
  lat: number
  lng: number
}

export type DescarteItem = {
  id: string
  data: string
  material: string
  quantidade: string
  creditos: number
  ponto: string
  status: "confirmado" | "pendente"
}

export const tabelaConversao: ConversaoItem[] = [
  {
    categoria: "RSU",
    material: "Metal (Aluminio, Cobre)",
    unidade: "100g",
    creditos: 6.0,
    valorReais: 0.06,
  },
  {
    categoria: "RSU",
    material: "Plastico (PET, PEAD)",
    unidade: "100g",
    creditos: 2.0,
    valorReais: 0.02,
  },
  {
    categoria: "RSU",
    material: "Papel e Papelao",
    unidade: "1kg",
    creditos: 8.0,
    valorReais: 0.08,
  },
  {
    categoria: "RSU",
    material: "Vidro",
    unidade: "1kg",
    creditos: 4.0,
    valorReais: 0.04,
  },
  {
    categoria: "RSU",
    material: "Oleo de Cozinha Usado",
    unidade: "1kg",
    creditos: 18.0,
    valorReais: 0.18,
  },
  {
    categoria: "RCC",
    material: "Entulho (concreto, tijolos)",
    unidade: "1m3",
    creditos: 60.0,
    valorReais: 0.6,
  },
  {
    categoria: "RCC",
    material: "Madeira",
    unidade: "1m3",
    creditos: 35.0,
    valorReais: 0.35,
  },
  {
    categoria: "RCC",
    material: "Metal (estrutural)",
    unidade: "1kg",
    creditos: 9.0,
    valorReais: 0.09,
  },
]

export const pontosDeColeta: PontoColeta[] = [
  {
    id: 1,
    nome: "PEV Central",
    endereco: "Av. Brasil, 1200 - Centro Civico",
    tipo: ["RSU", "RCC"],
    horario: "Seg-Sex 7h-18h, Sab 8h-13h",
    lat: -12.97,
    lng: -60.14,
  },
  {
    id: 2,
    nome: "PEV Parque das Arvores",
    endereco: "Rua das Flores, 45 - Parque das Arvores",
    tipo: ["RSU"],
    horario: "Seg-Sab 8h-17h",
    lat: -12.98,
    lng: -60.15,
  },
  {
    id: 3,
    nome: "PEV Distrito Industrial",
    endereco: "Rodovia Estadual, Km 5 - Distrito Industrial",
    tipo: ["RCC"],
    horario: "Seg-Sab 7h-17h",
    lat: -12.96,
    lng: -60.13,
  },
]

export const historicoDescartesCidadao: DescarteItem[] = [
  {
    id: "TXN-2026-0198",
    data: "2025-12-18",
    material: "Plastico (PET, PEAD)",
    quantidade: "2.2 kg",
    creditos: 44.0,
    ponto: "PEV Parque das Arvores",
    status: "confirmado",
  },
  {
    id: "TXN-2026-0241",
    data: "2026-01-22",
    material: "Papel e Papelao",
    quantidade: "4 kg",
    creditos: 32.0,
    ponto: "PEV Parque das Arvores",
    status: "confirmado",
  },
  {
    id: "TXN-2026-0316",
    data: "2026-03-05",
    material: "Metal (Aluminio, Cobre)",
    quantidade: "0.5 kg",
    creditos: 30.0,
    ponto: "PEV Central",
    status: "confirmado",
  },
  {
    id: "TXN-2026-0443",
    data: "2026-04-12",
    material: "Oleo de Cozinha Usado",
    quantidade: "1.2 kg",
    creditos: 21.6,
    ponto: "PEV Central",
    status: "pendente",
  },
]

export const kpisPrefeitura = {
  totalCidadaosCadastrados: 1384,
  totalDescartesMes: 4120,
  totalCreditosEmitidosMes: 51680,
  totalResiduosColetadosKg: 61200,
  economiaMunicipalEstimada: 23600,
}
