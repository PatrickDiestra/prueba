/**
 * Normalized Bitrix24 activity. Field names mirror the API contract exposed by
 * `GET /bitrix/activities`; ids stay as strings because Bitrix sends numbers as
 * strings and there is no lookup endpoint to resolve them to entities.
 */
export type Activity = {
  id: string
  typeId: string
  subject: string
  completed: boolean
  /** ISO datetime with timezone offset, e.g. "2025-01-02T17:19:38+03:00". */
  createdAt: string
  /** Deadline/end datetime; nullable for activities without one. */
  endTime: string | null
  responsibleId: string
  responsibleName: string
  ownerTypeId: string
  ownerId: string
  providerId: string
}

export type ActivityStatus = 'completed' | 'pending'
