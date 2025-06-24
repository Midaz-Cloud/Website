"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Building, CheckCircle } from "lucide-react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    cargo: "",
    telefono: "",
    email: "",
    tipoNegocio: "",
    tamanoEmpresa: "",
    productoInteres: "",
    fechaPreferida: "",
    horaPreferida: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          nombre: "",
          apellido: "",
          empresa: "",
          cargo: "",
          telefono: "",
          email: "",
          tipoNegocio: "",
          tamanoEmpresa: "",
          productoInteres: "",
          fechaPreferida: "",
          horaPreferida: "",
          mensaje: "",
        })
        onClose()
      }, 3000)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900 mb-2">
            Solicitar Demo Gratuito
          </DialogTitle>
          <p className="text-center text-gray-600">
            Agenda una reunión personalizada y descubre cómo Midaz puede transformar tu negocio
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">¡Demo Agendado!</h3>
            <p className="text-gray-600 mb-4">
              Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo en las próximas 2 horas para
              confirmar la reunión.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
              <strong>Próximos pasos:</strong>
              <ul className="mt-2 space-y-1 text-left">
                <li>• Confirmación por WhatsApp/teléfono</li>
                <li>• Envío de enlace de reunión</li>
                <li>• Demo personalizado de 30 minutos</li>
              </ul>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Información Personal
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange("apellido", e.target.value)}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    placeholder="+58 424-123-4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="tu@empresa.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Información Empresarial */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Información Empresarial
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="empresa">Empresa *</Label>
                  <Input
                    id="empresa"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange("empresa", e.target.value)}
                    placeholder="Nombre de tu empresa"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => handleInputChange("cargo", e.target.value)}
                    placeholder="Tu cargo en la empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoNegocio">Tipo de Negocio *</Label>
                  <Select
                    value={formData.tipoNegocio}
                    onValueChange={(value) => handleInputChange("tipoNegocio", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail/Comercio</SelectItem>
                      <SelectItem value="restaurante">Restaurante</SelectItem>
                      <SelectItem value="supermercado">Supermercado</SelectItem>
                      <SelectItem value="farmacia">Farmacia</SelectItem>
                      <SelectItem value="cafeteria">Cafetería</SelectItem>
                      <SelectItem value="fast-food">Comida Rápida</SelectItem>
                      <SelectItem value="clinica">Clínica/Consultorio</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tamanoEmpresa">Tamaño de Empresa</Label>
                  <Select
                    value={formData.tamanoEmpresa}
                    onValueChange={(value) => handleInputChange("tamanoEmpresa", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Número de empleados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 empleados</SelectItem>
                      <SelectItem value="6-20">6-20 empleados</SelectItem>
                      <SelectItem value="21-50">21-50 empleados</SelectItem>
                      <SelectItem value="51-100">51-100 empleados</SelectItem>
                      <SelectItem value="100+">Más de 100 empleados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Preferencias del Demo */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Preferencias para el Demo
              </h4>

              <div>
                <Label htmlFor="productoInteres">Producto de Interés</Label>
                <Select
                  value={formData.productoInteres}
                  onValueChange={(value) => handleInputChange("productoInteres", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="¿Qué producto te interesa más?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agora">AGORA - POS General (Disponible)</SelectItem>
                    <SelectItem value="ambrosia">AMBROSIA - Restaurantes (Q2 2025)</SelectItem>
                    <SelectItem value="atlas">ATLAS - Kioscos Autopago (Q3 2025)</SelectItem>
                    <SelectItem value="eter">ETER - Soluciones Especializadas (Q4 2025)</SelectItem>
                    <SelectItem value="todos">Toda la suite Midaz</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fechaPreferida">Fecha Preferida</Label>
                  <Input
                    id="fechaPreferida"
                    type="date"
                    value={formData.fechaPreferida}
                    onChange={(e) => handleInputChange("fechaPreferida", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="horaPreferida">Hora Preferida</Label>
                  <Select
                    value={formData.horaPreferida}
                    onValueChange={(value) => handleInputChange("horaPreferida", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona horario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Mensaje Adicional */}
            <div>
              <Label htmlFor="mensaje">Mensaje Adicional</Label>
              <Textarea
                id="mensaje"
                value={formData.mensaje}
                onChange={(e) => handleInputChange("mensaje", e.target.value)}
                placeholder="Cuéntanos sobre tus necesidades específicas o preguntas..."
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={
                isSubmitting ||
                !formData.nombre ||
                !formData.telefono ||
                !formData.email ||
                !formData.empresa ||
                !formData.tipoNegocio
              }
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Procesando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Agendar Demo Gratuito
                </div>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Al enviar este formulario, aceptas que nuestro equipo se ponga en contacto contigo para agendar el demo.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
