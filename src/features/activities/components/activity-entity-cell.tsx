import { getOwnerTypeLabel } from '../config/presentation'

type ActivityEntityCellProps = {
  ownerTypeId: string
  ownerId: string
}

/**
 * The API only exposes `owner_type_id` / `owner_id`; there is no endpoint to
 * resolve the related CRM entity name, so the raw id is shown as-is.
 */
export function ActivityEntityCell({ ownerTypeId, ownerId }: ActivityEntityCellProps) {
  return (
    <div className="flex flex-col leading-tight">
      <span className="text-sm whitespace-nowrap text-foreground">
        {getOwnerTypeLabel(ownerTypeId)}
      </span>
      <span className="text-xs text-muted-foreground">#{ownerId}</span>
    </div>
  )
}
