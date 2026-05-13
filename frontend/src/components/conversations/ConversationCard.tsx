import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Conversation } from '@/lib/mock-data'
import { PlatformBadge } from '@/components/ui/PlatformBadge'
import { TagChip } from '@/components/ui/TagChip'
import { cn } from '@/lib/utils'

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = (now.getTime() - d.getTime()) / 1000

  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`
  if (diff < 604800) return `${Math.floor(diff / 86400)} 天前`
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

interface ConversationCardProps {
  conversation: Conversation
  isActive?: boolean
  onClick?: () => void
}

export function ConversationCard({ conversation, isActive, onClick }: ConversationCardProps) {
  const { t } = useTranslation()

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-4 rounded-[var(--radius-md)] transition-all duration-150 group',
        isActive
          ? 'bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)]'
          : 'hover:bg-[var(--bg-subtle)]',
      )}
    >
      {/* Row 1: title + star */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className={cn(
          'text-sm font-semibold leading-snug line-clamp-2 flex-1',
          isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]',
        )}>
          {conversation.title}
        </h3>
        {conversation.isStarred && (
          <Star
            size={13}
            className="flex-shrink-0 mt-0.5 fill-[var(--accent)] text-[var(--accent)]"
          />
        )}
      </div>

      {/* Row 2: summary */}
      {conversation.summary && (
        <p className="text-[13px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-3">
          {conversation.summary}
        </p>
      )}

      {/* Row 3: tags */}
      {conversation.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {conversation.tags.map(tag => (
            <TagChip key={tag.id} tag={tag} />
          ))}
        </div>
      )}

      {/* Row 4: meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <PlatformBadge platform={conversation.platform} />
        {conversation.modelUsed && (
          <span className="text-[11px] text-[var(--text-tertiary)]">{conversation.modelUsed}</span>
        )}
        <span className="text-[11px] text-[var(--text-tertiary)] ml-auto">
          {conversation.messageCount} {t('conversations.messages')} · {formatDate(conversation.updatedAt)}
        </span>
      </div>
    </button>
  )
}
