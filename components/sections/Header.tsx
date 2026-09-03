"use client"

import React from "react"
import { siteConfig } from "@/content/site.config"
import { MobileMenu } from "@/components/shared/MobileMenu"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/90 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        <a href="#hero" className="flex items-center space-x-2 group">
          <span className="font-heading text-4xl lg:text-3xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
            {siteConfig.brand.name}
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium">
          {siteConfig.navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/75 hover:text-foreground hover:text-primary transition-colors font-medium text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <Button
            asChild
            size="sm"
            className="hidden lg:inline-flex relative group overflow-hidden bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-4 sm:px-5 py-2.5 text-xs tracking-wider uppercase rounded-xl border border-white/20 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/45 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
          >
            <a href={siteConfig.hero.primaryCta.href} className="items-center gap-1.5">
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer pointer-events-none" />
              
              {/* Pulse Indicator Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>

              <span>{siteConfig.hero.primaryCta.text}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
