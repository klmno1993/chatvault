export type Platform = 'chatgpt' | 'claude' | 'gemini' | 'generic'

export interface Tag {
  id: string
  name: string
  color: string
}

export interface Conversation {
  id: string
  title: string
  platform: Platform
  messageCount: number
  modelUsed?: string
  isStarred: boolean
  isArchived: boolean
  tags: Tag[]
  summary?: string
  sourceCreatedAt: string
  updatedAt: string
}

export const mockTags: Tag[] = [
  { id: '1', name: '技术', color: '#4f46e5' },
  { id: '2', name: '写作', color: '#0891b2' },
  { id: '3', name: '学习', color: '#059669' },
  { id: '4', name: '工作', color: '#d97706' },
  { id: '5', name: '创意', color: '#db2777' },
]

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: '用 Rust 实现一个高性能 HTTP 服务器',
    platform: 'chatgpt',
    messageCount: 24,
    modelUsed: 'GPT-4o',
    isStarred: true,
    isArchived: false,
    tags: [mockTags[0]],
    summary: '探讨了 Tokio 异步运行时、连接池设计和零拷贝 I/O 优化方案，最终实现了支持 10 万 QPS 的服务器原型。',
    sourceCreatedAt: '2025-05-10T14:23:00Z',
    updatedAt: '2025-05-10T16:45:00Z',
  },
  {
    id: '2',
    title: '为什么现代设计越来越趋向极简主义',
    platform: 'claude',
    messageCount: 12,
    modelUsed: 'Claude Sonnet 4',
    isStarred: true,
    isArchived: false,
    tags: [mockTags[1], mockTags[4]],
    summary: '从包豪斯到今天的 Apple 设计语言，分析了极简主义背后的文化与商业逻辑。',
    sourceCreatedAt: '2025-05-09T09:15:00Z',
    updatedAt: '2025-05-09T10:30:00Z',
  },
  {
    id: '3',
    title: 'PostgreSQL 查询优化：从 30s 到 200ms',
    platform: 'chatgpt',
    messageCount: 31,
    modelUsed: 'GPT-4o',
    isStarred: false,
    isArchived: false,
    tags: [mockTags[0], mockTags[3]],
    summary: '分析了慢查询的原因，通过索引优化、查询重写和分区表将一个复杂报表查询提速 150 倍。',
    sourceCreatedAt: '2025-05-08T20:00:00Z',
    updatedAt: '2025-05-08T21:30:00Z',
  },
  {
    id: '4',
    title: '如何写出让人读下去的技术文章',
    platform: 'claude',
    messageCount: 18,
    modelUsed: 'Claude Opus 4',
    isStarred: false,
    isArchived: false,
    tags: [mockTags[1], mockTags[2]],
    summary: '讨论了技术写作中的叙事结构、代码示例选取原则，以及如何在准确性和可读性之间取得平衡。',
    sourceCreatedAt: '2025-05-07T11:00:00Z',
    updatedAt: '2025-05-07T12:15:00Z',
  },
  {
    id: '5',
    title: 'React Server Components 深度解析',
    platform: 'gemini',
    messageCount: 22,
    modelUsed: 'Gemini 2.0 Pro',
    isStarred: false,
    isArchived: false,
    tags: [mockTags[0], mockTags[2]],
    summary: '梳理了 RSC 的渲染模型、与传统 SSR 的区别，以及在 Next.js App Router 中的实践。',
    sourceCreatedAt: '2025-05-06T15:30:00Z',
    updatedAt: '2025-05-06T17:00:00Z',
  },
  {
    id: '6',
    title: '产品经理如何和工程师有效沟通',
    platform: 'chatgpt',
    messageCount: 15,
    modelUsed: 'GPT-4o',
    isStarred: false,
    isArchived: false,
    tags: [mockTags[3]],
    summary: '从双方视角分析了常见的沟通摩擦点，提出了需求描述模板和技术评估框架。',
    sourceCreatedAt: '2025-05-05T10:00:00Z',
    updatedAt: '2025-05-05T11:00:00Z',
  },
  {
    id: '7',
    title: '用 Python 分析三年的日记数据',
    platform: 'claude',
    messageCount: 29,
    modelUsed: 'Claude Sonnet 4',
    isStarred: true,
    isArchived: false,
    tags: [mockTags[0], mockTags[4]],
    summary: '使用 pandas 和 jieba 对三年日记做了词频分析、情感分析和主题聚类，发现了一些有趣的规律。',
    sourceCreatedAt: '2025-05-03T19:00:00Z',
    updatedAt: '2025-05-03T21:30:00Z',
  },
  {
    id: '8',
    title: '建筑摄影的构图原则',
    platform: 'gemini',
    messageCount: 10,
    modelUsed: 'Gemini 2.0 Flash',
    isStarred: false,
    isArchived: false,
    tags: [mockTags[4]],
    summary: '讨论了透视线、光影对比和几何抽象在建筑摄影中的运用，附带案例分析。',
    sourceCreatedAt: '2025-05-01T14:00:00Z',
    updatedAt: '2025-05-01T14:45:00Z',
  },
]
