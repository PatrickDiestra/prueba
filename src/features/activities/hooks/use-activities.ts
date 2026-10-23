import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchActivities, type ActivitiesResponse } from '@/services/api'
import type { Activity } from '../types'
import { sortByMostRecent } from '../utils/activity'

const INITIAL_PAGE = 1
const INITIAL_PAGE_SIZE = 10

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message
  return 'No se pudieron cargar las actividades.'
}

export function useActivities() {
  const [data, setData] = useState<ActivitiesResponse | null>(null)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE)
  const [requestToken, setRequestToken] = useState(0)
  const [settledToken, setSettledToken] = useState(-1)
  const [error, setError] = useState<string | null>(null)
  const forceReloadRef = useRef(false)

  const isLoading = settledToken !== requestToken

  useEffect(() => {
    const controller = new AbortController()
    const forceReload = forceReloadRef.current
    forceReloadRef.current = false

    fetchActivities({ signal: controller.signal, forceReload })
      .then((result) => {
        if (controller.signal.aborted) return

        setData({ ...result, activities: sortByMostRecent(result.activities) })
        setError(null)
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return

        setError(toErrorMessage(cause))
      })
      .finally(() => {
        if (controller.signal.aborted) return

        setSettledToken(requestToken)
      })

    return () => {
      controller.abort()
    }
  }, [requestToken])

  const activities: Activity[] = data?.activities ?? []
  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const items = activities.slice(startIndex, startIndex + pageSize)

  const refresh = useCallback(() => {
    forceReloadRef.current = true
    setRequestToken((current) => current + 1)
  }, [])

  const changePage = useCallback(
    (nextPage: number) => {
      setPage(Math.min(Math.max(nextPage, 1), totalPages))
    },
    [totalPages],
  )

  const changePageSize = useCallback((nextPageSize: number) => {
    setPageSize(nextPageSize)
    setPage(INITIAL_PAGE)
  }, [])

  return {
    items,
    total,
    page: currentPage,
    pageSize,
    lastSync: data?.lastSync ?? null,
    isLoading,
    error,
    refresh,
    changePage,
    changePageSize,
  }
}
