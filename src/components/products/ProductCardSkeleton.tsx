export function ProductCardSkeleton() {
  return (
    <div
      class="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm"
      aria-hidden="true"
    >
      <div class="aspect-square w-full animate-pulse motion-reduce:animate-none bg-surface-2" />
      <div class="flex flex-1 flex-col gap-1.5 p-3">
        <div class="h-3 w-4/5 animate-pulse motion-reduce:animate-none rounded-sm bg-surface-2" />
        <div class="h-3 w-3/5 animate-pulse motion-reduce:animate-none rounded-sm bg-surface-2" />
        <div class="mt-auto flex items-end justify-between gap-2 pt-1">
          <div class="h-4 w-16 animate-pulse motion-reduce:animate-none rounded-sm bg-surface-2" />
        </div>
      </div>
    </div>
  )
}
