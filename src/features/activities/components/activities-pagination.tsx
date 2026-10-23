import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

import { getPaginationItems } from '../utils/pagination'

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const

type ActivitiesPaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function ActivitiesPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: ActivitiesPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1
  const lastItem = Math.min(page * pageSize, total)
  const pageItems = getPaginationItems(page, totalPages)

  return (
    <footer className="flex flex-col items-center gap-3 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:justify-between">
      <p>
        Mostrando <span className="font-medium text-foreground">{firstItem}</span> -{' '}
        <span className="font-medium text-foreground">{lastItem}</span> de{' '}
        <span className="font-medium text-foreground">{total}</span> resultados
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <span>Filas por página</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger size="sm" className="h-7 w-16" aria-label="Filas por página">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {PAGE_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <nav aria-label="Paginación" className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {pageItems.map((item, index) =>
            item === 'ellipsis' ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="px-1 text-muted-foreground"
              >
                …
              </span>
            ) : (
              <Button
                key={item}
                size="icon-sm"
                variant={item === page ? 'default' : 'ghost'}
                onClick={() => onPageChange(item)}
                aria-current={item === page ? 'page' : undefined}
                className={cn('tabular-nums', item !== page && 'text-muted-foreground')}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Página siguiente"
          >
            <ChevronRight className="size-4" />
          </Button>
        </nav>
      </div>
    </footer>
  )
}
