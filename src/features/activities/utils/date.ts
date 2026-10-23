const activityDateFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const activityTimeFormatter = new Intl.DateTimeFormat('es-PE', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const lastSyncFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const parseDate = (isoDateTime: string): Date | null => {
  const date = new Date(isoDateTime)
  return Number.isNaN(date.getTime()) ? null : date
}

export const formatActivityDateTime = (isoDateTime: string): { date: string; time: string } => {
  const date = parseDate(isoDateTime)

  if (!date) {
    return { date: '—', time: '' }
  }

  return {
    date: activityDateFormatter.format(date),
    time: activityTimeFormatter.format(date),
  }
}

export const formatLastSync = (isoDateTime: string | null): string => {
  const date = isoDateTime ? parseDate(isoDateTime) : null
  return date ? lastSyncFormatter.format(date) : '—'
}
