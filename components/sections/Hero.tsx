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
      className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-background border-b border-border/30"
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
            className="object-cover object-center opacity-50 sm:opacity-65 lg:opacity-75"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-card via-background to-muted" />
        )}

        {/* Dark Vignette and Gradient overlays for maximum contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Hero Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28 relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-4xl space-y-4 sm:space-y-5">

          {/* Badge */}
          {siteConfig.hero.badge && (
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/40 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-secondary animate-pulse" />
                <span>{siteConfig.hero.badge}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Main Title */}
          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="font-heading text-[clamp(2.5rem,10vw,5rem)] font-black tracking-tight text-foreground leading-[1.0] uppercase drop-shadow-md whitespace-pre-line">
              {siteConfig.hero.title}
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 max-w-lg font-normal leading-relaxed drop-shadow-sm">
              {siteConfig.hero.subtitle}
            </p>
          </ScrollReveal>

          {/* Highlight Tags */}
          {siteConfig.hero.highlightTags && (
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-2 pt-1">
                {siteConfig.hero.highlightTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-semibold text-foreground/90 bg-card/80 border border-border/70 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-primary shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* CTAs */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <a href={siteConfig.hero.primaryCta.href} className="flex items-center justify-center gap-2">
                  <span className="text-sm leading-tight hidden sm:inline">{siteConfig.hero.primaryCta.text}</span>
                  <span className="text-sm leading-tight sm:hidden">Aula experimental gratuita</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/80 hover:border-foreground/40 bg-card/70 hover:bg-card/90 text-foreground font-semibold rounded-xl backdrop-blur-md transition-all hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm">{siteConfig.hero.secondaryCta.text}</span>
                </a>
              </Button>
            </div>
          </ScrollReveal>

          {/* Trust Info Bar */}
          <ScrollReveal direction="up" delay={0.6}>
            <div className="pt-6 border-t border-border/40">
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">📍</span>
                  <span>{siteConfig.contact.address.neighborhood}, {siteConfig.contact.address.city} — {siteConfig.contact.address.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">📞</span>
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-secondary shrink-0" />
                  <span>Turmas de no máximo 8 alunos</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
