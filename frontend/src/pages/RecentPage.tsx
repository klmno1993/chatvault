import { useTranslation } from 'react-i18next'
import { mockConversations } from '@/lib/mock-data'
import { ConversationListLayout } from '@/components/conversations/ConversationListLayout'

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function RecentPage() {
  const { t } = useTranslation()
  const cutoff = Date.now() - SEVEN_DAYS_MS
  const conversations = mockConversations
    .filter(c => !c.isArchived && new Date(c.updatedAt).getTime() > cutoff)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  return (
    <ConversationListLayout
      title={t('nav.recent')}
      subtitle="最近 7 天"
      conversations={conversations}
      emptyText="最近 7 天没有对话"
      emptyHint="去和 AI 聊聊吧"
    />
  )
}
