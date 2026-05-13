import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-app)]">
      <Sidebar />
      <main className="flex-1 overflow-hidden bg-[var(--bg-surface)]">
        <Outlet />
      </main>
    </div>
  )
}
