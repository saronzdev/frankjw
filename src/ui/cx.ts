/**
 * Minimal class name joiner, no runtime dependencies.
 * Accepts the loose `class` types Preact allows (strings, signals, undefined).
 */
export function cx(...parts: unknown[]): string {
  return parts.filter((p): p is string => typeof p === 'string').join(' ')
}
