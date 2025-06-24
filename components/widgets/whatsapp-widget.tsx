"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = "+584121234567" // Venezuelan WhatsApp number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const company = (form.elements.namedItem("company") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLInputElement).value

    const whatsappMessage = encodeURIComponent(
      `Hola, soy ${name} de ${company}. ${message}\n\nEstoy interesado en conocer más sobre las soluciones Midaz.`,
    )
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank")

    setIsOpen(false)
  }

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl w-80 overflow-hidden border border-gray-200">
          <div className="bg-[#25D366] text-white p-4">
            <h3 className="font-bold text-lg">Midaz - Soporte</h3>
            <p className="text-sm opacity-90">Respuesta típica en minutos</p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Su Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent"
                placeholder="Nombre de su empresa"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent"
                placeholder="¿En qué podemos ayudarle?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] text-white py-3 px-4 rounded-lg hover:bg-[#128C7E] transition-colors font-semibold"
            >
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      )}
    </>
  )
}
