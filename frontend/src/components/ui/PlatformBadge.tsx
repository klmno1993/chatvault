import type { Platform } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const config: Record<Platform, { label: string; bg: string; text: string }> = {
  chatgpt: { label: 'ChatGPT', bg: '#10a37f20', text: '#10a37f' },
  claude:  { label: 'Claude',  bg: '#d97a3820', text: '#c96a28' },
  gemini:  { label: 'Gemini',  bg: '#4285f420', text: '#4285f4' },
  generic: { label: 'Other',   bg: '#94a3b820', text: '#64748b' },
}

export function PlatformBadge({ platform, className }: { platform: Platform; className?: string }) {
  const { label, bg, text } = config[platform]
  return (
    <span
      className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium leading-none', className)}
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  )
}
