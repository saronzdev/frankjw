# Frank Joyería

E-commerce for jewelry (rings, chains, earrings, sets, and more) serving Cuba. Built with Preact, Vite, and TypeScript, deployed on Vercel.

**Live site:** [frankjoyeriacuba.com](https://frankjoyeriacuba.com)

## Features

- **Product catalog** — browse by category (`/products/:category?`) with sorting (newest, name, price, weight) and filters (price range, karats, on sale).
- **Product details popup** — multi-image viewer with prev/next navigation, price/weight/karat info, and WhatsApp reservation.
- **Admin dashboard** (`/dashboard`) — full CRUD, image upload to Supabase Storage, search by product ID, and the same sort/filter controls as the public catalog.
- **Authentication** — login with role check; the dashboard route is protected and hidden from non-admins.
- **WhatsApp reservation** — share product details with store sellers via `wa.me`.
- **PWA** — installable, offline-ready with a service worker that caches app shell, local images, and Supabase images.
- **Responsive & accessible** — mobile-first CSS Modules, keyboard-reachable controls, semantic buttons.

## Tech Stack

| Layer | Tool |
|---|---|
| UI | [Preact](https://preactjs.com/) 10 + [@preact/signals](https://preactjs.com/guide/v10/signals/) |
| Language | [TypeScript](https://www.typescriptlang.org/) 7 (strict) |
| Build | [Vite](https://vitejs.dev/) 7 + `@vitejs/plugin-legacy` |
| Routing | [wouter](https://github.com/molefrog/wouter) |
| Data | [axios](https://axios-http.com/) against a custom REST API |
| Storage | [Supabase Storage](https://supabase.com/docs/guides/storage) (product images) |
| Toasts | [sonner](https://sonner.emilkowal.ski/) |
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| Analytics | Vercel Analytics + Speed Insights |
| Deploy | [Vercel](https://vercel.com/) |

The frontend depends on a **separate backend API** (not in this repo) that serves `/api/v1/products` and `/api/v1/auth`.

## Getting Started

### Prerequisites

- Node.js 20+ (or Bun)
- pnpm

### Install and run

```bash
git clone https://github.com/saronzdev/frankjw.git
cd frankjw/app
pnpm install
cp .env.example .env      # then fill in your values
pnpm dev                  # http://localhost:5173
```

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_TOKEN` | Supabase anon/public key | Yes |
| `VITE_BACKEND_URL` | Backend API base URL (e.g. `https://api.example.com`) | Yes |

The client calls `${VITE_BACKEND_URL}/api/v1/` with credentials (`withCredentials: true`). If `VITE_BACKEND_URL` is unset, it falls back to `http://localhost:3000`.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server on `localhost:5173` |
| `pnpm devx` | Dev server bound to `0.0.0.0` (network access) |
| `pnpm build` | Type-check (`tsc -b`) and produce a production build |
| `pnpm preview` | Serve the production build locally |

## Project structure

```plaintext
app/
├── public/               # PWA assets, icons, logo, robots.txt, sitemap
└── src/
    ├── assets/           # Bundled images and icons
    ├── components/
    │   ├── landing/      # Hero, Carousel, Highlighted, Sample, Social
    │   └── products/     # ProductCard, ProductForm, ProductPopup, filters, search, sort
    ├── pages/            # HomePage, Products, Dashboard, About, Contact, Login, NotFound
    ├── shared/           # API client (fetching.ts), supabase.ts, signals.ts, constants, utils
    ├── styles/           # CSS Modules (one per component)
    ├── app.tsx           # Routes (code-split) and layout
    ├── global.css        # Design tokens (colors, spacing, radii) and base styles
    └── main.tsx          # Entry point
```

## Key implementation notes

### Data fetching and resilience

- Products are fetched once on startup into a Preact signal (`shared/signals.ts`) with up to **3 retries** and exponential backoff + jitter.
- API errors surface through a shared error-code → message map (`getErrorMessage`).
- Login and CRUD calls always return `{ ok, error }`; errors are shown as toasts.

### Images

- Uploaded through **Supabase Storage** to the `pictures` bucket.
- Client-side constraint: **max 2 images per product, 100 KB each** (required by the client's infrastructure limits).
- Catalog thumbnails use Supabase `?width=&quality=` transforms with a responsive `srcSet`; the detail popup renders images with `object-fit: contain` (never cropped).

### PWA caching (vite-plugin-pwa)

- `CacheFirst` for Supabase images — cache name `supabase-images`, up to **600 entries**, 1 year.
- `CacheFirst` for other local images — `local-images`, up to **100 entries**, 1 year.
- Cache headers (immutable assets, `sw.js`, manifest) configured in `vercel.json`.

### Routing & performance

- Every route is code-split with `lazy()` + `Suspense`; only the active page is downloaded.
- Design tokens defined once in `global.css` as CSS custom properties.
- Google Fonts (Inter + Playfair Display) loaded from a single preloaded stylesheet.

## Browser support

Works on older browsers, but a recent browser version is recommended for the full experience.

## License

GPL-3.0

## Author

Developed by [saronzdev](https://github.com/saronzdev)
