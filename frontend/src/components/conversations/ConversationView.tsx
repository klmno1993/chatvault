import { useEffect, useRef } from 'react'
import { ArrowLeft, Star, Tag, Download, MoreHorizontal } from 'lucide-react'
import type { Conversation, Message } from '@/lib/mock-data'
import { MessageBubble } from './MessageBubble'
import { PlatformBadge } from '@/components/ui/PlatformBadge'
import { TagChip } from '@/components/ui/TagChip'

interface ConversationViewProps {
  conversation: Conversation
  messages: Message[]
  onBack?: () => void  // mobile only
}

export function ConversationView({ conversation, messages, onBack }: ConversationViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 md:px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-start gap-3">
          {/* Back button — mobile only */}
          {onBack && (
            <button
              onClick={onBack}
              className="mt-0.5 p-1.5 -ml-1.5 rounded-[8px] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors flex-shrink-0"
            >
              <ArrowLeft size={16} />
            </button>
          )}

          {/* Title area */}
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-[var(--text-primary)] text-[15px] leading-snug">
              {conversation.title}
            </h2>
            <div className="flex items-center flex-wrap gap-2 mt-1.5">
              <PlatformBadge platform={conversation.platform} />
              {conversation.modelUsed && (
                <span className="text-[11px] text-[var(--text-tertiary)]">
                  {conversation.modelUsed}
                </span>
              )}
              <span className="text-[11px] text-[var(--text-tertiary)]">
                {messages.length} 条消息
              </span>
            </div>
            {conversation.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {conversation.tags.map(tag => (
                  <TagChip key={tag.id} tag={tag} />
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className={[
              'p-2 rounded-[8px] transition-colors',
              conversation.isStarred
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]',
            ].join(' ')}>
              <Star size={15} fill={conversation.isStarred ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 rounded-[8px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors">
              <Tag size={15} />
            </button>
            <button className="p-2 rounded-[8px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors">
              <Download size={15} />
            </button>
            <button className="p-2 rounded-[8px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors">
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
