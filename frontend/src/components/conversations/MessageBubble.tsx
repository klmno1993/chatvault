import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronRight, BrainCircuit } from 'lucide-react'
import type { Message } from '@/lib/mock-data'
import { Markdown } from '@/components/ui/Markdown'
import { cn } from '@/lib/utils'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function ThinkingBlock({ content }: { content: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="thinking-block">
      <button
        onClick={() => setOpen(v => !v)}
        className="thinking-toggle"
      >
        <BrainCircuit size={13} />
        <span>已深度思考</span>
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      {open && (
        <div className="thinking-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="user-bubble">
          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    )
  }

  // Assistant — document style
  return (
    <div className="assistant-message group">
      {/* Avatar row */}
      <div className="assistant-avatar-row">
        <div className="assistant-avatar">AI</div>
        <span className="assistant-label">助手</span>
        <span className="message-time">{formatTime(message.createdAt)}</span>
      </div>

      {/* Thinking block */}
      {message.thinkingContent && (
        <div className="pl-9">
          <ThinkingBlock content={message.thinkingContent} />
        </div>
      )}

      {/* Content */}
      <div className="pl-9 relative">
        <Markdown content={message.content} />

        {/* Copy button — appears on hover */}
        <button
          onClick={handleCopy}
          className={cn(
            'message-copy-btn',
            'opacity-0 group-hover:opacity-100 transition-opacity',
          )}
          title="复制消息"
        >
          {copied
            ? <><Check size={12} />已复制</>
            : <><Copy size={12} />复制</>}
        </button>
      </div>
    </div>
  )
}
