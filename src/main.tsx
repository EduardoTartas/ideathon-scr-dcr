import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { AuthProvider } from "@/hooks/useMockAuth"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
      <ToastViewport />
    </ToastProvider>
  </StrictMode>
)
