import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Main footer content */}
        <div className="pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info - Enhanced */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-8">
                  <Image
                    src="/images/logo-2.png"
                    alt="Midaz Logo"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                <div>
                </div>
              </div>

              <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-md">
                La plataforma que revoluciona la gestión empresarial con tecnología de vanguardia y cumplimiento fiscal
                garantizado.
              </p>

              {/* Trust badges */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Homologación SENIAT en proceso</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 font-semibold">Respaldado por Disglobal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-purple-400 font-semibold">Tecnología Cloud-Native</span>
                </div>
              </div>

              {/* Social Media - Enhanced */}
              <div>
                <h4 className="text-white font-semibold mb-4">Síguenos</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Products - Enhanced */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Productos</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#agora"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    <div>
                      <div className="font-medium">AGORA</div>
                      <div className="text-sm text-gray-400">POS General - Disponible</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#ambrosia"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    <div>
                      <div className="font-medium">AMBROSIA</div>
                      <div className="text-sm text-gray-400">Restaurantes - Próximamente</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#atlas"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    <div>
                      <div className="font-medium">ATLAS</div>
                      <div className="text-sm text-gray-400">Kioscos - Próximamente</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#eter"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    <div>
                      <div className="font-medium">ETER</div>
                      <div className="text-sm text-gray-400">Especializadas - Próximamente</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info - Enhanced */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Contacto</h3>
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Oficina Principal</div>
                    <span className="text-gray-300">Caracas, Venezuela</span>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Teléfono</div>
                    <span className="text-gray-300">+58 424-MIDAZ-01</span>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <span className="text-gray-300">info@midaz.com.ve</span>
                  </div>
                </li>
              </ul>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <span>Contáctanos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - Enhanced */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Midaz by Disglobal. Todos los derechos reservados.
              </p>
          
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="/soporte" className="text-gray-400 hover:text-white transition-colors">
                Soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
