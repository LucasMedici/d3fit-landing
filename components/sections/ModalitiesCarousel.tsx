"use client"

import React from "react"
import { siteConfig } from "@/content/site.config"
import { Flame } from "lucide-react"
import Image from "next/image"
import CMSSliderPro from "@/components/ui/CMSSliderPro"
import { ScrollReveal } from "@/components/shared/ScrollReveal"

export function ModalitiesCarousel() {
  const images = ["/hero1.jpg", "/hero2.jpg", "/hero1.jpg", "/hero2.jpg", "/hero1.jpg", "/hero2.jpg"]

  return (
    <section id="modalities" className="py-20 sm:py-28 bg-card/40 border-b border-border/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-4xl text-left">
              {siteConfig.modalities.badge && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/30">
                  <Flame className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  <span>{siteConfig.modalities.badge}</span>
                </div>
              )}
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
                {siteConfig.modalities.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
                {siteConfig.modalities.subtitle}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up" delay={0.2} className="container mx-auto px-12 sm:px-16 relative">
        <CMSSliderPro
          layout={{ items: 3, gap: 24 }}
          playback={{ autoPlay: false, loop: true }}
          navigation={{ draggable: true, keyboard: true }}
          arrows={{
            show: true,
            type: "Split",
            variant: "Outline",
            size: 44,
            radius: 12,
            fill: "#ffffff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            backdrop: "rgba(255, 255, 255, 0.05)",
            inset: -56,
          }}
          dots={{
            type: "Dots",
            alignment: "Bottom Center",
            size: 8,
            activeFill: "#E3402D",
            fill: "rgba(255,255,255,0.3)",
            backdrop: "transparent",
            inset: 24,
          }}
          content={
            <div className="flex gap-6 w-full">
              {siteConfig.modalities.items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-primary/50 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/15 px-3 py-1 rounded-md border border-secondary/30">
                        {item.tag || `0${index + 1}`}
                      </span>
                      <span className="font-heading font-black text-2xl text-muted-foreground/30 group-hover:text-primary/40 transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-foreground uppercase tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/40 relative h-56 sm:h-64 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={images[index % images.length]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        {item.title} — D3FIT
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </ScrollReveal>
    </section>
  )
}


