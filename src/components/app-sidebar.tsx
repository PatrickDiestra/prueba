import { ChevronDown, ListChecks, LogOut } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NavItem = {
  id: string
  label: string
  icon: typeof ListChecks
  isActive?: boolean
}

const NAV_ITEMS: NavItem[] = [{ id: 'activities', label: 'Actividades', icon: ListChecks, isActive: true }]

const currentUser = {
  name: 'Luis Suárez',
  role: 'Ventas',
  initials: 'LS',
}

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2.5 px-4">
        <span className="flex size-8 items-center justify-center rounded-full bg-white text-sm font-bold text-neutral-900">
          C
        </span>
        <span className="text-base font-semibold tracking-tight text-sidebar-foreground">CRM</span>
        <ChevronDown aria-hidden="true" className="ml-auto size-4 text-muted-foreground" />
      </div>

      <nav aria-label="Navegación principal" className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={item.isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    item.isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2.5 border-t border-sidebar-border px-4 py-3">
        <Avatar size="sm">
          <AvatarFallback className="bg-sky-600 text-[10px] font-semibold text-white">
            {currentUser.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-medium text-sidebar-foreground">{currentUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">{currentUser.role}</p>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Cerrar sesión">
          <LogOut className="size-4" />
        </Button>
      </div>
    </aside>
  )
}
