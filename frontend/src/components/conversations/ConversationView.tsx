import { useEffect, useRef } from 'react'
import { ArrowLeft, Star, Tag, Download, MoreHorizontal } from 'lucide-react'
import type { Conversation, Message } from '@/lib/mock-data'
import { MessageBubble } from './MessageBubble'
import { PlatformBadge } from '@/components/ui/PlatformBadge'
import { TagChip } from '@/components/ui/TagChip'

interface ConversationViewProps {
  conversation: Conversation
  messages: Message[]
  onBack?: () => void
}

const iconBtn = 'p-1.5 rounded-[7px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-sunken)] transition-colors'

export function ConversationView({ conversation, messages, onBack }: ConversationViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* Header — clean, content-first */}
      <div className="flex-shrink-0 px-4 md:px-8 pt-5 pb-4 border-b border-[var(--line-hairline)]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-2">
            {onBack && (
              <button onClick={onBack} className={`mt-1 ${iconBtn} -ml-1`}>
                <ArrowLeft size={15} />
              </button>
            )}

            <div className="flex-1 min-w-0">
              {/* Title — commanding */}
              <h1 className="text-[18px] font-semibold leading-snug tracking-tight text-[var(--text-primary)] mb-2">
                {conversation.title}
              </h1>

              {/* Meta row — all tertiary, small */}
              <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1">
                <PlatformBadge platform={conversation.platform} />
                {conversation.modelUsed && (
                  <span className="text-[12px] text-[var(--text-tertiary)]">{conversation.modelUsed}</span>
                )}
                <span className="text-[var(--text-tertiary)] text-[12px]">·</span>
                <span className="text-[12px] text-[var(--text-tertiary)]">{messages.length} 条消息</span>
                {conversation.tags.length > 0 && (
                  <>
                    <span className="text-[var(--text-tertiary)] text-[12px]">·</span>
                    <div className="flex flex-wrap gap-1">
                      {conversation.tags.map(tag => (
                        <TagChip key={tag.id} tag={tag} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions — subtle, line icons */}
            <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
              <button className={conversation.isStarred
                ? 'p-1.5 rounded-[7px] text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors'
                : iconBtn}>
                <Star size={15} fill={conversation.isStarred ? 'currentColor' : 'none'} strokeWidth={1.75} />
              </button>
              <button className={iconBtn}><Tag size={15} strokeWidth={1.75} /></button>
              <button className={iconBtn}><Download size={15} strokeWidth={1.75} /></button>
              <button className={iconBtn}><MoreHorizontal size={15} strokeWidth={1.75} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages — generous space, max readable width */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-10">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
