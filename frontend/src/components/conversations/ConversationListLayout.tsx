import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, MessageSquarePlus } from 'lucide-react'
import type { Conversation } from '@/lib/mock-data'
import { mockMessages } from '@/lib/mock-data'
import { ConversationCard } from './ConversationCard'
import { ConversationView } from './ConversationView'
import { cn } from '@/lib/utils'

interface ConversationListLayoutProps {
  title: string
  subtitle?: string
  conversations: Conversation[]
  emptyText?: string
  emptyHint?: string
  headerAction?: React.ReactNode
}

export function ConversationListLayout({
  title,
  subtitle,
  conversations,
  emptyText,
  emptyHint,
  headerAction,
}: ConversationListLayoutProps) {
  const { t } = useTranslation()
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [query, setQuery] = useState('')

  const filtered = conversations.filter(c =>
    query === '' ||
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.summary?.toLowerCase().includes(query.toLowerCase()),
  )

  const messages = activeConversation
    ? mockMessages.filter(m => m.conversationId === activeConversation.id)
    : []

  const showDetail = activeConversation !== null

  return (
    <div className="flex h-full overflow-hidden">
      {/* List panel */}
      <div className={cn(
        'flex flex-col border-r border-[var(--line-hairline)] bg-[var(--bg-surface)]',
        'w-full md:w-[320px] lg:w-[360px] flex-shrink-0',
        showDetail ? 'hidden md:flex' : 'flex',
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--line-hairline)]">
          <div>
            <h1 className="text-[15px] font-semibold text-[var(--text-primary)]">{title}</h1>
            <p className="text-[12px] text-[var(--text-tertiary)] mt-0.5">
              {subtitle ?? `${filtered.length} 条对话`}
            </p>
          </div>
          {headerAction}
        </div>

        {/* Search */}
        <div className="px-3 py-2.5">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder={t('conversations.search')}
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-[8px] bg-[var(--bg-sunken)] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-shadow"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <MessageSquarePlus size={28} className="text-[var(--text-tertiary)] mb-3" strokeWidth={1.5} />
              <p className="text-[var(--text-secondary)] text-sm font-medium">
                {emptyText ?? t('conversations.empty')}
              </p>
              <p className="text-[var(--text-tertiary)] text-[13px] mt-1">
                {emptyHint ?? t('conversations.emptyHint')}
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {filtered.map(conv => (
                <ConversationCard
                  key={conv.id}
                  conversation={conv}
                  isActive={activeConversation?.id === conv.id}
                  onClick={() => setActiveConversation(conv)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      <div className={cn(
        'flex-1 min-w-0 overflow-hidden bg-[var(--bg-surface)]',
        showDetail ? 'flex flex-col' : 'hidden md:flex md:flex-col',
      )}>
        {activeConversation ? (
          <ConversationView
            conversation={activeConversation}
            messages={messages}
            onBack={() => setActiveConversation(null)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div
              className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center mb-4"
              style={{ background: 'var(--accent-soft)' }}
            >
              <MessageSquarePlus size={24} style={{ color: 'var(--accent)' }} strokeWidth={1.5} />
            </div>
            <p className="text-[var(--text-secondary)] font-medium">选择一条对话开始阅读</p>
            <p className="text-[var(--text-tertiary)] text-[13px] mt-1">或者从左侧搜索你想找的内容</p>
          </div>
        )}
      </div>
    </div>
  )
}
