import { Button } from "@/components/ui/button"
import { UtensilsCrossed, Clock, DollarSign, QrCode, TrendingUp, Bell } from "lucide-react"

const upcomingFeatures = [
  {
    icon: DollarSign,
    title: "Control de Costos en Vivo",
    description: "Monitoreo en tiempo real de márgenes y rentabilidad por plato",
    highlight: "En Desarrollo",
  },
  {
    icon: Clock,
    title: "Comandas Optimizadas",
    description: "Sistema de cocina que reduce tiempos de preparación",
    highlight: "Próximamente",
  },
  {
    icon: QrCode,
    title: "Menú Digital QR",
    description: "Menús interactivos sin comisiones de terceros",
    highlight: "Próximamente",
  },
  {
    icon: TrendingUp,
    title: "Integración Delivery",
    description: "Conexión directa con plataformas de entrega",
    highlight: "Próximamente",
  },
]

const plannedResults = [
  "Control de costos F&B en tiempo real",
  "Gestión inteligente de comandas",
  "Menús digitales sin comisiones",
  "Integración completa con delivery",
  "Reportes de rentabilidad detallados",
  "Optimización de inventario gastronómico",
]

export default function ProductAmbrosia() {
  return (
    <section className="py-32 bg-gradient-to-b from-orange-50 to-red-50 relative overflow-hidden" id="ambrosia">
      <div className="container-custom">
        {/* Hero section with coming soon badge */}
        <div className="text-center mb-20 fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center shadow-lg relative">
              <UtensilsCrossed className="w-10 h-10 text-orange-600" />
              
            </div>
            <div className="text-left">
              <h3 className="text-5xl font-bold text-gray-900">AMBROSIA</h3>
              <p className="text-2xl font-semibold text-orange-600">Restaurantes / F&B</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg">
            <Clock className="w-5 h-5" />
            <span>Próximamente - </span>
          </div>

          <h4 className="text-4xl font-bold text-gray-900 mb-6">
            La Próxima Revolución en <span className="text-orange-600">Gestión Gastronómica</span>
          </h4>

          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
            Estamos desarrollando la solución más completa para restaurantes que combinará POS, control de costos F&B y
            gestión de cocina.
            <strong className="text-orange-600"> Diseñada específicamente para el sector gastronómico.</strong>
          </p>

          {/* Upcoming features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {upcomingFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-orange-50 rounded-2xl p-6 text-center hover:bg-orange-100 transition-all duration-300 slide-up border border-orange-200 relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg font-bold text-orange-600 mb-2">{feature.highlight}</div>
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
              {/* Kitchen display mockup with coming soon overlay */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl transform -rotate-3 hover:-rotate-1 transition-transform duration-500 relative">
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 h-96 relative">
                  {/* Coming soon overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">En Desarrollo</h4>
                      <p className="text-gray-600 mb-4">Próximo lanzamiento </p>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">
                        <Bell className="w-4 h-4 mr-2" />
                        Notificarme
                      </Button>
                    </div>
                  </div>

                  {/* Blurred preview content */}
                  <div className="opacity-30">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                      <div className="text-2xl font-bold text-orange-600">AMBROSIA</div>
                      <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        🔥 Cocina Activa
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white rounded-xl p-4 border-l-4 border-orange-500 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-900">Mesa 5 - VIP</span>
                          <span className="text-sm text-orange-600 font-bold bg-orange-100 px-2 py-1 rounded">
                            6 min
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">2x Pasta Carbonara • 1x Ensalada César</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating development badges */}
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                🚧 En Desarrollo
              </div>
              
            </div>
          </div>

          {/* Content */}
          <div className="fade-in order-1 lg:order-2">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-3xl p-8 mb-8">
              <h5 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                🚀 Lo Que Estamos Construyendo
              </h5>
              <p className="text-gray-700 mb-6">
                AMBROSIA será la primera solución venezolana diseñada específicamente para el sector gastronómico,
                integrando todas las herramientas que un restaurante necesita.
              </p>
            </div>

            {/* Planned features */}
            <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-200">
              <h5 className="font-bold text-gray-900 mb-4 text-xl">🎯 Características Planificadas:</h5>
              <div className="space-y-3">
                {plannedResults.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Development timeline */}


            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg">
                <Bell className="w-5 h-5 mr-2" />
                <span>Notificarme del Lanzamiento</span>
              </Button>
            
            </div>

            <p className="text-center text-gray-600 mt-4 text-sm">
              ⚡ <strong>Acceso anticipado:</strong> Regístrate para ser de los primeros en probar AMBROSIA
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
