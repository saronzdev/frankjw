# Frank Joyería

Proyecto web para la gestión y exhibición de productos de joyería, desarrollado con [Preact](https://preactjs.com/), [Vite](https://vitejs.dev/) y [TypeScript](https://www.typescriptlang.org/).

## [🌎 Enlace a la web](frankjoyeriacuba.com)

## Características

- Catálogo de productos con búsqueda y filtrado
- Panel de administración (Dashboard) para gestión de productos
- Autenticación de usuario y roles (admin)
- Carga y visualización de imágenes de productos
- Compartir productos por WhatsApp y Web Share API
- Diseño responsive y moderno con TailwindCSS
- Integración con Supabase para almacenamiento y base de datos

## Estructura del proyecto

```
app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── shared/
│   └── ...
├── public/
├── tsconfig.json
├── vite.config.ts
└── ...
```

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tuusuario/frank-jw-v2.git
   cd frank-jw-v2/app
   ```

2. Instala las dependencias:
   ```sh
   npm install
   # o
   pnpm install
   ```

3. Crea un archivo `.env` con tus variables de entorno (ver `.env.example`).

4. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   # o
   pnpm dev
   ```

## Scripts útiles

- `dev`: Inicia el servidor de desarrollo
- `build`: Genera la versión de producción
- `preview`: Previsualiza la build de producción

## Licencia

MIT

---

---

## Desarrollado por saronzdev
