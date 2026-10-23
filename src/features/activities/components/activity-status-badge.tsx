import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { ACTIVITY_STATUS_PRESENTATION } from '../config/presentation'
import type { ActivityStatus } from '../types'

type ActivityStatusBadgeProps = {
  status: ActivityStatus
}

export function ActivityStatusBadge({ status }: ActivityStatusBadgeProps) {
  const presentation = ACTIVITY_STATUS_PRESENTATION[status]

  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 rounded-md px-2 py-0.5 font-normal', presentation.badgeClassName)}
    >
      <span className={cn('size-1.5 rounded-full', presentation.dotClassName)} aria-hidden="true" />
      {presentation.label}
    </Badge>
  )
}
