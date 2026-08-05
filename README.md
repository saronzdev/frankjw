# Frank Joyería

A modern e-commerce web application for jewelry products, built with Preact, Vite, and TypeScript.

� **Live Site**: [frankjoyeriacuba.com](https://frankjoyeriacuba.com)

## Features

- **Product Catalog**: Browse and search jewelry with advanced filtering
- **Admin Dashboard**: Complete product management system
- **Authentication**: Secure login with role-based access control
- **Image Management**: Upload and display product images via Supabase
- **WhatsApp Integration**: Direct product sharing and reservations
- **PWA Support**: Offline-ready with service worker caching
- **Responsive Design**: Mobile-first approach with CSS Modules
- **Performance**: Optimized with Vite and Preact Signals

## Tech Stack

- **Framework**: [Preact](https://preactjs.com/) 10.x
- **Build Tool**: [Vite](https://vitejs.dev/) 7.x
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x
- **Routing**: [Wouter](https://github.com/molefrog/wouter) 3.x
- **State Management**: [@preact/signals](https://preactjs.com/guide/v10/signals/)
- **Backend**: Custom REST API with Axios
- **Storage**: [Turso DB](https://turso.tech), [Supabase Storage](https://supabase.com/)
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/saronzdev/frankjw.git
cd frankjw/app
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_TOKEN="your-supabase-token"
VITE_BACKEND_URL="your-backend-api-url"
```

4. Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm devx` | Start dev server with network access |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |

## Project Structure

``` plaintext
app/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route pages
│   ├── shared/          # Utilities, constants, and API
│   ├── styles/          # CSS Modules
│   ├── app.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static files and PWA assets
└── vite.config.ts       # Vite configuration
```

## Key Features Implementation

### Service Worker & PWA

- Automatic caching for images and assets
- Offline support with `StaleWhileRevalidate` strategy
- Custom cache for Supabase images (400 entries, 30 days)

### Performance Optimizations

- Image lazy loading
- Route-based code splitting potential
- Browser compatibility via `@vitejs/plugin-legacy`
- CDN caching headers configured in `vercel.json`

### Admin Features

- Protected routes with authentication
- Product CRUD operations
- Image upload to Supabase Storage
- Sales tracking

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_TOKEN` | Supabase anon/public key | Yes |
| `VITE_BACKEND_URL` | Backend API endpoint | Yes |

## Browser Support

>Work in older browsers but is recomended use a recently versions of webs browssers for a completely experince  

## License

GPL-3.0

## Author

Developed by [saronzdev](https://github.com/saronzdev)

---

**Note**: This project requires a backend API (not included in this repository) for full functionality.
