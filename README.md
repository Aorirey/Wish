# Wishly

A small, friendly wishlist web app for keeping the things you love and peeking at
what your people are saving. Built with Next.js (App Router), TypeScript, Tailwind
CSS, Framer Motion, and Zustand.

![Wishly screenshot](https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1200&q=60)

## Feature highlights

- **Curated landing page** — animated hero, trending showcase, and a warm call‑to‑action.
- **Home feed** — friend activity, trending products, and category discovery.
- **Discover** — search + filter by category and price bucket, with sort options.
- **Wishlist** — priority tagging (Maybe / Soon / Dreaming), totals, share link.
- **Friends** — follow list, themed profiles, and per‑friend wishlists with quiet
  gift reservations.
- **Product detail** — store link, tags, related items, and "also saved by" social proof.
- **Profile** — editable identity with accent color theming, persisted locally.
- **Real products, real stores** — ~30 items across Apple, Sony, Patagonia, Uniqlo,
  Sephora, LEGO, Hay, Fujifilm, and more, with approximate US retail prices.

State is persisted in `localStorage` via Zustand — no server or database required.

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/                 # Next.js App Router pages
    page.tsx           # Landing page
    app/               # The authenticated-feeling app shell
      page.tsx         # Home
      wishlist/        # My wishlist
      discover/        # Catalog with filters
      friends/         # Friends index + detail
      product/[id]/    # Product detail
      profile/         # Profile editor
  components/
    layout/            # Sidebar, TopBar, MobileNav
    product/           # ProductCard, HeartButton
    ui/                # Avatar, Logo, Toaster
  data/                # Product catalog and friend fixtures
  store/               # Zustand stores (wishlist + profile)
  lib/                 # Utilities (formatPrice, timeAgo, cn)
```

## Design notes

- Typography pairs Inter for UI with Fraunces for display, giving the app a
  quiet editorial voice instead of a generic SaaS look.
- The accent color (`accent-500`) is used sparingly — reserved for the heart
  state, CTAs, and the handwritten underline on the hero. Everything else
  leans on a soft ink palette.
- Motion is intentional and short: 400–700ms with a custom spring for layout
  and a `cubic-bezier(.22,1,.36,1)` for image reveals. Nothing moves without a
  reason.
- All imagery is pulled from Unsplash with deterministic URLs so the catalog
  looks coherent without a CMS.

## License

MIT. Do whatever makes you happy.
