"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import DemoModal from "@/components/modals/demo-modal"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/#productos" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 -mt-4  ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
              <div className="w-20 h-20 flex items-center justify-center">
                <Image
                  src={isScrolled ? "/images/logo1.png" : "/images/logo-2.png"}
                  alt="Midaz Logo"
                  width={120}
                  height={120}
                  className="object-contain transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xs font-medium transition-colors duration-300  mt-12 ${
                    isScrolled ? "text-gray-600" : "text-white/80"
                  }`}
                >
                  by Disglobal
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 transform ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
                      : `${isScrolled ? "text-gray-700" : "text-white/90"} hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="ml-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setIsDemoModalOpen(true)}
              >
                Demo Gratis
              </Button>
            </nav>

            <Button
              size="icon"
              className="lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-full text-base font-medium mb-2 transition-all ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
                      : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 justify-center"
                onClick={() => {
                  setIsDemoModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
              >
                Demo Gratis
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  )
}
