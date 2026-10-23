import { CircleAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'

type ActivitiesErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ActivitiesErrorState({ message, onRetry }: ActivitiesErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center" role="alert">
      <span className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <CircleAlert aria-hidden="true" className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">No se pudieron cargar las actividades</p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  )
}
