"use client"

import React from "react"
import { siteConfig } from "@/content/site.config"
import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { ScrollReveal } from "@/components/shared/ScrollReveal"

export function Location() {
  return (
    <section id="location" className="py-20 md:py-28 bg-muted border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          {siteConfig.locationSection.badge && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20">
              {siteConfig.locationSection.badge}
            </span>
          )}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
            {siteConfig.locationSection.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {siteConfig.locationSection.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Info Side */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-5 space-y-6 bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-primary/15 text-primary shrink-0 mt-1 border border-primary/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-foreground uppercase">Endereço</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {siteConfig.contact.address.fullAddress}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-secondary/15 text-secondary shrink-0 mt-1 border border-secondary/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-2 w-full">
                  <h3 className="font-heading font-bold text-base text-foreground uppercase">Horário de Treino</h3>
                  <div className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {siteConfig.contact.businessHours.map((schedule, idx) => (
                      <div key={idx} className="flex justify-between gap-4 border-b border-border/40 pb-1 last:border-0">
                        <span>{schedule.days}:</span>
                        <span className="font-semibold text-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-primary/15 text-primary shrink-0 mt-1 border border-primary/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-foreground uppercase">Contato Direto</h3>
                  <p className="text-sm text-muted-foreground">{siteConfig.contact.phoneDisplay}</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.contact.email}</p>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Google Maps Embed iframe */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-7 h-[300px] sm:h-[380px] lg:h-full rounded-2xl overflow-hidden border border-border/70 bg-card shadow-xl">
            {siteConfig.contact.address.googleMapsIframeUrl ? (
              <iframe
                src={siteConfig.contact.address.googleMapsIframeUrl}
                width="100%"
                height="100%"
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de localização de ${siteConfig.brand.name}`}
              />
            ) : (
              <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-muted text-muted-foreground text-sm">
                [Google Maps Iframe Placeholder]
              </div>
            )}
          </ScrollReveal>

        </div>

      </div>
    </section>
  )
}

