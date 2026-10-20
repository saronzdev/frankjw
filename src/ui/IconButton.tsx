import { type JSX } from 'preact'
import { cx } from './cx'

type Size = 'sm' | 'md'

type IconButtonProps = Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size'> & {
  size?: Size
  label: string
}

const sizes: Record<Size, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10'
}

export function IconButton({ size = 'md', label, class: cls, children, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      class={cx(
        'inline-flex select-none items-center justify-center rounded-md text-current',
        'transition-[background-color,color] duration-200 ease-out',
        'hover:bg-surface-2 active:bg-surface-2/70',
        sizes[size],
        cls
      )}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  )
}
