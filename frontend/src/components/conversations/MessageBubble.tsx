import type { Message } from '@/lib/mock-data'
import { Markdown } from '@/components/ui/Markdown'
import { cn } from '@/lib/utils'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {/* Avatar — assistant only */}
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[11px] font-semibold mt-0.5"
          style={{ background: 'var(--accent)' }}
        >
          AI
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[85%] md:max-w-[75%] rounded-[var(--radius-md)] px-4 py-3',
          isUser
            ? 'bg-[var(--accent)] text-white rounded-tr-[4px]'
            : 'bg-[var(--bg-subtle)] rounded-tl-[4px]',
        )}
      >
        {isUser ? (
          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <Markdown content={message.content} />
        )}

        <p className={cn(
          'text-[11px] mt-2 text-right',
          isUser ? 'text-white/60' : 'text-[var(--text-tertiary)]',
        )}>
          {formatTime(message.createdAt)}
        </p>
      </div>

      {/* User avatar spacer */}
      {isUser && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-semibold mt-0.5 bg-[var(--bg-muted)] text-[var(--text-secondary)]"
        >
          我
        </div>
      )}
    </div>
  )
}
