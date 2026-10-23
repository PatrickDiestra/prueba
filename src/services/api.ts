import type { Activity } from '@/features/activities/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api-maestra-prod.up.railway.app'
const ACTIVITIES_ENDPOINT = `${API_BASE_URL}/bitrix/activities`

export type ActivitiesResponse = {
  activities: Activity[]
  total: number
  /** Bitrix synchronization timestamp reported by the API, not the fetch time. */
  lastSync: string | null
}

type FetchActivitiesOptions = {
  signal?: AbortSignal
  /** Bypass the in-memory cache after an explicit user refresh. */
  forceReload?: boolean
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const toStringValue = (value: unknown): string => {
  if (typeof value === 'string') return value
  return value == null ? '' : String(value)
}

const parseActivity = (raw: unknown): Activity => {
  if (!isRecord(raw)) {
    throw new Error('Invalid activity entry in the Bitrix24 response')
  }

  return {
    id: toStringValue(raw.id),
    typeId: toStringValue(raw.type_id),
    subject: toStringValue(raw.subject),
    completed: raw.completed === 'Y',
    createdAt: toStringValue(raw.created),
    endTime: raw.end_time ? toStringValue(raw.end_time) : null,
    responsibleId: toStringValue(raw.responsible_id),
    responsibleName: toStringValue(raw.responsible_name),
    ownerTypeId: toStringValue(raw.owner_type_id),
    ownerId: toStringValue(raw.owner_id),
    providerId: toStringValue(raw.provider_id),
  }
}

const getActivityKey = (activity: Activity): string =>
  [
    activity.id,
    activity.typeId,
    activity.subject,
    activity.createdAt,
    activity.endTime ?? '',
    activity.responsibleId,
    activity.ownerId,
    activity.providerId,
    activity.completed ? 'Y' : 'N',
  ].join('|')

/**
 * The Bitrix24 endpoint currently repeats some activities (same payload two or
 * more times), which would render duplicate rows and duplicate React keys.
 * Exact duplicates are collapsed; rows with the same id but different data are
 * preserved.
 */
const dedupeActivities = (activities: Activity[]): Activity[] => {
  const seen = new Set<string>()

  return activities.filter((activity) => {
    const key = getActivityKey(activity)

    if (seen.has(key)) return false

    seen.add(key)
    return true
  })
}

const parseActivitiesResponse = (payload: unknown): ActivitiesResponse => {
  if (!isRecord(payload) || !Array.isArray(payload.activities)) {
    throw new Error('Unexpected Bitrix24 activities response shape')
  }

  const activities = dedupeActivities(payload.activities.map(parseActivity))

  return {
    activities,
    total: activities.length,
    lastSync: typeof payload.last_sync === 'string' ? payload.last_sync : null,
  }
}

const requestActivities = async (signal?: AbortSignal): Promise<ActivitiesResponse> => {
  const response = await fetch(ACTIVITIES_ENDPOINT, {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Bitrix24 activities request failed with status ${response.status}`)
  }

  return parseActivitiesResponse(await response.json())
}

// The endpoint has no pagination and returns every activity (several MB), so
// the whole payload is cached in memory and paged on the client.
let cachedResponse: ActivitiesResponse | null = null
let inFlightRequest: Promise<ActivitiesResponse> | null = null

export async function fetchActivities({
  signal,
  forceReload = false,
}: FetchActivitiesOptions = {}): Promise<ActivitiesResponse> {
  if (!forceReload) {
    if (cachedResponse) return cachedResponse
    if (inFlightRequest) return inFlightRequest
  }

  const request = requestActivities(signal)

  if (!forceReload) {
    inFlightRequest = request
  }

  try {
    const result = await request
    cachedResponse = result
    return result
  } finally {
    if (inFlightRequest === request) {
      inFlightRequest = null
    }
  }
}
