"use client"

import React from "react"
import { siteConfig } from "@/content/site.config"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, Quote } from "lucide-react"
import { ScrollReveal } from "@/components/shared/ScrollReveal"

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted border-b border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <ScrollReveal direction="up" delay={0.1} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          {siteConfig.testimonials.badge && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20">
              {siteConfig.testimonials.badge}
            </span>
          )}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
            {siteConfig.testimonials.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {siteConfig.testimonials.subtitle}
          </p>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal direction="up" delay={0.2} className="max-w-5xl mx-auto px-4 sm:px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {siteConfig.testimonials.items.map((item) => (
                <CarouselItem key={item.id} className="pl-4 sm:pl-6 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border border-border/70 bg-card shadow-lg flex flex-col justify-between p-6 rounded-2xl">
                    <CardContent className="p-0 space-y-5 flex flex-col justify-between h-full">
                      
                      {/* Quote text & rating */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Quote className="w-8 h-8 text-primary/40" />
                          {item.rating && (
                            <div className="flex items-center space-x-1 text-secondary">
                              {Array.from({ length: item.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-secondary" />
                              ))}
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-foreground/90 leading-relaxed font-normal">
                          "{item.content}"
                        </p>
                      </div>

                      {/* Author info */}
                      <div className="pt-4 border-t border-border/50 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-heading font-bold text-xs uppercase shrink-0">
                          {item.name.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-heading font-bold text-sm text-foreground leading-tight">{item.name}</p>
                          <p className="text-[11px] font-medium text-muted-foreground">{item.role}</p>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="relative static translate-y-0 bg-card border-border hover:bg-muted text-foreground" />
              <CarouselNext className="relative static translate-y-0 bg-card border-border hover:bg-muted text-foreground" />
            </div>
          </Carousel>
        </ScrollReveal>

      </div>
    </section>
  )
}

