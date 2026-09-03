"use client"

import React from "react"
import Image from "next/image"
import { siteConfig } from "@/content/site.config"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, CheckCircle2, Flame, Dumbbell } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal"

export function Hero() {
  const cleanNumber = siteConfig.contact.whatsapp.replace(/\D/g, "")
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-background border-b border-border/30"
    >
      {/* Background Image Container with Overlay Gradients */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {siteConfig.images.heroImage ? (
          <Image
            src={siteConfig.images.heroImage}
            alt={`${siteConfig.brand.name} - ${siteConfig.brand.tagline}`}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-60 lg:opacity-75 scale-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-card via-background to-muted" />
        )}

        {/* Dark Vignette and Gradient overlays for maximum contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto lg:mx-0 text-left space-y-3 sm:space-y-4">
          
          {/* Badge */}
          {siteConfig.hero.badge && (
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/40 backdrop-blur-md mb-1">
                <Flame className="w-3.5 h-3.5 text-secondary animate-pulse" />
                <span>{siteConfig.hero.badge}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Main Title */}
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] uppercase drop-shadow-md whitespace-pre-line">
              {siteConfig.hero.title}
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 max-w-xl font-normal leading-relaxed drop-shadow-sm">
              {siteConfig.hero.subtitle}
            </p>
          </ScrollReveal>

          {/* Highlight Tags */}
          {siteConfig.hero.highlightTags && (
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                {siteConfig.hero.highlightTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-foreground/90 bg-card/80 border border-border/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-sm hover:border-primary/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* CTAs */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-8 py-7 font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-primary/25 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                <a href={siteConfig.hero.primaryCta.href}>
                  {siteConfig.hero.primaryCta.text}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/80 hover:border-foreground/40 bg-card/70 hover:bg-card/90 text-foreground text-base sm:text-lg px-7 py-7 font-semibold rounded-xl backdrop-blur-md transition-all hover:translate-y-[-2px]"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2 text-emerald-400" />
                  {siteConfig.hero.secondaryCta.text}
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Trust Info Bar */}
          <ScrollReveal direction="up" delay={0.6}>
            <div className="pt-8 border-t border-border/40 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">📍</span>
                <span>{siteConfig.contact.address.neighborhood}, {siteConfig.contact.address.city} - {siteConfig.contact.address.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">📞</span>
                <span>{siteConfig.contact.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-secondary" />
                <span>Turmas de no máximo 8 alunos</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}


