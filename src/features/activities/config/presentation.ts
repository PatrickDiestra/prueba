import {
  FileText,
  Mail,
  Phone,
  SquareCheckBig,
  Users,
  type LucideIcon,
} from 'lucide-react'

import type { ActivityStatus } from '../types'

type ActivityTypePresentation = {
  label: string
  icon: LucideIcon
  iconClassName: string
}

type ActivityStatusPresentation = {
  label: string
  dotClassName: string
  badgeClassName: string
}

const FALLBACK_ACTIVITY_TYPE: ActivityTypePresentation = {
  label: 'Otro',
  icon: FileText,
  iconClassName: 'bg-slate-500/20 text-slate-300',
}

/**
 * Bitrix24 returns numeric `type_id` values and offers no endpoint to resolve
 * their labels, so the mapping is static. Unknown ids degrade to a generic type.
 */
const ACTIVITY_TYPE_PRESENTATION: Record<string, ActivityTypePresentation> = {
  '1': { label: 'Reunión', icon: Users, iconClassName: 'bg-blue-500/15 text-blue-400' },
  '2': { label: 'Llamada', icon: Phone, iconClassName: 'bg-emerald-500/15 text-emerald-400' },
  '3': { label: 'Correo', icon: Mail, iconClassName: 'bg-rose-500/15 text-rose-400' },
  '4': { label: 'Tarea', icon: SquareCheckBig, iconClassName: 'bg-amber-500/15 text-amber-400' },
  '6': { label: 'Tarea', icon: SquareCheckBig, iconClassName: 'bg-amber-500/15 text-amber-400' },
}

export const getActivityTypePresentation = (typeId: string): ActivityTypePresentation =>
  ACTIVITY_TYPE_PRESENTATION[typeId] ?? FALLBACK_ACTIVITY_TYPE

export const ACTIVITY_STATUS_PRESENTATION: Record<ActivityStatus, ActivityStatusPresentation> = {
  completed: {
    label: 'Completada',
    dotClassName: 'bg-emerald-400',
    badgeClassName: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  },
  pending: {
    label: 'Pendiente',
    dotClassName: 'bg-rose-400',
    badgeClassName: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
  },
}

/** Static Bitrix24 CRM owner type labels (no lookup endpoint available). */
const OWNER_TYPE_LABELS: Record<string, string> = {
  '1': 'Lead',
  '2': 'Negocio',
  '3': 'Contacto',
  '4': 'Empresa',
  '7': 'Cotización',
}

export const getOwnerTypeLabel = (ownerTypeId: string): string =>
  OWNER_TYPE_LABELS[ownerTypeId] ?? `Entidad ${ownerTypeId}`

const AVATAR_COLOR_CLASSNAMES = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-sky-600',
] as const

/** Stable color per responsible id so avatars do not flicker between renders. */
export const getAvatarColorClassName = (seed: string): string => {
  let hash = 0

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) % 10_000
  }

  return AVATAR_COLOR_CLASSNAMES[hash % AVATAR_COLOR_CLASSNAMES.length]
}
