# Frank Joyería — Frontend

Web storefront for [frankjoyeriacuba.com](https://frankjoyeriacuba.com), an e-commerce for jewelry serving Cuba. Preact + Vite SPA, installable as a PWA, with an admin dashboard for the catalog. It consumes the REST API served by [frankjw-api](https://github.com/saronzdev/frankjw-api) (separate repository).

![ci](https://github.com/saronzdev/frankjw/actions/workflows/ci.yml/badge.svg?branch=main)
![license](https://img.shields.io/badge/license-GPL--3.0-blue)
![typescript](https://img.shields.io/badge/TypeScript-strict-blue)
![node](https://img.shields.io/badge/Node.js-20%2B-blue)

## Security

Everything in the client is public, so the design assumes the bundle can be read and tampered with:

- **No secrets in the bundle** — only public `VITE_*` values ship (Supabase URL + anon key, API base URL). `.env` is never committed; `.env.example` carries placeholders. Nothing meaningful can be extracted from the source.
- **Cookie-based admin auth** — login exchanges credentials for an `httpOnly` cookie issued by the API; no token is stored in JS. The dashboard route guard (`isAdmin`) is UX only — every admin request is authorized and validated server-side.
- **Real logout** — `POST /auth/logout` expires the session cookie in the API; the client additionally clears its local flag and resets the role signal.
- **Hardened uploads** — the client accepts an image MIME allowlist, generates UUID file names and enforces 2 images / 100 KB per product; the API re-validates everything.
- **Scoped PWA caching** — the service worker runtime cache only touches the **public** `GET /api/v1/products` endpoint (`StaleWhileRevalidate`, GET-only, 1 entry, 1 h). Auth and admin responses are never cached.
- **Safe output and links** — Preact escapes rendered content by default; WhatsApp reservation links open with `noopener,noreferrer` (anti-tabnabbing).
- **CI as a quality gate** — lint, typecheck, unit tests and a production build run on every pull request and every push to `main`.

## Tech stack

| Layer | Tool |
|---|---|
| UI | [Preact](https://preactjs.com/) 10 + [@preact/signals](https://preactjs.com/guide/v10/signals/) |
| Language | [TypeScript](https://www.typescriptlang.org/) 6 (strict) |
| Build | [Vite](https://vitejs.dev/) 7 + `@vitejs/plugin-legacy` |
| Routing | [wouter](https://github.com/molefrog/wouter) |
| Data | [axios](https://axios-http.com/) against the REST API |
| Storage | [Supabase Storage](https://supabase.com/docs/guides/storage) (product images) |
| Toasts | [sonner](https://sonner.emilkowal.ski/) |
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| Testing | [Vitest](https://vitest.dev) |
| Linting | [ESLint](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io) |
| Analytics | Vercel Analytics + Speed Insights |
| Deploy | [Vercel](https://vercel.com/) |

## Project structure

```
├── index.html                      # Entry HTML (SEO, Open Graph, fonts, preconnects)
├── public/                         # PWA icons, logo, robots.txt, sitemap
├── src/
│   ├── assets/                     # Bundled images (categories, UI icons, samples)
│   ├── components/
│   │   ├── landing/                # Hero, Carousel, Highlighted, Sample, Social
│   │   └── products/               # ProductCard, ProductForm, ProductPopup, filters, search, sort
│   ├── pages/                      # HomePage, Products, Dashboard, About, Contact, Login, NotFound
│   ├── shared/
│   │   ├── fetching.ts             # API client requests + centralized error codes
│   │   ├── signals.ts              # Preact signals (catalog, admin role) + retry/backoff actions
│   │   ├── supabase.ts             # Hardened image upload/delete (MIME allowlist, UUID names)
│   │   ├── utils.ts                # Pure helpers (filters, sorting, slugs, image URLs)
│   │   └── constants.ts            # Categories, menu, error-code → message map
│   ├── styles/                     # CSS Modules (one per component)
│   ├── app.tsx                     # Routes (code-split) and layout
│   ├── global.css                  # Design tokens (colors, spacing, radii) and base styles
│   └── main.tsx                    # Entry point
├── tests/                          # Unit tests (pure helper logic)
├── .github/workflows/ci.yml        # CI: lint + typecheck + test + build
├── eslint.config.mjs
├── vitest.config.ts
├── vercel.json                     # SPA rewrites + cache headers
├── .env.example
└── vite.config.ts                  # PWA manifest + workbox runtime caching
```

## Getting started

```bash
pnpm install
cp .env.example .env   # fill in the values
pnpm dev               # http://localhost:5173
```

Requires Node.js 20.19+ (or 22.12+) and [pnpm](https://pnpm.io/) 12.

## Testing

```bash
pnpm lint           # eslint over the whole project
pnpm typecheck      # tsc -b (strict, project references)
pnpm test           # run once
pnpm test:watch     # watch mode
```

The test suite (`tests/utils.test.ts`) covers the pure helpers in `src/shared/utils.ts`: product filtering by price/karats/on-sale, every sort mode, slugify/unslugify round-trips, image URL transforms (Supabase vs. external), email validation, the retry policy for transient API codes and the error-code → message map.

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, carousel, highlights, social links. |
| `/products/:category?` | Catalog | Sorting (newest, name, price, weight) and filters (price range, karats, on sale). |
| `/login` | Login | Admin authentication against the API. |
| `/dashboard` | Dashboard | Admin-only: full CRUD, image uploads, search by product ID. |
| `/about`, `/contact` | Static | Store info and contact. |
| `*` | 404 | Not-found page. |

## Features

- **Product catalog** — browse by category with sorting and filters; prices support offers (`offerPrice`).
- **Product details popup** — multi-image viewer with prev/next navigation, price/weight/karat info and WhatsApp reservation.
- **Admin dashboard** — full product CRUD, image upload to Supabase Storage, search by product ID, same sort/filter controls as the public catalog.
- **WhatsApp reservation** — one tap opens a `wa.me` chat pre-filled with product details for the store sellers.
- **PWA** — installable, offline-ready: precached app shell + locally stored images, and a scoped runtime cache for the public catalog endpoint.
- **Responsive & accessible** — mobile-first CSS Modules, keyboard-reachable controls, semantic buttons.
- **Resilient data fetching** — the catalog loads into a Preact signal with up to 3 retries and exponential backoff + jitter; errors surface as toasts through a shared error-code → message map.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL (public value). |
| `VITE_SUPABASE_TOKEN` | Yes | Supabase anon/public key (public value; access is governed by the bucket policies). |
| `VITE_BACKEND_URL` | Yes | Backend API base URL (e.g. `https://frankjw-api.vercel.app`). |

The client calls `${VITE_BACKEND_URL}/api/v1/` with credentials. If `VITE_BACKEND_URL` is unset it falls back to `http://localhost:3000` for local development.

## Deployment

The project deploys to [Vercel](https://vercel.com/) as a static site:

- `vercel.json` rewrites every request to the SPA entry point and sets immutable cache headers for hashed assets and images, plus `must-revalidate` for `sw.js`.
- The build step (`pnpm build`) runs `tsc -b` as a type-check gate before bundling.
- Vercel auto-deploys previews for pull requests and production on pushes to `main`.
- CI runs `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` on every PR and on pushes to `main`.

## License

Released under the [GPL-3.0 License](./LICENSE).
