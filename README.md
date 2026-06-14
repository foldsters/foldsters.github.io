# foldsters.com

The Foldster's Projects consultancy site. Astro static site, deploys via
GitHub Actions to GitHub Pages → [foldsters.com](https://foldsters.com).

## Local development

```sh
npm install
npm run dev          # dev server (also '-- --host' for LAN access)
npm run build        # build to ./dist
npm run preview      # build + serve from ./dist
```

## Stack

- Astro 5
- iA Writer Quattro S, self-hosted in `public/fonts/`
- No client-side JS framework — vanilla Astro components only
- View transitions via `<ClientRouter />` in `LayoutLanding.astro`

## Project layout

```
src/
  components/   HeroSection, Logo, PagesCard, Work/Tools/ServicesSection
  layouts/      LayoutLanding (landing page wrapper), LayoutPage (inner pages)
  pages/        / · /work/* · /tools/* · /services/ · /about/ · /contact/
  content/      images/ — wired up via Astro's <Image> for optimization
  utils/        colors.ts — brand palette
public/
  fonts/        iA Writer Quattro S (Regular / Bold / Italic / BoldItalic)
  images/       logo + favicon
  CNAME         foldsters.com
```

## Deploy

Pushes to `master` trigger `.github/workflows/deploy.yml`, which builds with
`withastro/action@v3` and ships via `actions/deploy-pages@v4`.

The Bluesky avatar-refresh hook lives in the separate
[foldsters/portfolio](https://github.com/foldsters/portfolio) repo on its
own daily cron, so this repo doesn't carry Bluesky credentials.
