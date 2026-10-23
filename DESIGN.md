# DESIGN.md — Frank Joyería UI

A warm, editorial design system for a handcrafted jewelry store. One accent color (soft gold) on calm warm grays; serif display type carries the brand, photography carries the product. Built as Tailwind CSS v4 theme tokens (`@theme` in `src/global.css`) — every value below maps 1:1 to a token or utility class.

## Colors

| Token | HEX | Usage |
|---|---|---|
| **Background** (`bg`) | `#fafaf8` | Page background — warm off-white, never pure white |
| **Surface** (`surface`) | `#ffffff` | Cards, modals, drawers, table rows |
| **Surface muted** (`surface-2`) | `#f4f4f0` | Hover fills, secondary blocks, skeletons |
| **Text primary** (`ink`) | `#1c1917` | Headings, primary text, solid buttons, header bar |
| **Text secondary** (`ink-soft`) | `#57534e` | Paragraphs, icons, longer descriptions |
| **Text muted** (`ink-muted`) | `#78716c` | Meta info, captions, placeholders, rates |
| **Border** (`line`) | `#e7e5e4` | Card borders, dividers, input borders |
| **Accent** (`gold`) | `#c9a24b` | Focus rings, small decorative accents, active states |
| **Accent strong** (`gold-deep`) | `#a8842e` | Links/CTAs that text-carry the accent, hover text |
| **Accent tint** (`gold-soft`) | `#f3ead2` | Accent backgrounds at low opacity (`bg-gold-soft/40`) |
| **Danger** (`danger`) | `#b91c1c` | Semantic red only: sold-out, savings, destructive, errors |

Usage guidance

- Gold is an **accent, never a surface**: use at reduced opacities or on small elements. No large solid gold fills, no gold gradients, no gold body text.
- Red is **semantic only** (sold-out badge, discount savings, logout, error card). Never decorative.
- Over photos, guarantee text contrast with `bg-gradient-to-t from-black/70 via-black/25 to-transparent`.
- Header/overlays use translucent surfaces: `bg-bg/90 backdrop-blur-md` (header), `bg-black/50` (overlay scrim).
- Do not introduce colors outside this table. Tailwind's `red-100` is allowed only inside the `danger` tone and error icon fills.

## Typography

- **Display**: Playfair Display (`font-display`, serif) — brand name, section titles, hero figures, product prices, modal titles. Signature pattern: `font-display text-3xl md:text-4xl font-semibold uppercase tracking-[0.05em] text-ink`. On photos: same pattern in `text-white`.
- **Body/UI**: Inter (`font-sans`) — everything else. Paragraphs: `text-sm md:text-[0.95rem] leading-relaxed text-ink-muted`.
- **Eyebrow/label**: `text-xs font-medium uppercase tracking-[0.14em] text-ink-muted`.
- Uppercase + wide tracking belongs on display headings and eyebrows only. Never on paragraphs or buttons.
- Content is Spanish; capitalize with accents preserved (normalize helper). English-looking ALL CAPS is reserved for the serif voice.

## Spacing

- Base unit 0.25rem (Tailwind scale).
- Page container: `mx-auto max-w-7xl px-4` (full area). Landing carousel focuses inside `max-w-6xl`.
- Section rhythm: `py-8 md:py-10`, sibling gaps `gap-6`. Inline chips/lists: `gap-2`, micro gaps `gap-1.5`.
- Sticky header is fixed to `4rem` (`--header-h`); in-page sticky toolbars sit at `top-16` with `bg-bg/95 backdrop-blur-sm`.
- Radii: `rounded-md` (buttons/inputs, 10px), `rounded-lg` (cards/panels/sections, 16px), `rounded-full` reserved for pills, chips, badges, dots.

## Components

- **Buttons** (`src/ui/Button.tsx`) — variants: `primary` (solid ink bg `#1c1917`, white text), `gold` (solid gold, conversion CTAs like Reserve), `outline` (1px `line`, hover border gold), `ghost`. Sizes sm/md/lg (~36/40/44px height), `rounded-md`, `font-medium`, prop `block` for full-width. Renders an `<a>` when `href` is set. A `type="submit"` prop must override the internal `type="button"`; `disabled` dims to 50%.
- **Icon buttons** (`IconButton`) — square, icon-only, `label` prop mandatory (aria-label). Sizes xs/sm/md.
- **Product cards** — white surface on `bg`, 0 border default, `rounded-lg`, image `aspect-4/5 object-cover`; badges anchored absolute `top-2 right-2`; name/title `text-ink`, meta `text-ink-muted`; price in `font-display`. Hover: subtle lift/shadow, image scale kept minimal.
- **Category header** (`components/products/CategoryHeader.tsx`) — split card (`rounded-lg border border-line bg-surface`): title/description column on `surface` (67%, `justify-center`, title `md:text-2xl`, description full-text `max-w-2xl`, no clamping) and the photo complete in a 33% column flush to the right edge (photo renders at native 16:9, no crop); `md:min-h-56` — the card grows if the copy needs more lines (`md:py-6`). Mobile stacks: photo band on top (`h-32 sm:h-40` `object-cover`), text below.
- **Badges** (`Badge`) — pill `rounded-full px-2.5 py-0.5 text-xs font-semibold`: `neutral` (`bg-surface-2 text-ink-soft`), `gold` (`bg-gold-soft text-gold-deep`), `danger` (`bg-red-100 text-danger` — sold out, savings), `dark` (`bg-ink text-white`).
- **Inputs** — `h-11 rounded-md border border-line bg-surface px-3 text-sm`, placeholder `text-ink-muted`; select/radio stacks gap-1.5 with labels `text-sm font-medium text-ink`. Focus state on field inputs is a seamless flip: outline suppressed (`outline-none`), border turns gold and a flush 2px gold/35 ring hugs the border (no offset gap). The global 2px offset gold outline keeps applying to buttons, links and other focusables.
- **Tooltip-less meta chips** — small reference chips like product ID use `Badge neutral` with a 1px border on top.
- **Modal** (`Modal`) — scrim `bg-black/55 backdrop-blur-[2px]`; panel `bg-surface rounded-lg shadow-2xl animate-panel-in`, sizes `sm 24rem / md 32rem / lg 40rem`, `max-h-[calc(100dvh-4rem)]`, header with `font-display text-lg` title + icon close; body scrollable; Escape/backdrop close.
- **Drawer** (`Drawer`) — same scrim; left panel slides in (`animate-drawer-left`), full-height for mobile menus and filters.
- **Update banner** (`layout/UpdateBanner.tsx`) — one-line strip under the header: `bg-gold-soft/40` + `border-b border-line/70`, `Sparkles` 14px in gold, short sentence, underlined "Ver cambios" link (`text-gold-deep`, decoration gold) and an `X` dismiss (persisted in localStorage). Opens a `Modal md` with the changelog: gold check-circles (12px path in `bg-gold-soft/70` circle), heading `font-semibold text-ink` + detail `text-sm text-ink-muted`.
- **Footer link arrows** (`layout/Footer.tsx`) — every clickable footer option carries a small always-visible arrow (`ArrowRight` 13px for internal links, `ArrowUpRight` 13px for tel/mailto/close links, 11px in the credit line) in `text-ink-muted`; on hover the arrow shifts 0.5px toward its direction and turns `text-gold-deep`. Social icons keep their own hover affordance.
- **Empty/error/loading states** — centered `max-w-md` stacks: error = `CircleX` 26px in a `red-100` circle + retry CTA; loading = `animate-pulse` skeletons on `surface-2`; empty = short sober copy + CTA, no illustration spam.

## Elevation

- Level 0: flat surfaces (cards rest on background with borders only).
- `shadow-sm`: sticky header after scroll, hover on interactive cards.
- `shadow-md`: in-page sticky toolbars, large category banners.
- `shadow-2xl`: modals and drawers only.
- Glow: 2px gold `:focus-visible` outline, offset 2px, globally enforced in `global.css`.

## Motion

- `animate-overlay-in` — scrim fade, 0.2s ease-out.
- `animate-panel-in` — modal rise: fade + translateY(16px) scale(0.97), 0.25s `--ease-out-quart`.
- `animate-drawer-left` — drawer slide-in 0.3s (explosive-free: 1 step, no bounce).
- Hover transitions: `transition-colors` 150–200ms on borders/text only. No decorative transforms.
- `prefers-reduced-motion` disables all animation globally (already implemented). The carousel also skips autoplay entirely for those users.
- Image preloading: `VITE_SUPABASE_TRANSFORMS` gates Supabase transformations (`?width=`/`?quality=`); disabled by default because they require Supabase Pro.

## Guidelines

Do

- Build exclusively with Tailwind v4 utilities + the `@theme` tokens above and the primitives in `src/ui/`.
- Use `lucide-preact` icons only (the remaining inline SVGs are social logos `fb/ig/mail/ws/no-image` — keep them in place).
- Mark decorative icons `aria-hidden="true"`; icon-only buttons carry an aria `label`.
- Keep the serif for one-line statements; let photography and whitespace do the selling.
- Respect the existing accessibility patterns: gold focus-visible, dialog roles, aria-current on nav, keyboard-operable carousel.

Don't

- No CSS Modules or new CSS files — Tailwind utilities only.
- No colors outside the table; no red/orange/purple accents of any kind.
- No gradients on gold; flat golds only.
- No new inline SVGs or third-party icon sets.
- No emojis in UI copy. Spanish, direct professional tone.
- No JS media queries — use responsive utility prefixes (`sm: md: lg:`).
