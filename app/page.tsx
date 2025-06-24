import type { Metadata } from "next"
import HeroSection from "@/components/home/hero-section"
import ProductsOverview from "@/components/home/products-overview"
import ProductAgora from "@/components/home/product-agora"
import ProductAmbrosia from "@/components/home/product-ambrosia"
import ProductAtlas from "@/components/home/product-atlas"
import ProductEter from "@/components/home/product-eter"
import VsSection from "@/components/home/vs-section"
import CTASection from "@/components/home/cta-section"
import ContactSection from "@/components/home/contact-section"

export const metadata: Metadata = {
  title: "Midaz - La Nueva Era de los Sistemas POS",
  description:
    "Plataforma integral que revoluciona la gestión empresarial con POS, Facturación, ERP y más. Tecnología de vanguardia con cumplimiento fiscal garantizado.",
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsOverview />
      <ProductAgora />
      <ProductAmbrosia />
      <ProductAtlas />
      <ProductEter />
      <VsSection />
      <CTASection />
      <ContactSection />
    </>
  )
}
