import { Button } from "@/components/ui/button"
import { Monitor, ShoppingCart, Clock, TrendingUp, Bell, Zap } from "lucide-react"

const upcomingFeatures = [
  {
    icon: Monitor,
    title: "Kiosco Nexgo Integrado",
    description: "Terminal de autopago intuitivo con pantalla táctil HD",
    highlight: "Próximamente",
  },
  {
    icon: ShoppingCart,
    title: "Experiencia Autónoma",
    description: "Selección, personalización y pago completamente independiente",
    highlight: "En Desarrollo",
  },
  {
    icon: Clock,
    title: "Reducción de Filas",
    description: "Elimina tiempos de espera y optimiza el flujo de clientes",
    highlight: "Planificado",
  },
  {
    icon: TrendingUp,
    title: "Sugerencias Inteligentes",
    description: "Aumenta ticket promedio con recomendaciones automáticas",
    highlight: "Próximamente",
  },
]

const targetSectors = [
  { name: "Restaurantes Fast Food", icon: "🍟", benefit: "Reduce filas 70%" },
  { name: "Supermercados", icon: "🛒", benefit: "Autopago express" },
  { name: "Cafeterías", icon: "☕", benefit: "Pedidos personalizados" },
  { name: "Cadenas de Comida", icon: "🍕", benefit: "Escalabilidad total" },
]

const competitiveAdvantages = [
  "Reducción de costos operativos",
  "Mejora la experiencia del cliente",
  "Aumenta la eficiencia del servicio",
  "Datos en tiempo real de preferencias",
  "Integración completa con cocina/almacén",
]

export default function ProductAtlas() {
  return (
    <section className="py-32 bg-gradient-to-b from-emerald-50 to-teal-50 relative overflow-hidden" id="atlas">
      <div className="container-custom">
        {/* Hero section with coming soon badge */}
        <div className="text-center mb-20 fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center shadow-lg relative">
              <Monitor className="w-10 h-10 text-emerald-600" />
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-5xl font-bold text-gray-900">ATLAS</h3>
              <p className="text-2xl font-semibold text-emerald-600">Autopago / Kioscos Interactivos</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg">
            <Clock className="w-5 h-5" />
            <span>Próximamente - </span>
          </div>

          <h4 className="text-4xl font-bold text-gray-900 mb-6">
            Revoluciona la <span className="text-emerald-600">Experiencia del Cliente</span> con Autopago Inteligente
          </h4>

          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
            La solución de autopago más avanzada para restaurantes de comida rápida y supermercados. ATLAS permite a los
            clientes seleccionar, personalizar y pagar sus órdenes de forma completamente autónoma.
            <strong className="text-emerald-600"> Optimiza operaciones y reduce tiempos de espera.</strong>
          </p>

          {/* Upcoming features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {upcomingFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-emerald-50 rounded-2xl p-6 text-center hover:bg-emerald-100 transition-all duration-300 slide-up border border-emerald-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg font-bold text-emerald-600 mb-2">{feature.highlight}</div>
                  <h5 className="font-bold text-gray-900 mb-2">{feature.title}</h5>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product preview mockup */}
          <div className="slide-up order-2 lg:order-1">
            <div className="relative">
              {/* Kiosk mockup with coming soon overlay */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl transform -rotate-3 hover:-rotate-1 transition-transform duration-500">
                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 h-96 relative">
                  {/* Coming soon overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Monitor className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">En Desarrollo</h4>
                      <p className="text-gray-600 mb-4">Kioscos inteligentes </p>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full">
                        <Bell className="w-4 h-4 mr-2" />
                        Notificarme
                      </Button>
                    </div>
                  </div>

                  {/* Blurred preview content */}
                  <div className="opacity-30">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                      <div className="text-2xl font-bold text-emerald-600">ATLAS Kiosco</div>
                      <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        🛒 Autopago
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900">Combo Premium</span>
                          <span className="text-lg font-bold text-emerald-600">$12.50</span>
                        </div>
                        <div className="text-sm text-gray-600">Personalizar orden →</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating development badges */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                🖥️ Kiosco Nexgo
              </div>
              <div className="absolute -bottom-4 -left-4 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🛒 
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="fade-in order-1 lg:order-2">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-8 mb-8">
              <h5 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
                🏪 Experiencia del Cliente Revolucionaria
              </h5>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span>Selección fácil de productos y personalización</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span>Proceso de pago rápido y seguro</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span>Solo retirar la orden cuando esté lista</span>
                </div>
              </div>
            </div>

            {/* Target sectors */}
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8 border border-emerald-200">
              <h5 className="font-bold text-gray-900 mb-4 text-xl">🎯 Sectores Ideales:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {targetSectors.map((sector, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sector.icon}</span>
                        <span className="font-semibold text-gray-900 text-sm">{sector.name}</span>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-600 font-semibold bg-emerald-100 px-2 py-1 rounded-full inline-block">
                      {sector.benefit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive advantages */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
              <h5 className="font-bold text-green-800 mb-3 text-lg">✅ Ventajas Competitivas:</h5>
              <div className="space-y-2">
                {competitiveAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg">
                <Bell className="w-5 h-5 mr-2" />
                <span>Notificarme de ATLAS</span>
              </Button>
             
            </div>

           
          </div>
        </div>
      </div>
    </section>
  )
}
