import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { formatLastSync } from '../utils/date'

type ActivitiesHeaderProps = {
  lastSync: string | null
  isRefreshing: boolean
  onRefresh: () => void
}

export function ActivitiesHeader({ lastSync, isRefreshing, onRefresh }: ActivitiesHeaderProps) {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Actividades CRM</h1>
        <p className="text-sm text-muted-foreground">
          Visualiza y gestiona las actividades registradas en Bitrix24
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="text-right leading-tight whitespace-nowrap">
          <p className="text-xs text-muted-foreground">Última actualización</p>
          <p className="text-xs font-medium text-foreground">{formatLastSync(lastSync)}</p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Recargar actividades"
        >
          <RefreshCw className={cn('size-4', isRefreshing && 'animate-spin')} />
        </Button>

        <Button onClick={onRefresh} disabled={isRefreshing}>
          <RefreshCw className={cn('size-4', isRefreshing && 'animate-spin')} />
          Actualizar
        </Button>
      </div>
    </header>
  )
}
