import { ReactNode } from 'react'
import AppSidebar from '@/components/custom/workspance/AppSidebar'

function WorkspanceLayout({ children } : { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}

export default WorkspanceLayout;