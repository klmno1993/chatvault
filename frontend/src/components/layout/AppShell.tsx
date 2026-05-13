import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { SearchPalette } from '@/components/search/SearchPalette'

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-canvas)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          'fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0 lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} onSearchOpen={() => setSearchOpen(true)} />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[var(--bg-surface)]">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-[var(--line-hairline)] lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-[8px] text-[var(--text-secondary)] hover:bg-[var(--bg-sunken)] transition-colors"
          >
            <Menu size={18} />
          </button>
          <span className="font-semibold text-[var(--text-primary)] text-[15px] flex-1">ChatVault</span>
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 rounded-[8px] text-[var(--text-secondary)] hover:bg-[var(--bg-sunken)] transition-colors"
          >
            <Search size={16} />
          </button>
        </header>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
