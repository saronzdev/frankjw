import type { HTMLAttributes } from 'preact'
import { cx } from './cx'

type Tone = 'neutral' | 'gold' | 'diamond' | 'danger' | 'dark'

type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'tone'> & {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-2 text-ink-soft',
  gold: 'bg-gold-soft text-gold-deep',
  diamond: 'bg-diamond-soft text-diamond-deep ring-1 ring-diamond/70',
  danger: 'bg-red-100 text-danger',
  dark: 'bg-ink text-white'
}

export function Badge({ tone = 'neutral', class: cls, ...rest }: BadgeProps) {
  return (
    <span
      class={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        tones[tone],
        cls
      )}
      {...rest}
    />
  )
}
