import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import preact from '@preact/preset-vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    preact(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
