import '@/shared/polyfills.ts'
import { render } from 'preact'
import { App } from './app.tsx'

render(<App />, document.getElementById('app')!)

// Register a lightweight service worker for runtime image caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // no-op: SW is optional
    })
  })
}
