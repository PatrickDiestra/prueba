import { AppSidebar } from '@/components/app-sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ActivitiesPage } from '@/features/activities/components/activities-page'

function MobileTopbar() {
  return (
    <header className="flex h-14 items-center gap-2.5 border-b border-border px-4 md:hidden">
      <span className="flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-neutral-900">
        C
      </span>
      <span className="text-sm font-semibold tracking-tight">CRM</span>
      <Avatar size="sm" className="ml-auto">
        <AvatarFallback className="bg-sky-600 text-[10px] font-semibold text-white">LS</AvatarFallback>
      </Avatar>
    </header>
  )
}

export function App() {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopbar />
        <ActivitiesPage />
      </div>
    </div>
  )
}
