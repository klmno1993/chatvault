import { useTranslation } from 'react-i18next'
import { mockConversations } from '@/lib/mock-data'
import { ConversationListLayout } from '@/components/conversations/ConversationListLayout'

export function StarredPage() {
  const { t } = useTranslation()
  const conversations = mockConversations.filter(c => c.isStarred && !c.isArchived)

  return (
    <ConversationListLayout
      title={t('nav.starred')}
      conversations={conversations}
      emptyText="还没有加星标的对话"
      emptyHint="在对话详情页点击星形图标即可添加"
    />
  )
}
