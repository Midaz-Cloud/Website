import { Button } from "@/components/ui/button"
import { ArrowRight, Store, Shield, Zap, CheckCircle, Clock, Target, TrendingUp, Users, Award, Smartphone } from "lucide-react"

const keyFeatures = [
  {
    icon: Clock,
    title: "Setup Instantáneo",
    description: "De la caja al primer cobro en minutos",
    metric: "2 horas",
    color: "bg-emerald-500"
  },
  {
    icon: Target,
    title: "Hecho en Venezuela",
    description: "Para venezolanos, por venezolanos",
    metric: "100% local",
    color: "bg-blue-500"
  },
  {
    icon: Shield,
    title: "SENIAT Integrado",
    description: "Cumplimiento fiscal automático",
    metric: "Sin extras",
    color: "bg-purple-500"
  },
  {
    icon: Award,
    title: "Nexgo Certificado",
    description: "Única solución oficialmente avalada",
    metric: "Exclusivo",
    color: "bg-orange-500"
  },
]

const realWorldBenefits = [
  {
    icon: TrendingUp,
    title: "Ventas más rápidas",
    description: "Procesa transacciones 3x más rápido que sistemas tradicionales"
  },
  {
    icon: Users,
    title: "Equipo productivo",
    description: "Interfaz tan simple que cualquier empleado la domina al instante"
  },
  {
    icon: Smartphone,
    title: "Control total",
    description: "Monitorea tu negocio desde cualquier lugar, en tiempo real"
  }
]

export default function ProductAgora() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden" id="agora">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Hero section */}
        <div className="text-center mb-20 fade-in">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Store className="w-12 h-12 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                AGORA
              </h3>
              <p className="text-2xl font-bold text-gray-700">El POS que cambia todo</p>
            </div>
          </div>

          <h4 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            Deja de <span className="text-red-500 line-through">Perder Dinero</span><br/>
            <span className="text-blue-600">Empieza a Crecer</span> HOY
          </h4>

          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-16">
            Cada minuto que pierdes con sistemas lentos y complicados es dinero que se va.
            <br/>
            <strong className="text-blue-600">AGORA te devuelve el control de tu negocio.</strong>
          </p>

          {/* Key features with metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-2">{feature.metric}</div>
                  <h5 className="font-bold text-gray-800 mb-3 text-lg">{feature.title}</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center">
          {/* Interactive product preview */}
          <div className="slide-up">
            <div className="relative">
              {/* Main device mockup */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-all duration-700 hover:scale-105">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 h-[500px] relative overflow-hidden">
                  {/* Animated header */}
                  <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-100">
                    <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      AGORA POS
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                      <span className="text-sm font-semibold text-gray-700">Sistema Activo</span>
                    </div>
                  </div>

                  {/* Dynamic dashboard */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-black text-blue-600">$3,247</div>
                      <div className="text-xs text-gray-600 font-medium">Ventas HOY</div>
                      <div className="text-xs text-green-600 font-bold">↗ +24%</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-black text-purple-600">127</div>
                      <div className="text-xs text-gray-600 font-medium">Transacciones</div>
                      <div className="text-xs text-blue-600 font-bold">Avg: $25.56</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-black text-emerald-600">98%</div>
                      <div className="text-xs text-gray-600 font-medium">Uptime</div>
                      <div className="text-xs text-emerald-600 font-bold">24/7</div>
                    </div>
                  </div>

                  {/* Quick action buttons */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-center text-white font-bold hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer shadow-lg">
                      🚀 Venta Rápida
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-blue-300 transition-all cursor-pointer">
                        <div className="text-lg font-bold text-gray-800">📊 Reportes</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-purple-300 transition-all cursor-pointer">
                        <div className="text-lg font-bold text-gray-800">⚙️ Config</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges with different animations */}
             
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl text-sm font-black shadow-2xl">
                🔥 OFICIAL DISGLOBAL
              </div>
              <div className="absolute top-1/3 -left-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-2xl transform -rotate-12 animate-pulse">
                ⚡ SETUP 2H
              </div>
            </div>
          </div>

          {/* Enhanced content with different approach */}
          <div className="fade-in space-y-8">
            {/* Problem-solution approach */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h5 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                ¿Cansado de Sistemas Que NO Funcionan?
              </h5>
              
              <div className="space-y-6">
                {realWorldBenefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h6 className="font-black text-gray-900 text-lg mb-1">{benefit.title}</h6>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          
            {/* Call to action */}
            <div className="flex flex-col gap-6">
              <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-black py-6 px-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-xl relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-3">
                  🚀 QUIERO AGORA AHORA
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
             
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}