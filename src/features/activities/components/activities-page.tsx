import { useActivities } from '../hooks/use-activities'
import { ActivitiesErrorState } from './activities-error-state'
import { ActivitiesHeader } from './activities-header'
import { ActivitiesPagination } from './activities-pagination'
import { ActivitiesTable } from './activities-table'

export function ActivitiesPage() {
  const {
    items,
    total,
    page,
    pageSize,
    lastSync,
    isLoading,
    error,
    refresh,
    changePage,
    changePageSize,
  } = useActivities()

  const isInitialLoading = isLoading && total === 0

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <ActivitiesHeader lastSync={lastSync} isRefreshing={isLoading} onRefresh={refresh} />

        <section className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
          {error ? (
            <ActivitiesErrorState message={error} onRetry={refresh} />
          ) : (
            <>
              <ActivitiesTable activities={items} isLoading={isInitialLoading} />

              <div className="border-t border-border/70">
                <ActivitiesPagination
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={changePage}
                  onPageSizeChange={changePageSize}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}
