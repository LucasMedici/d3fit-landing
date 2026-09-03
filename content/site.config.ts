/**
 * SITE CONFIGURATION - SINGLE SOURCE OF TRUTH
 * 
 * Centralize aqui todo o conteúdo, dados do negócio, cores e mídias da landing page.
 * Nenhum componente deve conter textos, cores ou links hardcoded.
 */

export interface NavLink {
  label: string
  href: string
}

export interface BusinessHours {
  days: string
  hours: string
}

export interface SocialLink {
  platform: string
  url: string
  iconName: "Instagram" | "Facebook" | "Youtube" | "MapPin" | "Phone" | "Mail"
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  price?: string
  period?: string
  popular?: boolean
  features: string[]
  ctaText?: string
  ctaLink?: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  content: string
  avatar?: string
  rating?: number
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface HighlightItem {
  title: string
  description: string
  iconName: string
}

export interface ModalityItem {
  id: string
  title: string
  description: string
  tag?: string
}

export interface SiteConfig {
  brand: {
    name: string
    tagline: string
    description: string
    logoText: string
    logoImage?: string
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    darkBackground: string
    lightBackground: string
  }
  contact: {
    phone: string
    phoneDisplay: string
    whatsapp: string
    whatsappDefaultMessage: string
    email: string
    address: {
      street: string
      neighborhood: string
      city: string
      state: string
      zip: string
      fullAddress: string
      googleMapsIframeUrl: string
    }
    businessHours: BusinessHours[]
    socialLinks: SocialLink[]
  }
  images: {
    heroImage: string
    aboutImage: string
    ogImage: string
    favicon: string
  }
  navigation: NavLink[]
  hero: {
    badge: string
    title: string
    subtitle: string
    primaryCta: { text: string; href: string }
    secondaryCta: { text: string; href: string }
    highlightTags: string[]
  }
  modalities: {
    badge: string
    title: string
    subtitle: string
    items: ModalityItem[]
  }
  about: {
    badge: string
    title: string
    subtitle: string
    paragraphs: string[]
    founder: {
      name: string
      role: string
      bio: string
    }
    highlights: HighlightItem[]
  }
  services: {
    badge: string
    title: string
    subtitle: string
    featuresIncluded: string[]
    items: ServiceItem[]
  }
  testimonials: {
    badge: string
    title: string
    subtitle: string
    items: TestimonialItem[]
  }
  faq: {
    badge: string
    title: string
    subtitle: string
    items: FaqItem[]
  }
  locationSection: {
    badge: string
    title: string
    subtitle: string
  }
  contactSection: {
    badge: string
    title: string
    subtitle: string
    formSubmitSuccessMessage: string
  }
  footer: {
    copyrightText: string
  }
  seo: {
    defaultTitle: string
    titleTemplate: string
    description: string
    keywords: string[]
    siteUrl: string
  }
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "D3FIT",
    tagline: "Treino sem desculpa.",
    description: "Treinamento de força funcional com correção técnica individual, progressão acompanhada mês a mês e turmas pequenas. Sem modinha, sem treino genérico.",
    logoText: "D3FIT",
    logoImage: "/images/logo.png",
  },
  theme: {
    // Cores oficiais da marca D3FIT
    primaryColor: "#E3402D", // Vermelho sinal (Accent primário — CTAs, destaques, "sem desculpa")
    secondaryColor: "#D9A62E", // Amarelo mostarda (Accent secundário, tags e badges)
    accentColor: "#5B6169", // Cinza-aço (Texto secundário, bordas, elementos neutros)
    darkBackground: "#1E1D1B", // Grafite escuro (Fundo base, seções principais)
    lightBackground: "#14202B", // Marinho profundo (Fundo alternativo para contraste sutil)
  },
  contact: {
    phone: "5511934723219",
    phoneDisplay: "(11) 93472-3219",
    whatsapp: "5511934723219",
    whatsappDefaultMessage: "Olá! Gostaria de agendar minha aula experimental gratuita na D3FIT.",
    email: "contato@d3fit.com.br",
    address: {
      street: "Av. Bosque da Saúde, 1004",
      neighborhood: "Vila da Saúde",
      city: "São Paulo",
      state: "SP",
      zip: "04142-081",
      fullAddress: "Av. Bosque da Saúde, 1004 — Vila da Saúde, São Paulo - SP, 04142-081",
      googleMapsIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.353346985472!2d-46.6341!3d-23.6111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzQwLjAiUyA0NsKwMzgnMDIuOCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr",
    },
    businessHours: [
      { days: "Segunda a Sexta", hours: "06h às 22h" },
      { days: "Sábado", hours: "08h às 14h" },
      { days: "Domingo e Feriados", hours: "Fechado" },
    ],
    socialLinks: [],
  },
  images: {
    heroImage: "/hero1.jpg",
    aboutImage: "/images/about.jpg",
    ogImage: "/images/og-image.jpg",
    favicon: "/favicon.ico",
  },
  navigation: [
    { label: "Início", href: "#hero" },
    { label: "O Método", href: "#about" },
    { label: "Planos", href: "#services" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "Dúvidas", href: "#faq" },
    { label: "Localização", href: "#location" },
    { label: "Contato", href: "#contact" },
  ],
  hero: {
    badge: "Aqui não tem treino fácil",
    title: "Sem desculpa.\nSem enrolação.",
    subtitle: "Treinamento de força funcional com correção técnica individual, progressão acompanhada mês a mês e turmas pequenas. Sem modinha, sem treino genérico.",
    primaryCta: { text: "Agende sua aula experimental gratuita", href: "#contact" },
    secondaryCta: { text: "Fale com a gente no WhatsApp", href: "#whatsapp" },
    highlightTags: [
      "Turmas de até 8 alunos",
      "Avaliação de movimento obrigatória",
      "Progressão registrada mês a mês",
    ],
  },
  modalities: {
    badge: "O que rola na D3FIT",
    title: "Modalidades & Foco",
    subtitle: "Cada modalidade tem um propósito e um professor de olho na sua execução.",
    items: [
      {
        id: "m1",
        title: "Musculação",
        description: "Foco em força e hipertrofia, com ficha revisada a cada 4 semanas. Nada de treino que não muda há 6 meses.",
        tag: "Força & Hipertrofia"
      },
      {
        id: "m2",
        title: "Treino Funcional",
        description: "Movimento multiarticular, carga real, sem máquina guiada. Aqui o corpo trabalha como trabalha na vida.",
        tag: "Funcional"
      },
      {
        id: "m3",
        title: "Treino em Grupo (Turmas)",
        description: "Até 8 pessoas por turma. Todo mundo treina junto, ninguém treina escondido.",
        tag: "Até 8 Alunos"
      },
      {
        id: "m4",
        title: "Condicionamento / Aeróbico",
        description: "Circuitos de intensidade variável — pra quem quer melhorar fôlego sem virar refém de esteira.",
        tag: "Condicionamento"
      },
      {
        id: "m5",
        title: "Avaliação de Movimento",
        description: "Antes de carregar peso, avaliamos como você se move. Previne lesão, corrige o que precisa ser corrigido.",
        tag: "Biomecânica"
      },
      {
        id: "m6",
        title: "Acompanhamento Individual",
        description: "Revisão de carga, ajuste de plano e check-in direto com seu professor — não com um app.",
        tag: "100% Acompanhado"
      },
    ],
  },
  about: {
    badge: "O Método D3FIT",
    title: "Acompanhamento de verdade, do primeiro treino em diante",
    subtitle: "Estrutura e metodologia desenhada para quem busca força, saúde articular e evolução de verdade.",
    paragraphs: [
      "A D3FIT nasceu em 2016, quando Marcos Toledo, ex-atleta de levantamento de força, decidiu abrir um espaço onde treino sério não fosse reduzido a planilha genérica de aplicativo. Hoje o time é pequeno de propósito: menos alunos por professor, mais atenção real pra cada um. A gente não vende fórmula mágica nem promete resultado em 30 dias, vende constância e um lugar onde você é acompanhado de verdade, não só mais um número na carteirinha.",
      "Nosso compromisso é com o seu progresso consistente: você aprende o padrão biomecânico correto, evolui de forma segura e treina com acompanhamento de perto em todas as séries.",
    ],
    founder: {
      name: "Marcos Toledo",
      role: "Fundador & Treinador Chefe",
      bio: "Ex-atleta de levantamento de força, com 14 anos de experiência prática e acadêmica em treinamento resistido e biomecânica do movimento.",
    },
    highlights: [
      {
        title: "Base técnica",
        description: "Todo aluno novo passa por avaliação de movimento antes de pegar peso. Aprende o padrão certo primeiro — a carga vem depois.",
        iconName: "Target",
      },
      {
        title: "Progressão real",
        description: "Cada treino fica registrado: peso, séries, esforço percebido. A cada 4 semanas revisamos sua evolução e ajustamos o plano.",
        iconName: "TrendingUp",
      },
      {
        title: "Comunidade que cobra",
        description: "Turmas de até 8 pessoas. O professor sabe seu nome, sua lesão antiga, sua meta — e sabe quando você faltou.",
        iconName: "Users",
      },
    ],
  },
  services: {
    badge: "Planos & Estrutura",
    title: "Escolha o seu plano de evolução",
    subtitle: "Sem letras miúdas. Metodologia de força com acompanhamento técnico contínuo em todas as opções.",
    featuresIncluded: [
      "Avaliação de movimento antes de iniciar (sem treino sem avaliação prévia)",
      "Treinos em grupo pequeno (até 8 alunos por turma)",
      "Musculação com foco em força e hipertrofia",
      "Treinamento funcional integrado",
      "Acompanhamento de carga e progressão registrado por aluno",
      "Revisão de treino a cada 4 semanas",
      "Avaliação física periódica",
      "Ambiente climatizado, vestiário com armário e chuveiro",
    ],
    items: [
      {
        id: "mensal",
        title: "Mensal",
        description: "Pra testar",
        price: "R$ 189",
        period: "/mês",
        popular: false,
        features: [
          "Turmas de até 8 alunos por horário",
          "Avaliação inicial de movimento",
          "Acesso total à musculação e funcional",
          "Vestiário completo",
        ],
        ctaText: "Quero começar",
        ctaLink: "#contact",
      },
      {
        id: "trimestral",
        title: "Trimestral",
        description: "Pra consolidar",
        price: "R$ 169",
        period: "/mês",
        popular: true,
        features: [
          "Tudo do Mensal",
          "1 sessão individual com o professor por mês (fora da turma)",
          "Reavaliação física a cada 12 semanas",
          "Prioridade de horário na grade",
        ],
        ctaText: "Quero começar",
        ctaLink: "#contact",
      },
      {
        id: "anual",
        title: "Anual",
        description: "Pra levar a sério",
        price: "R$ 149",
        period: "/mês",
        popular: false,
        features: [
          "Tudo do Trimestral",
          "Plano de treino individualizado e periodizado (não é a ficha da turma)",
          "1 consulta com nutricionista parceiro por trimestre",
          "Kit D3FIT (camiseta + garrafa) na matrícula",
          "Acesso antecipado a workshops de técnica",
        ],
        ctaText: "Quero começar",
        ctaLink: "#contact",
      },
    ],
  },
  testimonials: {
    badge: "Resultados Reais",
    title: "O que dizem os nossos alunos",
    subtitle: "Histórias de quem abandonou as desculpas e construiu força de verdade.",
    items: [
      {
        id: "t1",
        name: "Camila R.",
        role: "Aluna há 2 anos",
        content: "Entrei sem nunca ter levantado peso na vida. Hoje faço agachamento com carga que eu nem imaginava ser capaz.",
        rating: 5,
      },
      {
        id: "t2",
        name: "Diego M.",
        role: "Aluno há 1 ano",
        content: "Troquei de academia três vezes até achar um lugar que realmente acompanha a evolução, não só empurra plano novo.",
        rating: 5,
      },
      {
        id: "t3",
        name: "Patrícia A.",
        role: "Aluna há 3 anos",
        content: "O grupo pequeno faz toda diferença. Ninguém treina sozinho aqui, mesmo treinando sozinho.",
        rating: 5,
      },
    ],
  },
  faq: {
    badge: "Dúvidas Frequentes",
    title: "Perguntas Frequentes",
    subtitle: "Tudo o que você precisa saber antes de agendar sua visita.",
    items: [
      {
        id: "f1",
        question: "Preciso agendar aula experimental?",
        answer: "Sim! Como trabalhamos com turmas limitadas a 8 alunos, o agendamento prévio garante que um professor dedicado estará pronto para fazer sua avaliação de movimento e te orientar do início ao fim.",
      },
      {
        id: "f2",
        question: "Nunca treinei com pesos na vida. Posso começar na D3FIT?",
        answer: "Com certeza. Todo novo aluno passa pela avaliação de movimento antes de pegar qualquer carga. Você aprende a biomecânica correta primeiro e evolui com segurança e acompanhamento próximo.",
      },
      {
        id: "f3",
        question: "Como funciona a dinâmica de turmas de até 8 alunos?",
        answer: "Você treina em turmas pequenas onde o professor sabe exatamente seu histórico, metas e limitações, garantindo a correção de cada repetição sem filas de espera em aparelhos.",
      },
      {
        id: "f4",
        question: "Como é feito o registro de carga e progressão?",
        answer: "Seus treinos, cargas e repetições são registrados e monitorados. A cada 4 semanas, realizamos uma revisão formal para ajustar a sobrecarga progressiva e os estímulos.",
      },
      {
        id: "f5",
        question: "A estrutura possui vestiários e estacionamento?",
        answer: "Sim! Nossa unidade conta com ambiente 100% climatizado, vestiários com armários individuais e chuveiros com água quente, além de fácil estacionamento na região da Vila da Saúde.",
      },
    ],
  },
  locationSection: {
    badge: "Localização & Horários",
    title: "Venha treinar na D3FIT",
    subtitle: "Estrutura completa e de fácil acesso na Vila da Saúde em São Paulo.",
  },
  contactSection: {
    badge: "Agendar Visita",
    title: "Agende sua aula experimental gratuita",
    subtitle: "Dê o primeiro passo sem compromisso. Preencha os campos abaixo e entraremos em contato.",
    formSubmitSuccessMessage: "Solicitação recebida! Em breve entraremos em contato via WhatsApp para confirmar seu horário.",
  },
  footer: {
    copyrightText: "© 2026 D3FIT. Todos os direitos reservados. Treino sem desculpa.",
  },
    seo: {
      defaultTitle: "D3FIT | Treino sem desculpa",
      titleTemplate: "%s | D3FIT - Treino sem desculpa",
      description: "Academia de treinamento de força funcional em São Paulo (Vila da Saúde). Turmas de até 8 alunos, correção técnica individual e progressão acompanhada mês a mês.",
    keywords: [
      "D3FIT",
      "academia são paulo",
      "treinamento de força",
      "treino funcional",
      "vila da saúde",
      "bosque da saúde",
      "academia turmas pequenas",
      "musculação sem modinha",
      "treino sem desculpa",
    ],
    siteUrl: "https://d3fit.com.br",
  },
}

