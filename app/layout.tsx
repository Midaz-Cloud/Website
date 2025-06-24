import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import WhatsAppWidget from "@/components/widgets/whatsapp-widget"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Midaz - Conformidad Fiscal Simplificada y Eficiencia Operativa",
  description:
    "Soluciones integrales de POS, ERP y facturación homologadas por SENIAT. Agora, Ambrosia, Atlas y Eter - tecnología avanzada para tu negocio.",
  keywords: "POS Venezuela, ERP, facturación electrónica, SENIAT, Nexgo, sistema punto de venta, gestión empresarial",
  openGraph: {
    title: "Midaz - Conformidad Fiscal Simplificada",
    description: "Proveedor de confianza homologado por SENIAT. Soluciones POS, ERP y administrativas para tu negocio.",
    images: ["/images/midaz-logo.png"],
    type: "website",
    locale: "es_VE",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
        </Suspense>
      </body>
    </html>
  )
}
