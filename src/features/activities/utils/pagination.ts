export type PaginationItem = number | 'ellipsis'

/**
 * Page buttons to render around the current page. Keeps the control compact
 * for large result sets (the API returns tens of thousands of activities).
 */
export const getPaginationItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items: PaginationItem[] = [1]
  const windowStart = Math.max(2, currentPage - 1)
  const windowEnd = Math.min(totalPages - 1, currentPage + 1)

  if (windowStart > 2) {
    items.push('ellipsis')
  }

  for (let page = windowStart; page <= windowEnd; page += 1) {
    items.push(page)
  }

  if (windowEnd < totalPages - 1) {
    items.push('ellipsis')
  }

  items.push(totalPages)

  return items
}
