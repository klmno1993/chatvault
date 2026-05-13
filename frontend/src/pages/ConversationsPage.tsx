import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, SlidersHorizontal } from 'lucide-react'
import { mockConversations } from '@/lib/mock-data'
import { ConversationCard } from '@/components/conversations/ConversationCard'

export function ConversationsPage() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filtered = mockConversations.filter(c =>
    !c.isArchived &&
    (query === '' || c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.summary?.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
        <div>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">
            {t('nav.allConversations')}
          </h1>
          <p className="text-[13px] text-[var(--text-tertiary)] mt-0.5">
            {filtered.length} 条对话
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-sm)] text-[13px] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors">
          <SlidersHorizontal size={14} strokeWidth={1.75} />
          筛选
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
          />
          <input
            type="text"
            placeholder={t('conversations.search')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-subtle)] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] border-none outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-shadow"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <p className="text-[var(--text-secondary)] text-sm">{t('conversations.empty')}</p>
            <p className="text-[var(--text-tertiary)] text-[13px] mt-1">{t('conversations.emptyHint')}</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {filtered.map(conv => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                isActive={activeId === conv.id}
                onClick={() => setActiveId(conv.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
