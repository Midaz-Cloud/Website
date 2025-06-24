"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Store, UtensilsCrossed, Monitor, Zap, CheckCircle, Clock, Star } from "lucide-react"

const products = [
  {
    id: "agora",
    icon: Store,
    name: "AGORA",
    tagline: "POS General",
    quickDesc: "Retail, tiendas, comercios",
    status: "available",
    statusText: "Disponible",
    statusColor: "bg-green-500",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    keyFeatures: ["Setup 2h", "SENIAT incluido", "Nexgo certificado"],
    price: "Precio por anunciar",
    businesses: "🏪 Retail • 💊 Farmacias • 👕 Boutiques",
  },
  {
    id: "ambrosia",
    icon: UtensilsCrossed,
    name: "AMBROSIA",
    tagline: "Restaurantes",
    quickDesc: "F&B, costos, comandas",
    status: "coming",
    statusText: "Próximamente",
    statusColor: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    keyFeatures: ["Costos F&B", "Comandas", "QR menús"],
    price: "Precio por anunciar",
    businesses: "🍽️ Restaurantes • ☕ Cafeterías • 🍕 Fast Food",
  },
  {
    id: "atlas",
    icon: Monitor,
    name: "ATLAS",
    tagline: "Kioscos Autopago",
    quickDesc: "Self-service, filas cero",
    status: "coming",
    statusText: "Próximamente",
    statusColor: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    keyFeatures: ["Kiosco Nexgo", "Sin filas", "Autopago"],
    price: "Hardware incluido",
    businesses: "🍟 Fast Food • 🛒 Supermercados • ☕ Cafés",
  },
  {
    id: "eter",
    icon: Zap,
    name: "ETER",
    tagline: "Especializado",
    quickDesc: "Custom, cualquier sector",
    status: "concept",
    statusText: "Próximamente",
    statusColor: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    keyFeatures: ["100% Custom", "Cualquier sector", "Desarrollo ágil"],
    price: "Cotización personalizada",
    businesses: "🏥 Clínicas • 🔧 Talleres • 🧪 Laboratorios",
  },
]

export default function ProductsOverview() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" id="productos">
      <div className="container-custom relative z-10">
        {/* Compact header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium mb-6 shadow-lg text-sm">
            <Star className="w-4 h-4" />
            <span>Elige Tu Solución</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Cuál es tu <span className="text-gradient">Negocio</span>?
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Selecciona la solución perfecta para tu tipo de negocio
          </p>
        </div>

        {/* Compact 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => {
            const IconComponent = product.icon
            const isAvailable = product.status === "available"

            return (
              <div
                key={product.id}
                className={`bg-white rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer slide-up relative ${
                  !isAvailable ? "opacity-95" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  if (isAvailable) {
                    document.getElementById(product.id)?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {/* Status badge - compact */}
                <div className="absolute -top-2 -right-2">
                  <div
                    className={`${product.statusColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1`}
                  >
                    {isAvailable ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {product.statusText}
                  </div>
                </div>

                {/* Icon and title - compact */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${product.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    <IconComponent className="w-6 h-6 text-gray-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <p
                      className={`text-sm font-semibold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}
                    >
                      {product.tagline}
                    </p>
                  </div>
                </div>

                {/* Quick description */}
                <p className="text-sm text-gray-600 mb-4">{product.quickDesc}</p>

                {/* Business types - visual */}
                <div className="text-xs text-gray-500 mb-4 leading-relaxed">{product.businesses}</div>

                {/* Key features - compact */}
                <div className="space-y-2 mb-4">
                  {product.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`}></div>
                      <span className="text-xs text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="text-sm font-bold text-gray-900 mb-4">{product.price}</div>

                {/* CTA button - compact */}
                <Button
                  className={`w-full text-sm py-2 px-4 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                    isAvailable
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isAvailable}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isAvailable ? "Ver Detalles" : "Notificarme"}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Button>
              </div>
            )
          })}
        </div>

        {/* Quick action CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-3">¿Necesitas AGORA ahora?</h3>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              La única solución disponible hoy. Setup en 2 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-primary px-8 py-3"
                onClick={() => document.getElementById("agora")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Implementar AGORA</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
