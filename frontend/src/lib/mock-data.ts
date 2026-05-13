export type Platform = 'chatgpt' | 'claude' | 'gemini' | 'generic'
export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  conversationId: string
  role: MessageRole
  content: string
  thinkingContent?: string
  createdAt: string
}

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
    sourceCreatedAt: '2026-05-12T14:23:00Z',
    updatedAt: '2026-05-12T16:45:00Z',
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
    sourceCreatedAt: '2026-05-11T09:15:00Z',
    updatedAt: '2026-05-11T10:30:00Z',
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
    sourceCreatedAt: '2026-05-10T20:00:00Z',
    updatedAt: '2026-05-10T21:30:00Z',
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
    sourceCreatedAt: '2026-05-09T11:00:00Z',
    updatedAt: '2026-05-09T12:15:00Z',
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
    sourceCreatedAt: '2026-05-08T15:30:00Z',
    updatedAt: '2026-05-08T17:00:00Z',
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
    sourceCreatedAt: '2026-05-07T10:00:00Z',
    updatedAt: '2026-05-07T11:00:00Z',
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
    sourceCreatedAt: '2026-05-06T19:00:00Z',
    updatedAt: '2026-05-06T21:30:00Z',
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
    sourceCreatedAt: '2026-05-05T14:00:00Z',
    updatedAt: '2026-05-05T14:45:00Z',
  },
  {
    id: '9',
    title: 'TypeScript 泛型实战：工具类型的设计哲学',
    platform: 'claude',
    messageCount: 20,
    modelUsed: 'Claude Sonnet 4',
    isStarred: false,
    isArchived: false,
    tags: [mockTags[0], mockTags[2]],
    summary: '深入讲解了 Conditional Types、Mapped Types 和 Template Literal Types 的组合用法，构建了一套实用工具类型库。',
    sourceCreatedAt: '2026-05-03T10:00:00Z',
    updatedAt: '2026-05-03T11:30:00Z',
  },
  {
    id: '10',
    title: '写一首关于深夜编程的诗',
    platform: 'claude',
    messageCount: 8,
    modelUsed: 'Claude Opus 4',
    isStarred: true,
    isArchived: false,
    tags: [mockTags[1], mockTags[4]],
    summary: '探索了用诗歌语言描述技术工作的可能性，最终产出了一首兼具意象美和技术感的现代诗。',
    sourceCreatedAt: '2026-04-28T23:00:00Z',
    updatedAt: '2026-04-28T23:45:00Z',
  },
  // Archived conversations
  {
    id: '11',
    title: 'Vue 3 vs React 18 选型分析',
    platform: 'chatgpt',
    messageCount: 19,
    modelUsed: 'GPT-4',
    isStarred: false,
    isArchived: true,
    tags: [mockTags[0]],
    summary: '对比了两个框架在生态、性能、开发体验上的差异，最终选择了 React 方案。',
    sourceCreatedAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T11:30:00Z',
  },
  {
    id: '12',
    title: '学习日语：N3 语法难点整理',
    platform: 'gemini',
    messageCount: 35,
    modelUsed: 'Gemini 1.5 Pro',
    isStarred: false,
    isArchived: true,
    tags: [mockTags[2]],
    summary: '整理了 N3 考试中的高频语法点，特别是条件句和授受动词的用法区别。',
    sourceCreatedAt: '2026-02-20T14:00:00Z',
    updatedAt: '2026-02-20T16:00:00Z',
  },
  {
    id: '13',
    title: '2025 年度工作总结框架',
    platform: 'chatgpt',
    messageCount: 14,
    modelUsed: 'GPT-4o',
    isStarred: false,
    isArchived: true,
    tags: [mockTags[3], mockTags[1]],
    summary: '帮助梳理了全年工作亮点、不足和来年目标，形成了一份有说服力的述职报告框架。',
    sourceCreatedAt: '2025-12-28T09:00:00Z',
    updatedAt: '2025-12-28T10:00:00Z',
  },
]

// Mock messages for conversation id='1' (Rust HTTP server)
export const mockMessages: Message[] = [
  {
    id: 'm1',
    conversationId: '1',
    role: 'user',
    content: '我想用 Rust 写一个高性能 HTTP 服务器，目标是支持 10 万 QPS。应该从哪里开始？用什么异步运行时比较好？',
    createdAt: '2026-05-12T14:23:00Z',
  },
  {
    id: 'm2',
    conversationId: '1',
    role: 'assistant',
    thinkingContent: `Let me think through this carefully. The user wants to build a high-performance HTTP server in Rust targeting 100k QPS.

Key considerations:
1. Async runtime choice: Tokio is the clear winner here - it's the most mature, battle-tested, and has the best ecosystem
2. HTTP framework: axum (Tokio-native) or actix-web (uses its own executor but very fast)
3. The user is asking where to start, so I should give a structured approach
4. 100k QPS is achievable with Rust - I should validate this goal and give concrete guidance

I'll recommend Tokio + axum as the stack, explain why, give a minimal code example, and outline the key performance considerations. I should also ask about their use case (static responses vs DB queries) since that significantly affects the optimization strategy.`,
    content: `好问题！在 Rust 生态里做高性能 HTTP 服务，**Tokio** 是目前最成熟的异步运行时选择。下面是一个系统性的入门路径：

## 技术选型

| 层级 | 推荐选择 | 备注 |
|------|---------|------|
| 异步运行时 | \`tokio\` | 生产级，被 AWS、Discord 大规模使用 |
| HTTP 框架 | \`axum\` | Tokio 官方出品，ergonomic API |
| 序列化 | \`serde\` + \`serde_json\` | 标准选择 |
| 连接池 | \`deadpool\` 或 \`bb8\` | 数据库连接复用 |

## 最简单的起步代码

\`\`\`rust
use axum::{routing::get, Router};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(handler));

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("Listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> &'static str {
    "Hello, World!"
}
\`\`\`

## 要达到 10 万 QPS 需要关注的核心点

1. **零拷贝 I/O**：使用 \`bytes::Bytes\` 避免不必要的内存拷贝
2. **连接复用**：HTTP/1.1 keep-alive 和 HTTP/2 多路复用
3. **线程模型**：Tokio 的 work-stealing 调度器默认已经是多线程的，通常不需要额外配置
4. **避免阻塞**：所有 I/O 操作必须是 \`async\` 的，绝对不能在 async 上下文里调用同步阻塞 API

你目前的应用场景是什么？纯静态响应、代理、还是有数据库查询？这会影响具体的优化方向。`,
    createdAt: '2026-05-12T14:24:30Z',
  },
  {
    id: 'm3',
    conversationId: '1',
    role: 'user',
    content: '主要是 API 服务，有数据库查询（PostgreSQL）。我担心数据库连接池的配置，应该设多大？',
    createdAt: '2026-05-12T14:31:00Z',
  },
  {
    id: 'm4',
    conversationId: '1',
    role: 'assistant',
    content: `连接池大小是个经常被误解的参数——**更大不等于更快**，实际上设置过大反而会拖慢性能。

## 连接池大小的理论依据

PostgreSQL 官方有一个著名的经验公式：

$$\\text{pool\\_size} = (\\text{core\\_count} \\times 2) + \\text{effective\\_spindle\\_count}$$

对于现代 SSD 服务器，\`effective_spindle_count\` 通常取 1，所以一台 8 核机器的推荐连接池大小约为 **17**。

## 实际配置示例（使用 sqlx）

\`\`\`rust
use sqlx::postgres::PgPoolOptions;

let pool = PgPoolOptions::new()
    .max_connections(20)          // 最大连接数
    .min_connections(5)           // 保持最小空闲连接
    .acquire_timeout(Duration::from_secs(3))   // 获取连接超时
    .idle_timeout(Duration::from_secs(600))    // 空闲连接超时
    .max_lifetime(Duration::from_secs(1800))   // 连接最大生命周期
    .connect(&database_url)
    .await?;
\`\`\`

## 为什么连接数不能太多？

原因在于 PostgreSQL 的进程模型：**每个连接对应一个 OS 进程**，连接数过多会导致：

- 频繁的上下文切换开销
- 内存占用线性增长（每个连接约 5-10MB）
- 锁竞争加剧

> 💡 如果你的 QPS 目标是 10 万，瓶颈通常不在连接池，而在**查询本身的效率**。你的热路径查询有没有加索引？

你能分享一下主要的查询模式吗？`,
    createdAt: '2026-05-12T14:35:00Z',
  },
  {
    id: 'm5',
    conversationId: '1',
    role: 'user',
    content: '主要是根据 user_id 查用户信息，然后有一个复杂的聚合查询统计用户行为数据，这个查询大概需要 200ms。',
    createdAt: '2026-05-12T14:40:00Z',
  },
  {
    id: 'm6',
    conversationId: '1',
    role: 'assistant',
    content: `200ms 的聚合查询是个明显的瓶颈，但这个完全可以解决。我来分两个方向给你：

## 方向一：缓存层（推荐优先做）

对于聚合统计类数据，实时计算往往不必要。加一层缓存可以让绝大多数请求直接命中缓存：

\`\`\`rust
use std::sync::Arc;
use tokio::sync::RwLock;
use std::collections::HashMap;
use std::time::{Duration, Instant};

struct CacheEntry {
    data: serde_json::Value,
    expires_at: Instant,
}

type Cache = Arc<RwLock<HashMap<String, CacheEntry>>>;

async fn get_user_stats(
    user_id: i64,
    cache: Cache,
    db: &PgPool,
) -> Result<serde_json::Value> {
    let key = format!("stats:{}", user_id);

    // 先查缓存
    {
        let r = cache.read().await;
        if let Some(entry) = r.get(&key) {
            if entry.expires_at > Instant::now() {
                return Ok(entry.data.clone());
            }
        }
    }

    // 缓存 miss，查数据库
    let data = fetch_stats_from_db(user_id, db).await?;

    // 写回缓存，TTL 60 秒
    {
        let mut w = cache.write().await;
        w.insert(key, CacheEntry {
            data: data.clone(),
            expires_at: Instant::now() + Duration::from_secs(60),
        });
    }

    Ok(data)
}
\`\`\`

## 方向二：查询优化

如果统计数据必须实时，先看看你的聚合查询是否有这些问题：

\`\`\`sql
-- 坏的写法：全表扫描
SELECT COUNT(*), SUM(value)
FROM user_events
WHERE user_id = $1;

-- 好的写法：确保有复合索引
CREATE INDEX CONCURRENTLY idx_user_events_user_id_created
ON user_events(user_id, created_at DESC);

-- 或者用物化视图预计算
CREATE MATERIALIZED VIEW user_stats AS
SELECT
    user_id,
    COUNT(*) as event_count,
    SUM(value) as total_value
FROM user_events
GROUP BY user_id;

-- 定时刷新（每分钟）
REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;
\`\`\`

你现在的聚合查询能贴出来看看吗？200ms 可以优化到 10ms 以内通常是可行的。`,
    createdAt: '2026-05-12T14:48:00Z',
  },
]
