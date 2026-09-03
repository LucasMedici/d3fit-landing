"use client"

import React, { useState } from "react"
import { Menu, MessageCircle } from "lucide-react"
import { siteConfig } from "@/content/site.config"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  const cleanNumber = siteConfig.contact.whatsapp.replace(/\D/g, "")
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden border-border/70 bg-card hover:bg-muted text-foreground"
          aria-label="Abrir menu de navegação"
          id="mobile-menu-trigger"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col justify-between p-6 bg-card border-l border-border/70">
        <div className="space-y-6">
          <SheetHeader className="text-left border-b border-border/40 pb-4">
            <SheetTitle className="font-heading text-2xl font-black tracking-tight text-foreground flex items-center gap-1.5">
              {siteConfig.brand.name}
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            </SheetTitle>
            <p className="text-xs uppercase tracking-wider text-secondary font-semibold">{siteConfig.brand.tagline}</p>
          </SheetHeader>

          <nav className="flex flex-col space-y-4">
            {siteConfig.navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-heading text-lg font-bold text-foreground/80 hover:text-primary uppercase tracking-wide hover:translate-x-1.5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-border/40">
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">{siteConfig.contact.phoneDisplay}</p>
            <p>{siteConfig.contact.address.fullAddress}</p>
          </div>

          <div className="flex flex-col space-y-2.5">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-xs py-5">
              <a href={siteConfig.hero.primaryCta.href} onClick={() => setOpen(false)}>
                {siteConfig.hero.primaryCta.text}
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full border-border bg-background hover:bg-muted text-foreground font-semibold text-xs py-5">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

