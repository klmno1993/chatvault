import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { Search, MessageSquare, Hash, ArrowRight, Clock } from 'lucide-react'
import { mockConversations, mockMessages, mockTags } from '@/lib/mock-data'
import { PlatformBadge } from '@/components/ui/PlatformBadge'
import { cn } from '@/lib/utils'

interface SearchResult {
  type: 'conversation' | 'message' | 'tag'
  id: string
  title: string
  subtitle?: string
  highlight?: string
  conversationId?: string
  tagColor?: string
}

function highlight(text: string, query: string): string {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + query.length)
  const after = text.slice(idx + query.length)
  // Return with a marker we parse in rendering
  return `${before}__HL__${match}__/HL__${after}`
}

function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(__HL__|__\/HL__)/)
  let inside = false
  return (
    <>
      {parts.map((part, i) => {
        if (part === '__HL__') { inside = true; return null }
        if (part === '__/HL__') { inside = false; return null }
        return inside
          ? <mark key={i} className="bg-[var(--accent-soft)] text-[var(--accent)] rounded-[3px] px-0.5 not-italic font-medium">{part}</mark>
          : <span key={i}>{part}</span>
      })}
    </>
  )
}

function search(query: string): SearchResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  const results: SearchResult[] = []

  // Conversations — title + summary
  for (const c of mockConversations) {
    if (c.isArchived) continue
    const titleMatch = c.title.toLowerCase().includes(q)
    const summaryMatch = c.summary?.toLowerCase().includes(q)
    if (titleMatch || summaryMatch) {
      results.push({
        type: 'conversation',
        id: c.id,
        title: highlight(c.title, query),
        subtitle: c.modelUsed,
        highlight: summaryMatch && c.summary ? highlight(c.summary, query) : undefined,
      })
    }
  }

  // Messages — content
  const seenConvIds = new Set(results.map(r => r.id))
  for (const m of mockMessages) {
    if (m.role === 'system') continue
    if (!m.content.toLowerCase().includes(q)) continue
    if (seenConvIds.has(m.conversationId)) continue
    const conv = mockConversations.find(c => c.id === m.conversationId)
    if (!conv || conv.isArchived) continue
    seenConvIds.add(m.conversationId)

    const idx = m.content.toLowerCase().indexOf(q)
    const start = Math.max(0, idx - 40)
    const snippet = (start > 0 ? '…' : '') + m.content.slice(start, idx + query.length + 60) + '…'

    results.push({
      type: 'message',
      id: m.id,
      conversationId: m.conversationId,
      title: conv.title,
      subtitle: m.role === 'user' ? '你' : conv.modelUsed,
      highlight: highlight(snippet, query),
    })
  }

  // Tags
  for (const tag of mockTags) {
    if (tag.name.toLowerCase().includes(q)) {
      results.push({
        type: 'tag',
        id: tag.id,
        title: tag.name,
        tagColor: tag.color,
        subtitle: `${mockConversations.filter(c => c.tags.some(t => t.id === tag.id)).length} 条对话`,
      })
    }
  }

  return results.slice(0, 12)
}

const RECENT_KEY = 'cv_recent_searches'

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') } catch { return [] }
}

function saveRecent(query: string) {
  const prev = getRecent().filter(q => q !== query)
  localStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev].slice(0, 5)))
}

interface SearchPaletteProps {
  open: boolean
  onClose: () => void
}

export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const recent = getRecent()

  const results = search(query)
  const showRecent = query === '' && recent.length > 0

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => { setActiveIdx(0) }, [query])

  const totalItems = showRecent ? recent.length : results.length

  const handleSelect = useCallback((result?: SearchResult, recentQ?: string) => {
    if (recentQ !== undefined) {
      setQuery(recentQ)
      return
    }
    if (!result) return
    saveRecent(query)
    onClose()
    if (result.type === 'tag') {
      navigate(`/tags/${result.id}`)
    } else {
      const convId = result.conversationId ?? result.id
      navigate('/', { state: { openConversationId: convId } })
    }
  }, [query, navigate, onClose])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, totalItems - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (showRecent) handleSelect(undefined, recent[activeIdx])
      else if (results[activeIdx]) handleSelect(results[activeIdx])
    }
    else if (e.key === 'Escape') onClose()
  }

  if (!open) return null

  const palette = (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-[560px] rounded-[var(--radius-lg)] bg-[var(--bg-surface)] shadow-[0_24px_64px_rgba(0,0,0,0.4)] border border-[var(--line-hairline)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line-hairline)]">
          <Search size={16} className="text-[var(--text-tertiary)] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索对话、消息、标签…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              清空
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[5px] bg-[var(--bg-sunken)] text-[11px] text-[var(--text-tertiary)] font-mono">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto py-2">
          {showRecent && (
            <>
              <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                最近搜索
              </p>
              {recent.map((q, i) => (
                <button
                  key={q}
                  onClick={() => handleSelect(undefined, q)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                    i === activeIdx ? 'bg-[var(--bg-sunken)]' : 'hover:bg-[var(--bg-sunken)]',
                  )}
                >
                  <Clock size={14} className="text-[var(--text-tertiary)] flex-shrink-0" />
                  <span className="text-[13px] text-[var(--text-secondary)]">{q}</span>
                </button>
              ))}
            </>
          )}

          {!showRecent && results.length === 0 && query && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Search size={24} className="text-[var(--text-tertiary)] mb-2" strokeWidth={1.5} />
              <p className="text-[var(--text-secondary)] text-sm">没有找到「{query}」</p>
              <p className="text-[var(--text-tertiary)] text-[12px] mt-1">试试换个关键词</p>
            </div>
          )}

          {!showRecent && results.length > 0 && (() => {
            const convResults = results.filter(r => r.type === 'conversation' || r.type === 'message')
            const tagResults = results.filter(r => r.type === 'tag')
            let idx = -1

            return (
              <>
                {convResults.length > 0 && (
                  <>
                    <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                      对话
                    </p>
                    {convResults.map(result => {
                      idx++
                      const isActive = idx === activeIdx
                      const convId = result.conversationId ?? result.id
                      const conv = mockConversations.find(c => c.id === convId)
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          className={cn(
                            'w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors',
                            isActive ? 'bg-[var(--bg-sunken)]' : 'hover:bg-[var(--bg-sunken)]',
                          )}
                        >
                          <MessageSquare size={14} className="text-[var(--text-tertiary)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[13px] font-medium text-[var(--text-primary)] truncate">
                                <HighlightedText text={result.title} />
                              </span>
                              {conv && <PlatformBadge platform={conv.platform} />}
                            </div>
                            {result.highlight && (
                              <p className="text-[12px] text-[var(--text-tertiary)] line-clamp-2 leading-relaxed">
                                <HighlightedText text={result.highlight} />
                              </p>
                            )}
                          </div>
                          <ArrowRight size={13} className={cn('flex-shrink-0 mt-0.5 transition-opacity', isActive ? 'opacity-60' : 'opacity-0')} />
                        </button>
                      )
                    })}
                  </>
                )}

                {tagResults.length > 0 && (
                  <>
                    <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                      标签
                    </p>
                    {tagResults.map(result => {
                      idx++
                      const isActive = idx === activeIdx
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                            isActive ? 'bg-[var(--bg-sunken)]' : 'hover:bg-[var(--bg-sunken)]',
                          )}
                        >
                          <Hash size={14} className="text-[var(--text-tertiary)] flex-shrink-0" strokeWidth={1.75} />
                          <div className="flex items-center gap-2 flex-1">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: result.tagColor }}
                            />
                            <span className="text-[13px] font-medium text-[var(--text-primary)]">
                              <HighlightedText text={result.title} />
                            </span>
                            <span className="text-[12px] text-[var(--text-tertiary)] ml-auto">{result.subtitle}</span>
                          </div>
                          <ArrowRight size={13} className={cn('flex-shrink-0 transition-opacity', isActive ? 'opacity-60' : 'opacity-0')} />
                        </button>
                      )
                    })}
                  </>
                )}
              </>
            )
          })()}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-[var(--line-hairline)] flex items-center gap-3">
          <span className="text-[11px] text-[var(--text-tertiary)]">
            <kbd className="font-mono">↑↓</kbd> 导航
          </span>
          <span className="text-[11px] text-[var(--text-tertiary)]">
            <kbd className="font-mono">↵</kbd> 打开
          </span>
          <span className="text-[11px] text-[var(--text-tertiary)]">
            <kbd className="font-mono">Esc</kbd> 关闭
          </span>
        </div>
      </div>
    </div>
  )

  return createPortal(palette, document.body)
}
