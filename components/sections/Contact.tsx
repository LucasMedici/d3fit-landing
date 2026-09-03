"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { siteConfig } from "@/content/site.config"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/shared/ScrollReveal"

const contactSchema = z.object({
  name: z.string().min(2, "Por favor, informe seu nome completo."),
  phone: z.string().min(8, "Informe um telefone válido para contato."),
  email: z.string().email("Informe um e-mail válido."),
  message: z.string().min(5, "Escreva uma breve mensagem ou objetivo de treino."),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = (data: ContactFormValues) => {
    console.log("Formulário de contato enviado:", data)
    setSubmitted(true)

    const cleanNumber = siteConfig.contact.whatsapp.replace(/\D/g, "")
    const text = `Olá! Gostaria de agendar minha aula experimental na D3FIT. Nome: ${data.name} | E-mail: ${data.email} | Telefone: ${data.phone} | Mensagem: ${data.message}`
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank")
    }, 1200)
  }

  const cleanNumber = siteConfig.contact.whatsapp.replace(/\D/g, "")
  const whatsappDirectUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`

  return (
    <section id="contact" className="py-20 md:py-28 bg-background border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Section Header */}
          <ScrollReveal direction="up" delay={0.1} className="text-center space-y-4">
            {siteConfig.contactSection.badge && (
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20">
                {siteConfig.contactSection.badge}
              </span>
            )}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
              {siteConfig.contactSection.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {siteConfig.contactSection.subtitle}
            </p>
          </ScrollReveal>

          {/* Contact Card Form */}
          <ScrollReveal direction="up" delay={0.2} className="p-6 sm:p-10 rounded-2xl border border-border/70 bg-card shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/15 text-primary border border-primary/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading text-2xl font-black uppercase text-foreground">Solicitação Enviada!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {siteConfig.contactSection.formSubmitSuccessMessage}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-border text-foreground hover:bg-muted font-semibold"
                  onClick={() => {
                    setSubmitted(false)
                    form.reset()
                  }}
                >
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground">Seu Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome completo"
                            className="bg-background border-border/60 focus-visible:ring-primary h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-primary" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground">WhatsApp</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(12) 99999-9999"
                              className="bg-background border-border/60 focus-visible:ring-primary h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-primary" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground">E-mail</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seuemail@exemplo.com"
                              className="bg-background border-border/60 focus-visible:ring-primary h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-primary" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-foreground">Objetivo / Dúvida</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="Qual seu foco principal ou horário de preferência?"
                            className="bg-background border-border/60 focus-visible:ring-primary resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-primary" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-sm py-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Agendar Aula Experimental Gratuita
                  </Button>
                </form>
              </Form>
            )}

            {/* Direct WhatsApp Callout */}
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">
                Prefere atendimento imediato?
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-border/80 bg-background hover:bg-muted text-foreground font-semibold px-5 py-5 rounded-xl"
              >
                <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                  Chamar no WhatsApp {siteConfig.contact.phoneDisplay}
                </a>
              </Button>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  )
}

