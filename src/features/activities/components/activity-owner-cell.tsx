import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import { getAvatarColorClassName } from '../config/presentation'
import { getInitials } from '../utils/activity'

type ActivityOwnerCellProps = {
  responsibleId: string
  responsibleName: string
}

export function ActivityOwnerCell({ responsibleId, responsibleName }: ActivityOwnerCellProps) {
  const name = responsibleName || 'Sin asignar'

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Avatar size="sm" className="size-6">
        <AvatarFallback
          className={cn(
            'text-[10px] font-semibold text-white',
            getAvatarColorClassName(responsibleId),
          )}
        >
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <span className="truncate text-sm text-foreground">{name}</span>
    </div>
  )
}
