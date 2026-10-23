import { cn } from '@/lib/utils'

import { getActivityTypePresentation } from '../config/presentation'

type ActivityTypeCellProps = {
  typeId: string
  className?: string
}

export function ActivityTypeCell({ typeId, className }: ActivityTypeCellProps) {
  const presentation = getActivityTypePresentation(typeId)
  const Icon = presentation.icon

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-md',
          presentation.iconClassName,
        )}
      >
        <Icon aria-hidden="true" className="size-3.5" />
      </span>
      <span className="text-sm text-foreground">{presentation.label}</span>
    </div>
  )
}
