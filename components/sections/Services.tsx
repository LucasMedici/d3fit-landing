"use client"

import React from "react"
import { siteConfig } from "@/content/site.config"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Flame, Sparkles } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal"

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-background border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          {siteConfig.services.badge && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20">
              {siteConfig.services.badge}
            </span>
          )}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
            {siteConfig.services.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {siteConfig.services.subtitle}
          </p>
        </ScrollReveal>

        {/* Pricing / Services Grid */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {siteConfig.services.items.map((item) => (
            <StaggerItem key={item.id} className="flex">
              <Card
                className={`flex flex-col justify-between relative transition-all duration-300 rounded-2xl p-0 sm:p-2 w-full ${
                  item.popular
                    ? "border-2 border-primary bg-card/95 shadow-2xl shadow-primary/10 md:-translate-y-2"
                    : "border border-border/60 bg-card/70 hover:border-border hover:bg-card/90 shadow-lg"
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    Mais Escolhido
                  </div>
                )}

                <CardHeader className="space-y-2 sm:space-y-3 pt-5 sm:pt-8 pb-3 sm:pb-6 px-5 sm:px-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-heading text-2xl font-black text-foreground uppercase tracking-tight">
                      {item.title}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-xs sm:text-sm text-muted-foreground min-h-0 sm:min-h-[38px] leading-relaxed">
                    {item.description}
                  </CardDescription>

                  {item.price && (
                    <div className="pt-2 pb-1.5 sm:pt-3 sm:pb-2 flex items-baseline space-x-1 border-b border-border/50">
                      <span className="font-heading text-3xl sm:text-5xl font-black text-foreground tracking-tight">
                        {item.price}
                      </span>
                      {item.period && (
                        <span className="text-sm font-semibold text-muted-foreground uppercase">
                          {item.period}
                        </span>
                      )}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex-1 space-y-3 py-3 sm:py-4 px-5 sm:px-6">
                  <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-foreground/80">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <div className="p-0.5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-3 sm:pt-4 px-5 sm:px-6 pb-4 sm:pb-6">
                  <Button
                    asChild
                    variant={item.popular ? "default" : "outline"}
                    className={`w-full font-bold uppercase tracking-wider text-xs py-5 rounded-xl transition-all ${
                      item.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02]"
                        : "border-border hover:border-foreground/30 hover:bg-muted text-foreground"
                    }`}
                  >
                    <a href={item.ctaLink || "#contact"}>
                      {item.ctaText || "Quero começar"}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Global Features Included Banner */}
        {siteConfig.services.featuresIncluded && siteConfig.services.featuresIncluded.length > 0 && (
          <ScrollReveal direction="up" delay={0.2} className="mt-16 max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl border border-border/60 bg-muted/60">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              Incluso na metodologia D3FIT:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
              {siteConfig.services.featuresIncluded.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-primary font-bold">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  )
}

