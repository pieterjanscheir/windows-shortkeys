# shortkeys

Dé Nederlandstalige gids met sneltoetsen voor **Microsoft Windows** én **macOS**. Wissel met één klik tussen besturingssystemen en doorzoek toetsencombinaties voor vensters, Snap Layouts, Widgets, virtuele bureaubladen, schermafdrukken en meer.

Live: [windows-sneltoetsen.vercel.app](https://windows-sneltoetsen.vercel.app)

## Features

- Doorzoekbare lijst met Windows- en macOS-sneltoetsen, gesorteerd op **categorie** en **niveau** (beginner → expert).
- One-click OS-switcher: bekijk dezelfde sneltoets in zijn Windows- of Mac-variant.
- Detailpagina's per sneltoets (`/sneltoetsen/[os]/[slug]`), per categorie (`/categorie/[category]`) en per niveau (`/niveau/[level]`).
- "Tip van de dag" op de homepage, deterministisch gekozen op basis van de datum.
- Donkere/lichte modus via `next-themes`.
- SEO-vriendelijk: gestructureerde data (`ItemList`, `FAQPage`, `WebSite`), sitemap, robots en Open Graph metadata.
- Toetsenbordtoegankelijke UI met componenten op basis van Radix / Base UI en shadcn.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn / Radix UI / Base UI componenten
- `nuqs` voor URL-state, `cmdk` voor het zoekpaneel, `sonner` voor toasts

## Aan de slag

Installeer de dependencies en start de dev-server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Scripts

- `pnpm dev` — Next.js dev-server met Turbopack
- `pnpm build` — productiebuild
- `pnpm start` — productiebuild serveren
- `pnpm lint` — ESLint

## Projectstructuur

```
app/
  _components/       UI-componenten (ShortkeyExplorer, OsToggle, ThemeToggle, ...)
  categorie/         Per-categorie pagina's
  niveau/            Per-niveau pagina's
  sneltoetsen/       Detailpagina's per sneltoets en per OS
  over/              "Over"-pagina
  layout.tsx         Root layout, metadata en JSON-LD
  page.tsx           Homepage
components/ui/       shadcn-componenten
lib/
  shortkeys.ts       Bron van alle sneltoetsen, categorieën en niveaus
  utils.ts           Hulpfuncties
```

De volledige set sneltoetsen, categorieën, niveaus en bijbehorende slugs staat in `lib/shortkeys.ts`. Voeg daar een nieuwe entry toe om een sneltoets aan de site toe te voegen.

## Omgevingsvariabelen

- `NEXT_PUBLIC_SITE_URL` — canonieke URL van de site (gebruikt voor metadata en JSON-LD). Standaard: `https://windows-sneltoetsen.vercel.app`.

## Deploy

De site wordt gedeployd op [Vercel](https://vercel.com). Elke push naar `main` triggert een nieuwe deploy.

## Auteur

Gemaakt door [Pieter-Jan Scheir](https://scheir.eu).
