import React from "react"
import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { ModalitiesCarousel } from "@/components/sections/ModalitiesCarousel"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Testimonials } from "@/components/sections/Testimonials"
import { Faq } from "@/components/sections/Faq"
import { Location } from "@/components/sections/Location"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <ModalitiesCarousel />
        <About />
        <Services />
        <Testimonials />
        <Faq />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
