import { type JSX } from 'preact'
import { cx } from './cx'

type Variant = 'primary' | 'outline' | 'gold' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size' | 'type' | 'disabled'> & {
  variant?: Variant
  size?: Size
  block?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white shadow-sm hover:bg-stone-700 hover:shadow-md',
  outline: 'border border-line bg-surface text-ink hover:border-ink/30 hover:bg-surface-2',
  gold: 'bg-gold text-white shadow-sm hover:bg-gold-deep hover:shadow-md',
  ghost: 'text-ink hover:bg-surface-2'
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[0.95rem]',
  lg: 'h-12 px-8 text-base'
}

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-md font-medium tracking-[0.02em] ' +
  'transition-[background-color,border-color,box-shadow,color] duration-200 ease-out ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ' +
  'disabled:pointer-events-none disabled:opacity-50'

export function Button({ variant = 'primary', size = 'md', block, class: cls, ...rest }: ButtonProps) {
  const classes = cx(base, variants[variant], sizes[size], block && 'w-full', cls)

  if (rest.href !== undefined) {
    return <a class={classes} {...(rest as JSX.HTMLAttributes<HTMLAnchorElement>)} />
  }

  return <button type="button" class={classes} {...rest} />
}
