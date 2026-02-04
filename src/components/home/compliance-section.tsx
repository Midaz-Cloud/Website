import { Shield, CheckCircle, FileText, Globe } from "lucide-react"

const complianceFeatures = [
  {
    icon: <Shield className="h-8 w-8 text-midaz-gold" />,
    title: "Homologación SENIAT",
    description: "En proceso bajo Providencia Administrativa SNAT/2024/000121",
    status: "En proceso",
  },
  {
    icon: <FileText className="h-8 w-8 text-midaz-gold" />,
    title: "Transmisión Automática",
    description: "Envío automático de información fiscal y acceso para auditorías",
    status: "Desarrollo",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-midaz-gold" />,
    title: "Cumplimiento Legal",
    description: "Eliminación de riesgos legales y normativas fiscales",
    status: "Garantizado",
  },
  {
    icon: <Globe className="h-8 w-8 text-midaz-gold" />,
    title: "Datos Seguros",
    description: "Seguridad de datos fiscales en la nube con respaldo",
    status: "Activo",
  },
]

export default function ComplianceSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-midaz-gold/10 rounded-full px-6 py-3 mb-6">
            <Shield className="w-6 h-6 text-midaz-gold mr-2" />
            <span className="text-midaz-blue font-semibold">Conformidad Fiscal</span>
          </div>
          <h2 className="heading-lg mb-4">Con Midaz, su negocio cumple con el SENIAT sin complicaciones</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tranquilidad fiscal garantizada con nuestro estado de homologación y características de cumplimiento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {complianceFeatures.map((feature, index) => (
            <div key={index} className="midaz-card p-6 text-center hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-midaz-gold/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-midaz-navy mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  feature.status === "Garantizado"
                    ? "bg-green-100 text-green-800"
                    : feature.status === "Activo"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {feature.status}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="midaz-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-midaz-navy mb-4">Estado de Homologación SENIAT</h3>
            <p className="text-gray-600 mb-6">
              Midaz se encuentra en proceso de homologación SENIAT bajo la Providencia Administrativa SNAT/2024/000121,
              garantizando el cumplimiento de todas las normativas fiscales venezolanas.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-gray-600">En proceso de homologación</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Cumplimiento garantizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
