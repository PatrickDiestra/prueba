import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { formatActivityDateTime } from '../utils/date'
import { ActivityEntityCell } from './activity-entity-cell'
import { ActivityOwnerCell } from './activity-owner-cell'
import { ActivityStatusBadge } from './activity-status-badge'
import { ActivityTypeCell } from './activity-type-cell'
import type { Activity } from '../types'

const COLUMN_COUNT = 7
const SKELETON_ROWS = 6

type ActivitiesTableProps = {
  activities: Activity[]
  isLoading: boolean
}

function SkeletonCell({ className }: { className: string }) {
  return (
    <div className={`h-3.5 animate-pulse rounded bg-muted ${className}`} aria-hidden="true" />
  )
}

function ActivitiesTableSkeleton() {
  return (
    <>
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <TableRow key={index} className="border-border/70">
          <TableCell className="pl-4">
            <SkeletonCell className="w-20" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="w-24" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="w-48" />
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            <SkeletonCell className="w-24" />
          </TableCell>
          <TableCell className="hidden xl:table-cell">
            <SkeletonCell className="w-28" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="w-20" />
          </TableCell>
          <TableCell />
        </TableRow>
      ))}
    </>
  )
}

export function ActivitiesTable({ activities, isLoading }: ActivitiesTableProps) {
  const isEmpty = !isLoading && activities.length === 0

  return (
    <Table className="min-w-[640px] table-fixed">
      <TableHeader>
        <TableRow className="border-border/70 hover:bg-transparent">
          <TableHead className="h-9 w-[92px] pl-4 text-xs font-medium text-muted-foreground">
            Fecha
          </TableHead>
          <TableHead className="h-9 w-[116px] text-xs font-medium text-muted-foreground">
            Tipo
          </TableHead>
          <TableHead className="h-9 text-xs font-medium text-muted-foreground">Asunto</TableHead>
          <TableHead className="hidden h-9 w-[136px] text-xs font-medium text-muted-foreground lg:table-cell">
            Entidad
          </TableHead>
          <TableHead className="hidden h-9 w-[170px] text-xs font-medium text-muted-foreground xl:table-cell">
            Responsable
          </TableHead>
          <TableHead className="h-9 w-[112px] text-xs font-medium text-muted-foreground">
            Estado
          </TableHead>
          <TableHead className="h-9 w-[44px] pr-4 text-right text-xs font-medium text-muted-foreground">
            <span className="sr-only">Acciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading && <ActivitiesTableSkeleton />}

        {isEmpty && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={COLUMN_COUNT} className="h-32 text-center text-sm text-muted-foreground">
              No hay actividades para mostrar.
            </TableCell>
          </TableRow>
        )}

        {activities.map((activity) => {
          const { date, time } = formatActivityDateTime(activity.createdAt)

          return (
            <TableRow key={activity.id} className="border-border/70 hover:bg-muted/40 [&>td]:py-2.5">
              <TableCell className="pl-4 whitespace-nowrap">
                <div className="flex flex-col leading-tight">
                  <span className="text-sm text-foreground">{date}</span>
                  <span className="text-xs text-muted-foreground">{time}</span>
                </div>
              </TableCell>

              <TableCell>
                <ActivityTypeCell typeId={activity.typeId} />
              </TableCell>

              <TableCell>
                <span className="block truncate text-sm text-foreground" title={activity.subject}>
                  {activity.subject || 'Sin asunto'}
                </span>
              </TableCell>

              <TableCell className="hidden lg:table-cell">
                <ActivityEntityCell
                  ownerTypeId={activity.ownerTypeId}
                  ownerId={activity.ownerId}
                />
              </TableCell>

              <TableCell className="hidden xl:table-cell">
                <ActivityOwnerCell
                  responsibleId={activity.responsibleId}
                  responsibleName={activity.responsibleName}
                />
              </TableCell>

              <TableCell>
                <ActivityStatusBadge status={activity.completed ? 'completed' : 'pending'} />
              </TableCell>

              <TableCell className="pr-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground"
                      aria-label={`Acciones para ${activity.subject}`}
                    >
                      <EllipsisVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem>
                      <Pencil className="size-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="size-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
