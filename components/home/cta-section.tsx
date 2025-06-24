import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe, Phone, Mail } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Cumplimiento Garantizado",
    description: "Homologación SENIAT en proceso",
  },
  {
    icon: Zap,
    title: "Implementación Express",
    description: "Operativo en menos de 24 horas",
  },
  {
    icon: Globe,
    title: "Soporte Especializado",
    description: "Equipo local en Venezuela",
  },
]

export default function CTASection() {
  return (
    <section className="py-32 hero-gradient relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl float"></div>
      <div
        className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-xl float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16 fade-in">
          <h2 className="heading-xl text-white mb-6">¿Listo para la Transformación Digital?</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Únete a cientos de empresas venezolanas que ya han revolucionado su gestión empresarial con Midaz
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={index}
                className="glass-card text-center slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA buttons */}
        <div className="text-center mb-12 slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="btn-primary text-xl px-12 py-6">
              <span>Solicitar Demo Gratuito</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
            <Button className="btn-secondary text-xl px-12 py-6">
              <span>Hablar con Especialista</span>
            </Button>
          </div>
          <p className="text-white/60 mt-6 text-sm">Sin compromisos • Configuración gratuita • Soporte incluido</p>
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/70">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+58 424-123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>info@midaz.com.ve</span>
          </div>
        </div>
      </div>
    </section>
  )
}
