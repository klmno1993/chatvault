import { useTranslation } from 'react-i18next'
import { SlidersHorizontal } from 'lucide-react'
import { mockConversations } from '@/lib/mock-data'
import { ConversationListLayout } from '@/components/conversations/ConversationListLayout'

export function ConversationsPage() {
  const { t } = useTranslation()
  const conversations = mockConversations.filter(c => !c.isArchived)

  return (
    <ConversationListLayout
      title={t('nav.allConversations')}
      conversations={conversations}
      headerAction={
        <button className="p-2 rounded-[8px] text-[var(--text-tertiary)] hover:bg-[var(--bg-sunken)] transition-colors">
          <SlidersHorizontal size={15} strokeWidth={1.75} />
        </button>
      }
    />
  )
}
