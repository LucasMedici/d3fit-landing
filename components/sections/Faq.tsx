"use client"

import React from "react"
import { siteConfig } from "@/content/site.config"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal"

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-background border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1} className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          {siteConfig.faq.badge && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20">
              {siteConfig.faq.badge}
            </span>
          )}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
            {siteConfig.faq.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {siteConfig.faq.subtitle}
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3.5">
            <StaggerContainer staggerDelay={0.1} className="space-y-3.5">
              {siteConfig.faq.items.map((item) => (
                <StaggerItem key={item.id}>
                  <AccordionItem
                    value={item.id}
                    className="border border-border/60 rounded-xl px-5 sm:px-6 bg-card/80 shadow-md transition-all data-[state=open]:border-primary/50 data-[state=open]:bg-card"
                  >
                    <AccordionTrigger className="text-left font-heading text-base sm:text-lg font-bold py-5 hover:no-underline text-foreground hover:text-primary transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Accordion>
        </div>

      </div>
    </section>
  )
}

