import { useParams } from 'react-router-dom'
import { mockConversations, mockTags } from '@/lib/mock-data'
import { ConversationListLayout } from '@/components/conversations/ConversationListLayout'

export function TagPage() {
  const { id } = useParams<{ id: string }>()
  const tag = mockTags.find(t => t.id === id)
  const conversations = mockConversations.filter(
    c => !c.isArchived && c.tags.some(t => t.id === id),
  )

  if (!tag) {
    return (
      <div className="flex items-center justify-center h-full text-[var(--text-tertiary)] text-sm">
        找不到该标签
      </div>
    )
  }

  return (
    <ConversationListLayout
      title={tag.name}
      conversations={conversations}
      emptyText={`没有标记为「${tag.name}」的对话`}
      emptyHint="在对话详情页可以添加标签"
    />
  )
}
