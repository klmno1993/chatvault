import type { Tag } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function TagChip({ tag, className }: { tag: Tag; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium', className)}
      style={{ backgroundColor: tag.color + '18', color: tag.color }}
    >
      {tag.name}
    </span>
  )
}
