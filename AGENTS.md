# AGENTS.md — Frank Joyería UI

## Project overview

- **Stack**: Preact 10 + TypeScript on Vite 7, Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/global.css` via `@theme`), `@preact/signals` for shared state, `wouter` routing, `sonner` toasts, `lucide-preact` icons, PWA via `vite-plugin-pwa`. Package manager: **pnpm**.
- **Architecture**: `src/ui/` holds reusable primitives (Button, IconButton, Badge, Spinner, Modal, Drawer, `useOverlayBehavior`); `src/layout/` holds chrome (Header, Footer, MobileSidebar, UpdateBanner); `src/components/` feature components; `src/pages/` routed screens; `src/data/` static catalog metadata; `src/shared/` signals, API fetching, helpers.
- **Backend** lives in the sibling repo `api/` (Express + libsql). In development the UI talks to `http://localhost:3000` (`VITE_BACKEND_URL` defaults to it when unset). The dev API writes to a **local sqlite file** — a remote Turso database in dev is deliberately ignored (see api config). Never "fix" that behavior.
- **Image storage is server-side**: `src/shared/storage.ts` calls `POST/DELETE /api/v1/uploads` under the admin cookie. The frontend ships **no storage credentials** (`@supabase/supabase-js` was removed); in dev without `SUPABASE_URL` the api returns `503` and the UI surfaces the notice — local QA never touches the production bucket.

## Dev environment tips

- Work from the `app/` directory (repo root for this UI). Backend commands run from the sibling `api/` directory.
- ❌ `ls` hunting → ✅ use glob/grep tools; imports use the `@/` alias (= `src/`).
- Run the dev server with `pnpm devx` (`--host 0.0.0.0`, LAN-shareable) or `pnpm dev`. It proxies nothing — API calls go straight to `localhost:3000`; start `pnpm dev` in `api/` first.
- The commit gate is: `pnpm typecheck && pnpm lint && pnpm build`. Run it before every commit.
- Category data is centralized in `src/data/categories.ts` (single source: `CATEGORIES`, `HIDDEN_CATEGORY`, `slugify`, `findCategory`). `src/shared/utils.ts` re-exports it for backward compatibility — import the data module, not the re-export, for new code.
- Routing is wouter-based: `/products/:category?` resolves slugs with `slugify`; an unknown slug renders lazy `NotFound`. Keep category links slug-generated, never hand-written strings.
- Tailwind pitfalls worth knowing:
  - `Button` exposes `type` and `disabled` as first-class props (Preact's JSX types omit them); a `type="submit"` prop overrides the internal `type="button"` because the spread comes after it.
  - Prefer deterministic arbitrary values over composited width ramps when sizing must be exact (hero logo uses `w-[14rem] sm:w-[16rem] lg:w-[18rem]` + real `width`/`height` attributes).
  - Sticky-under-header elements need `top-16` (header is 4rem).
- Overlays: reuse `Modal`/`Drawer` + `useOverlayBehavior` instead of drafting new overlays; it handles Escape (topmost-safe), scroll-lock counting and focus.
- When touching image flows, keep the contract of `src/shared/storage.ts` (`uploadImage(file) → {url} | {error}`) and let the API own the storage details; the `api/` repo decides providers (currently Supabase behind `utils/storage.ts`).
- Visual QA checklist after layout changes: home hero, category chips/drawer, product gallery modal, dashboard CRUD, login, 404 page.
- Cross-device check via the LAN URL printed at dev start (that's the point of `devx`).

## Testing instructions

- CI plan: `.github/workflows/ci.yml` — installs with pnpm (Node 22), then runs `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` on every PR.
- From `app/`, one-liner: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
- The vitest suite lives in `tests/` (currently `utils.test.ts`, covering the `src/shared/` helpers). Run it with `pnpm test`, or focus one case with `pnpm vitest run -t "<test name>"`. The business-logic suite (products API, auth) lives in the sibling `api/` repo (`pnpm test` there, 28 cases, runs against `:memory:`).
- After moving files or changing imports, re-run `pnpm lint && pnpm typecheck`; both must be green before commit.
- Add tests for fetch/transform logic you change in `tests/` (the existing suite covers exactly those pure helpers) even if nobody asked; keep helpers pure so they remain easy to test.

## PR instructions

- One logical change per commit; message style is Conventional-imperative English, matching the log: `feat(products): ...`, `style(home): ...`, `perf(assets): ...`, `docs: ...`.
- Verify locally (`pnpm lint && pnpm typecheck && pnpm test && pnpm build`) before pushing; CI must pass on the PR.
- Do not push, merge, or force-push without an explicit request from the owner.
- Never commit secrets (`.env` files are local-only) or real customer data.
- Any visual change must keep `DESIGN.md` truthful: update the tokens/patterns sections when you change colors, type, components or motion in the same PR.
