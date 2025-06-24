import { Button } from "@/components/ui/button"
import { X, CheckCircle, Users, ArrowRight, Shield, Zap, Star } from "lucide-react"

const competitorPoints = [
  "Facturación digital a través de terceros",
  "Sistemas separados que requieren sincronización",
  "Enfoque generalista o muy específico",
  "Infraestructura que requiere actualizaciones frecuentes",
  "Dependencia de múltiples proveedores",
  "Estructura de precios con componentes variables",
]

const midazPoints = [
  "Homologación SENIAT integrada directamente",
  "Plataforma unificada con módulos conectados",
  "Adaptable a diferentes sectores empresariales",
  "Infraestructura cloud con mantenimiento incluido",
  "Solución completa desarrollada internamente",
  "Estructura de precios clara y predecible",
]

export default function VsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-32 w-3 h-3 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-indigo-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-blue-700 font-medium mb-6 shadow-sm">
            <Zap className="w-4 h-4" />
            <span>Análisis Comparativo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Diferencias que Marcan la Diferencia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Una comparación honesta de las características principales en el mercado actual
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Competitor side */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center shadow-sm">
              <Shield className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Otras Soluciones</h3>
              <p className="text-sm text-gray-500">Características comunes</p>
            </div>
          </div>
          <ul className="space-y-4">
            {competitorPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-4 group/item">
                <div className="w-6 h-6 bg-orange-50 border border-orange-200 rounded-full flex items-center justify-center mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform">
            <div className="w-2.5 h-2.5 bg-orange-400 rounded-full"></div>
                </div>
                <span className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">{point}</span>
              </li>
            ))}
          </ul>
              </div>
            </div>

            {/* Midaz side */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="absolute -top-6 -right-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>Nuestra Propuesta</span>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
              <CheckCircle className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">MIDAZ</h3>
              <p className="text-sm text-blue-600 font-medium">Enfoque integrado</p>
            </div>
          </div>
          <ul className="space-y-4">
            {midazPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-4 group/item">
                <div className="w-6 h-6 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform">
            <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">{point}</span>
              </li>
            ))}
          </ul>
              </div>
            </div>
          </div>

          {/* VS indicator centered and styled */}
          <div className="hidden lg:flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl border-4 border-white">
              VS
            </div>
          </div>
          {/* For mobile, show VS below the grids */}
          <div className="flex lg:hidden justify-center my-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl border-4 border-white">
              VS
            </div>
          </div>
        </div>

        {/* Enhanced Migration section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 border border-gray-200/50 shadow-2xl text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="text-3xl">🔄</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                  Proceso de Migración
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Si actualmente usas otro sistema, nuestro equipo técnico puede ayudarte con el proceso de migración. 
                Evaluamos cada caso individualmente para minimizar interrupciones en tu operación.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 bg-blue-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">Evaluación previa de compatibilidad</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-purple-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">Planificación personalizada del proceso</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-indigo-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-indigo-600 font-bold">3</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">Soporte técnico durante la transición</p>
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span>Consultar Proceso de Migración</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}