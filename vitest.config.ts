import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'use-sync-external-store/shim/index.js': 'preact/compat'
    }
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'preact'
  },
  ssr: {
    noExternal: ['wouter', 'use-sync-external-store']
  },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    environment: 'node',
    setupFiles: ['tests/setup.ts'],
    env: {
      VITE_SUPABASE_TRANSFORMS: 'false'
    }
  }
})
