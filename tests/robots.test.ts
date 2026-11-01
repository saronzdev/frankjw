import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('robots.txt', () => {
  it('bloquea las rutas privadas, el shell y publica el sitemap', async () => {
    const robots = await readFile(join(process.cwd(), 'public', 'robots.txt'), 'utf8')
    const lines = robots
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    expect(lines).toContain('Disallow: /dashboard')
    expect(lines).toContain('Disallow: /login')
    expect(lines).toContain('Disallow: /shell')
    expect(lines).toContain('Sitemap: https://frankjoyeriacuba.com/sitemap.xml')
    expect(lines.some((line) => line.toLowerCase().startsWith('host:'))).toBe(false)
  })
})
