"use client"

import React from "react"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"
import { siteConfig } from "@/content/site.config"

/**
 * WhatsAppButton - Floating button component
 * Reads whatsapp number and default message directly from siteConfig.
 */
export function WhatsAppButton() {
  const cleanNumber = siteConfig.contact.whatsapp.replace(/\D/g, "")
  const encodedMessage = encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp com ${siteConfig.brand.name}`}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 group"
      id="whatsapp-floating-button"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-25 group-hover:animate-ping -z-10" />
      <SiWhatsapp className="w-7 h-7" />
      <span className="sr-only">Falar no WhatsApp</span>
    </a>
  )
}

