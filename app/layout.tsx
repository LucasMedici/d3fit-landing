import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Barlow } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/content/site.config"
import { WhatsAppButton } from "@/components/shared/WhatsAppButton"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const fontHeading = Barlow({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800", "900"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  icons: {
    icon: siteConfig.images.favicon,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.seo.siteUrl,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: siteConfig.images.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [siteConfig.images.ogImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontSans.variable} ${fontHeading.variable} scroll-smooth dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary selection:text-white"
        style={
          {
            "--brand-primary": siteConfig.theme.primaryColor,
            "--brand-secondary": siteConfig.theme.secondaryColor,
            "--brand-accent": siteConfig.theme.accentColor,
            "--brand-dark-base": siteConfig.theme.darkBackground,
            "--brand-dark-navy": siteConfig.theme.lightBackground,
          } as React.CSSProperties
        }
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}

