import { useTranslation } from 'react-i18next'
import { mockConversations } from '@/lib/mock-data'
import { ConversationListLayout } from '@/components/conversations/ConversationListLayout'

export function ArchivedPage() {
  const { t } = useTranslation()
  const conversations = mockConversations.filter(c => c.isArchived)

  return (
    <ConversationListLayout
      title={t('nav.archived')}
      conversations={conversations}
      emptyText="没有已归档的对话"
      emptyHint="归档的对话会在这里显示"
    />
  )
}
