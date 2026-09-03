# AGENTS.md - Guia para Agentes de IA e Desenvolvedores

Este arquivo contém orientações, diretrizes e regras arquiteturais que **devem ser seguidas estritamente** por qualquer agente de IA (ex: Claude Code, Gemini Antigravity, Copilot, Cline) ou desenvolvedor ao realizar modificações neste repositório ou em seus clones.

---

## 1. Carregamento Obrigatório de Skills
- **Skills Locais**: Antes de realizar alterações de código ou design, o agente de IA deve obrigatoriamente inspecionar e aplicar as instruçoes contidas na pasta `.agents/skills/` (ex: `.agents/skills/frontend-design/SKILL.md`).
- **Padrões de Design**: Caso a skill `frontend-design` esteja ativa, siga rigorosamente suas diretrizes de layout, tipografia, paletas de cores e boas práticas de UX.

---

## 2. Uso Estratégico e Priorização do `shadcn/ui`
- **Componentes Interativos**: **Priorizar obrigatoriamente `shadcn/ui`** (`components/ui/`) para qualquer elemento que exija acessibilidade (ARIA), gerenciamento de estado ou interação complexa (ex: `Dialog/Sheet` para menus móbile, `Accordion` para FAQ, `Carousel` para depoimentos, `Form/Input/Textarea` para formulários e `Button` para ações).
- **Vantagem Arquitetural**: O `shadcn/ui` não é uma biblioteca externa fechada, mas sim componentes cujos códigos fonte vivem em `components/ui/`. Isso garante 100% de controle sobre a estilitzação via Tailwind CSS sem inflar o bundle final.
- **Layouts Estáticos**: Para layouts puros de seção (containers, grids, frases), utilize HTML5 semântico simples com Tailwind CSS.

---

## 3. Contexto do Projeto
- **Objetivo**: Este projeto é um template base (boiler-plate) de alta performance e conversão para **Landing Pages de Pequenos Comércios Locais** utilizando Next.js 15 (App Router), TypeScript, Tailwind CSS e componentes `shadcn/ui`.
- **Caso de Uso Base**: O primeiro caso de uso pré-configurado é uma **Academia de Musculação e Funcional Fictícia**, mas toda a estrutura foi projetada para ser clonada e adaptada em minutos para qualquer nicho (ex: restaurantes, clínicas, oficinas, salões de beleza).

---

## 4. Filosofia de Design Obrigatória

### A. Sites Minimalistas e Diretos
- **Hierarquia visual cristalina**: Poucos elementos por seção com foco no essencial.
- **Espaço em branco abundante**: Evitar poluição visual ou excesso de cards aglomerados.
- **Micro-animações sutis**: Sem excessos decorativos ou animações pesadas que atrapalhem o carregamento.

### B. Prioridade Máxima em SEO e Core Web Vitals
- **HTML5 Semântico**: Uso estrito de `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`.
- **Hierarquia de Headings**: **Apenas UM único `<h1>` por página** (localizado no `Hero.tsx`). Todas as outras seções utilizam `<h2>` e `<h3>`.
- **Metadata API**: Toda informação de SEO (title, description, OpenGraph, twitter) deve vir do `content/site.config.ts`.
- **Acessibilidade e Imagens**: Todas as imagens (`next/image`) exigem o atributo `alt` descritivo.
- **Performance**: A pontuação do Lighthouse e métricas de Core Web Vitals (LCP, CLS, INP) são critérios inegociáveis de aceite para qualquer alteração.

### C. Foco Total em Conversão Local
- **CTAs visíveis e acessíveis**: Botão flutuante do WhatsApp sempre presente (`WhatsAppButton.tsx`), links de ação rápida para ligação ou formulário.
- **Copy Objetiva**: Linguagem simples, direta, sem jargões corporativos e orientada à ação imediata do cliente local.

---

## 5. Regras Estruturais Inegociáveis

1. **Fonte Única de Verdade (`content/site.config.ts`)**:
   - **NENHUM** componente deve conter textos, links, números de telefone, e-mails, endereços ou cores hardcoded no JSX.
   - Qualquer conteúdo dinâmico deve ser consumido de `siteConfig` (definido e tipado na interface `SiteConfig`).
2. **Cores da Marca via CSS Variables / Tailwind**:
   - As cores primárias e secundárias vêm de `siteConfig.theme` e são injetadas como variáveis CSS (ex: `--brand-primary`), permitindo customização instantânea por cliente sem alterar CSS compilado.
3. **Padrão para Novas Seções**:
   - Qualquer nova seção adicionada ao projeto DEVE ser criada dentro de `components/sections/` em arquivo PascalCase (ex: `Gallery.tsx`).
   - A nova seção deve consumir seus dados do `site.config.ts` através do tipo correspondente.

---

## 6. Convenções de Código

- **TypeScript Estrito**: Tipagem explícita para todas as props, interfaces e dados do `site.config.ts`. Evitar o uso de `any`.
- **Componentes Funcionais**: Componentes React funcionais com exportação nomeada ou default conforme padrão do diretório.
- **Tailwind CSS V4**: Estilização baseada em utilitários Tailwind. **Proibido** uso de CSS-in-JS ou arquivos `.css` soltos por componente.
- **Organização de Pastas**:
  - `app/`: `layout.tsx`, `page.tsx`, `globals.css`, `sitemap.ts`, `robots.ts` (sem subpasta `src/`).
  - `components/ui/`: Componentes brutos gerados pelo `shadcn/ui`.
  - `components/sections/`: Seções completas da landing page (`Header.tsx`, `Hero.tsx`, `About.tsx`, `Services.tsx`, `Testimonials.tsx`, `Faq.tsx`, `Location.tsx`, `Contact.tsx`, `Footer.tsx`).
  - `components/shared/`: Componentes utilitários reutilizáveis (`WhatsAppButton.tsx`, `MobileMenu.tsx`).
  - `content/`: `site.config.ts` (definição de tipos e dados do cliente).
  - `lib/`: `utils.ts` (função `cn` de mesclagem de classes).
  - `public/images/`: Imagens estáticas do projeto.

---

## 7. Instrução Explícita para Novas Bibliotecas

Antes de adicionar qualquer biblioteca de terceiros ao projeto (via `npm install`), **verifique obrigatoriamente** se ela é 100% compatível com a exportação estática (`output: 'export'` no Next.js).
- **Proibido**: Depender de recursos exclusivos de servidor Next.js que exijam Node.js ativo (como `headers()`, `cookies()`, revalidação dinâmica em rotas de API do servidor) em páginas estáticas.
- **Permitido**: Bibliotecas client-side leves (ex: Lucide Icons, Embla Carousel, React Hook Form, Zod).
