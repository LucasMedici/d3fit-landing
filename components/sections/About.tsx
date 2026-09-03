"use client"

import React from "react"
import Image from "next/image"
import { siteConfig } from "@/content/site.config"
import {
  Target,
  TrendingUp,
  Users,
  Dumbbell,
  UserCheck,
  Sparkles,
  CheckCircle2,
  Award,
  ShieldCheck,
} from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal"

export function About() {
  const iconMap: Record<string, React.ReactNode> = {
    Target: <Target className="w-5 h-5 text-primary" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-secondary" />,
    Users: <Users className="w-5 h-5 text-primary" />,
    Dumbbell: <Dumbbell className="w-5 h-5 text-primary" />,
    UserCheck: <UserCheck className="w-5 h-5 text-primary" />,
    Sparkles: <Sparkles className="w-5 h-5 text-secondary" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-primary" />,
  }

  return (
    <section id="about" className="py-20 md:py-28 bg-muted border-b border-border/40 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* About Visual Side */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/60 bg-card p-2">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-background/80 border border-border/40 flex items-center justify-center">
                  {siteConfig.images.aboutImage ? (
                    <Image
                      src={siteConfig.images.aboutImage}
                      alt={`Sobre ${siteConfig.brand.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-card/80 to-background">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center mb-3 text-secondary">
                        <Award className="w-7 h-7" />
                      </div>
                      <p className="font-heading font-black text-xl uppercase tracking-tight text-foreground">
                        Metodologia Comprovada
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                        14 anos de experiência em treinamento de força e correção técnica individual.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Founder Credential Card */}
            {siteConfig.about.founder && (
              <ScrollReveal direction="up" delay={0.25}>
                <div className="p-5 rounded-2xl border border-border/60 bg-card/90 shadow-md space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-heading font-bold text-sm">
                      MT
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground leading-tight">
                        {siteConfig.about.founder.name}
                      </h3>
                      <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
                        {siteConfig.about.founder.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    "{siteConfig.about.founder.bio}"
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* About Content Side */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <ScrollReveal direction="left" delay={0.1} className="space-y-3">
              {siteConfig.about.badge && (
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20">
                  {siteConfig.about.badge}
                </span>
              )}

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.1]">
                {siteConfig.about.title}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {siteConfig.about.subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="space-y-4 text-sm sm:text-base text-foreground/85 leading-relaxed">
              {siteConfig.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>

            {/* The 3 Method Pillars */}
            <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {siteConfig.about.highlights.map((highlight, index) => (
                <StaggerItem
                  key={index}
                  className="p-5 rounded-xl border border-border/70 bg-card/80 space-y-3 hover:border-primary/50 transition-all hover:bg-card group"
                >
                  <div className="p-2.5 w-fit rounded-lg bg-background border border-border/60 group-hover:border-primary/40 transition-colors">
                    {iconMap[highlight.iconName] || <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  )
}

