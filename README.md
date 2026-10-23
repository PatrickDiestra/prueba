# CRM Activities

Frontend scaffold for a Bitrix24 activities dashboard, built on top of Vite,
React 19, TypeScript, Tailwind CSS v4 and shadcn/ui.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- shadcn/ui (Radix primitives + `lucide-react` icons)
- Bun as package manager and script runner

## Getting started

```bash
bun install
cp .env.example .env   # optional: override VITE_API_BASE_URL
bun run dev
```

Other scripts:

```bash
bun run build    # type-check + production build
bun run lint     # oxlint
bun run preview  # preview the production build
```

## Data source

Activities come from `GET {VITE_API_BASE_URL}/bitrix/activities`, which returns:

```json
{
  "source": "cache",
  "last_sync": "2026-10-23T15:22:51",
  "total": 19864,
  "activities": [
    {
      "id": "199080",
      "type_id": "6",
      "subject": "Deal #54824 | ...",
      "completed": "Y",
      "created": "2025-01-02T17:19:38+03:00",
      "end_time": "2025-01-07T18:53:02+03:00",
      "responsible_id": "4540",
      "responsible_name": "Alberto Gutierrez G.",
      "owner_type_id": "2",
      "owner_id": "54824",
      "provider_id": "CRM_TASKS_TASK"
    }
  ]
}
```

Behaviour implemented around that contract:

- **No server pagination.** The endpoint returns every record, so
  `src/services/api.ts` fetches it once, keeps it in memory and the hook slices
  it on the client. Page changes never hit the network.
- **Duplicates.** The endpoint repeats some activities verbatim; exact
  duplicates are collapsed after parsing (see `dedupeActivities`).
- **`completed`** maps to the only two statuses: `Y` → Completada, `N` →
  Pendiente.
- **`type_id`** (and `owner_type_id`) have no lookup endpoint, so labels and
  icons are static maps in
  `src/features/activities/config/presentation.ts`. Unknown ids fall back to a
  generic type/entity.
- **`owner_id`** is displayed raw. There is no endpoint to resolve the related
  deal/contact/company, so the table shows `Entidad` + `#owner_id`.
- **`responsible_name`** is provided by the API; the avatar initials and color
  are derived locally.
- **Sorting.** The API returns activities oldest-first, the table shows the
  most recent `created` first.
- **Última actualización** uses the API `last_sync`, not the fetch time.

## Project structure

```
src/
├── components/
│   ├── app-sidebar.tsx        # CRM shell sidebar
│   └── ui/                    # shadcn/ui primitives
├── features/
│   └── activities/
│       ├── components/        # header, table, cells, pagination, error state
│       ├── config/            # static type/owner/status presentation
│       ├── hooks/             # useActivities (fetch, cache, client-side paging)
│       ├── utils/             # date, sorting, initials, pagination range
│       └── types.ts           # domain model
├── lib/utils.ts               # cn helper
├── services/api.ts            # Bitrix24 adapter + response normalization
├── App.tsx
├── index.css                  # Tailwind entry + theme tokens
└── main.tsx
```

## Where to extend

- `src/services/api.ts`: adjust the request (auth headers, error mapping) while
  keeping the normalized `ActivitiesResponse` contract.
- `src/features/activities/config/presentation.ts`: extend the static maps when
  new Bitrix24 types appear.
- `src/features/activities/components/activities-table.tsx`: wire the row
  actions menu once edit/delete endpoints exist.
