import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  MessageSquare, Star, Clock, Archive,
  Highlighter, Upload, BarChart2, Settings, Sun, Moon, Monitor,
} from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { mockTags } from '@/lib/mock-data'

function NavItem({ to, icon: Icon, label, end }: {
  to: string
  icon: React.ElementType
  label: string
  end?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm transition-colors duration-150',
          isActive
            ? 'bg-[var(--accent-subtle)] text-[var(--accent-text)] font-medium'
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]',
        )
      }
    >
      <Icon size={15} strokeWidth={1.75} />
      <span>{label}</span>
    </NavLink>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
      {children}
    </p>
  )
}

export function Sidebar() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const themes: Array<{ value: 'light' | 'dark' | 'system'; icon: React.ElementType }> = [
    { value: 'light', icon: Sun },
    { value: 'dark', icon: Moon },
    { value: 'system', icon: Monitor },
  ]

  return (
    <aside
      className="flex flex-col h-screen border-r border-[var(--border)] bg-[var(--bg-surface)]"
      style={{ width: 'var(--sidebar-width)', flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 mb-1">
        <div
          className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white text-xs font-bold"
          style={{ background: 'var(--accent)' }}
        >
          CV
        </div>
        <span className="font-semibold text-[var(--text-primary)] text-[15px]">
          {t('app.name')}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        <NavItem to="/" icon={MessageSquare} label={t('nav.allConversations')} end />
        <NavItem to="/starred" icon={Star} label={t('nav.starred')} />
        <NavItem to="/recent" icon={Clock} label={t('nav.recent')} />
        <NavItem to="/archived" icon={Archive} label={t('nav.archived')} />

        <SectionLabel>{t('nav.tags')}</SectionLabel>
        {mockTags.map(tag => (
          <NavLink
            key={tag.id}
            to={`/tags/${tag.id}`}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm transition-colors duration-150',
                isActive
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-text)] font-medium'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]',
              )
            }
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: tag.color }}
            />
            <span>{tag.name}</span>
          </NavLink>
        ))}

        <SectionLabel>工具</SectionLabel>
        <NavItem to="/highlights" icon={Highlighter} label={t('nav.highlights')} />
        <NavItem to="/import" icon={Upload} label={t('nav.import')} />
        <NavItem to="/stats" icon={BarChart2} label={t('nav.stats')} />
      </nav>

      {/* Bottom: theme + settings */}
      <div className="px-3 py-3 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[var(--text-tertiary)]">外观</span>
          <div className="flex items-center gap-0.5 p-0.5 rounded-[8px] bg-[var(--bg-subtle)]">
            {themes.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={cn(
                  'p-1.5 rounded-[6px] transition-colors',
                  theme === value
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
                )}
              >
                <Icon size={13} />
              </button>
            ))}
          </div>
        </div>
        <NavItem to="/settings" icon={Settings} label={t('nav.settings')} />
      </div>
    </aside>
  )
}
