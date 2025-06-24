import { Button } from "@/components/ui/button"
import { Zap, Settings, Puzzle, Wrench, Clock, Bell } from "lucide-react"

const upcomingFeatures = [
  {
    icon: Settings,
    title: "Personalización Extrema",
    description: "Adaptación total a procesos únicos de cada industria",
    highlight: "Primeros Pasos",
  },
  {
    icon: Puzzle,
    title: "Módulos Sectoriales",
    description: "Componentes específicos para cada tipo de negocio",
    highlight: "En Concepto",
  },
  {
    icon: Wrench,
    title: "Desarrollo Ágil",
    description: "Implementación rápida de funcionalidades a medida",
    highlight: "Planificado",
  },
  {
    icon: Zap,
    title: "Hardware Especializado",
    description: "Integración con equipos específicos de cada sector",
    highlight: "Futuro",
  },
]

const targetSectors = [
  { name: "Clínicas y Consultorios", icon: "🏥", status: "Planificado" },
  { name: "Talleres Automotrices", icon: "🔧", status: "En Estudio" },
  { name: "Laboratorios", icon: "🧪", status: "Conceptual" },
  { name: "Industrias Especializadas", icon: "🏭", status: "Futuro" },
]

export default function ProductEter() {
  return (
    <section className="py-32 bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden" id="eter">
      <div className="container-custom">
        {/* Hero section with coming soon badge */}
        <div className="text-center mb-20 fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center shadow-lg relative">
              <Zap className="w-10 h-10 text-purple-600" />
              <div className="absolute -top-2 -right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-5xl font-bold text-gray-900">ETER</h3>
              <p className="text-2xl font-semibold text-purple-600">Soluciones Especializadas</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg">
            <Clock className="w-5 h-5" />
            <span>En Conceptualización - </span>
          </div>

          <h4 className="text-4xl font-bold text-gray-900 mb-6">
            La Plataforma Más <span className="text-purple-600">Flexible y Adaptable</span>
          </h4>

          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
            ETER será nuestra solución más ambiciosa: una plataforma completamente personalizable que se adapta a
            cualquier industria especializada.
            <strong className="text-purple-600"> Flexibilidad sin límites para necesidades únicas.</strong>
          </p>

          {/* Upcoming features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {upcomingFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-purple-50 rounded-2xl p-6 text-center hover:bg-purple-100 transition-all duration-300 slide-up border border-purple-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg font-bold text-purple-600 mb-2">{feature.highlight}</div>
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
              {/* Custom interface mockup with coming soon overlay */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl transform -rotate-3 hover:-rotate-1 transition-transform duration-500">
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 h-96 relative">
                  {/* Coming soon overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">En Conceptualización</h4>
                      <p className="text-gray-600 mb-4">Visión futura - </p>
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full">
                        <Bell className="w-4 h-4 mr-2" />
                        Expresar Interés
                      </Button>
                    </div>
                  </div>

                  {/* Blurred preview content */}
                  <div className="opacity-20">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                      <div className="text-2xl font-bold text-purple-600">ETER</div>
                      <div className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Modo Custom</div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Módulo Personalizado</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating development badges */}
              <div className="absolute -top-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                💭 Concepto
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                ⚡ 
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="fade-in order-1 lg:order-2">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-8 mb-8">
              <h5 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">🔮 Visión de Futuro</h5>
              <p className="text-gray-700 mb-6">
                ETER representa nuestra visión más ambiciosa: crear una plataforma que pueda adaptarse completamente a
                cualquier industria especializada, sin limitaciones.
              </p>
            </div>

            {/* Target sectors */}
            <div className="bg-purple-50 rounded-2xl p-6 mb-8 border border-purple-200">
              <h5 className="font-bold text-gray-900 mb-4 text-xl">🏪 Sectores en Consideración:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {targetSectors.map((sector, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sector.icon}</span>
                        <span className="font-semibold text-gray-900 text-sm">{sector.name}</span>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {sector.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

       

            <div className="gap-4 flex flex-col lg:flex-row items-center justify-center mt-8">
              
              <Button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-lg">
                Compartir Mi Necesidad
              </Button>
            </div>

            <p className="text-center text-gray-600 mt-4 text-sm">
              ⚡ <strong>Colaboración:</strong> Tu input ayudará a definir las características de ETER
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
