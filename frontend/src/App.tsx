import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { ConversationsPage } from '@/pages/ConversationsPage'

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full text-[var(--text-tertiary)] text-sm">
      {title} — 即将推出
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<ConversationsPage />} />
          <Route path="starred" element={<Placeholder title="已加星标" />} />
          <Route path="recent" element={<Placeholder title="最近" />} />
          <Route path="archived" element={<Placeholder title="已归档" />} />
          <Route path="tags/:id" element={<Placeholder title="标签" />} />
          <Route path="highlights" element={<Placeholder title="高亮摘录" />} />
          <Route path="import" element={<Placeholder title="导入对话" />} />
          <Route path="stats" element={<Placeholder title="数据统计" />} />
          <Route path="settings" element={<Placeholder title="设置" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
