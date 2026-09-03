"use client"

import React from "react"
import { siteConfig } from "@/content/site.config"
import { MapPin, Phone, Mail } from "lucide-react"

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )
}

export function Footer() {
  const socialIconMap: Record<string, React.ReactNode> = {
    Instagram: <InstagramIcon />,
    Facebook: <FacebookIcon />,
    Youtube: <YoutubeIcon />,
  }

  return (
    <footer className="border-t border-border/50 bg-[#161514] text-foreground pt-16 pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <a href="#hero" className="inline-block group">
              <span className="font-heading text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                {siteConfig.brand.name}
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              </span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {siteConfig.brand.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-2.5 pt-2">
              {siteConfig.contact.socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="p-2.5 rounded-lg bg-card border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {socialIconMap[social.iconName] || social.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-widest text-secondary">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              {siteConfig.navigation.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-widest text-secondary">
              Contato
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                <span>{siteConfig.contact.address.fullAddress}</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-widest text-secondary">
              Horários de Treino
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {siteConfig.contact.businessHours.map((schedule, idx) => (
                <li key={idx} className="border-b border-border/40 pb-1.5 last:border-0">
                  <span className="font-semibold text-foreground">{schedule.days}:</span>{" "}
                  <span>{schedule.hours}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
          <p>{siteConfig.footer.copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

