import type { Activity } from '../types'

const parseTimestamp = (isoDateTime: string): number => {
  const timestamp = Date.parse(isoDateTime)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

/** The API returns activities oldest-first; the list shows the most recent first. */
export const sortByMostRecent = (activities: Activity[]): Activity[] =>
  [...activities].sort(
    (left, right) => parseTimestamp(right.createdAt) - parseTimestamp(left.createdAt),
  )

export const getInitials = (name: string): string => {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return initials || '?'
}
