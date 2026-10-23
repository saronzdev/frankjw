import { type JSX } from 'preact'
import { cx } from './cx'

type Tone = 'neutral' | 'gold' | 'danger' | 'dark'

type BadgeProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'tone'> & {
  tone?: Tone
}

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-2 text-ink-soft',
  gold: 'bg-gold-soft text-gold-deep',
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
