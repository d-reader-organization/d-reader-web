//   take: pageSize,
'use client'

import { SortOrder } from '@/enums/sort'
import { createDashboardStore, type DashboardState, type DashboardStore } from '@/stores/dashboard-store'
import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type DashboardStoreApi = ReturnType<typeof createDashboardStore>

export const DashboardStoreContext = createContext<DashboardStoreApi | undefined>(undefined)

export type DashboardStoreProviderProps = Partial<DashboardState> & React.PropsWithChildren

const TABLE_PAGINATION_DEFAULTS = {
  skip: 0,
  take: 5,
}

export const DashboardStoreProvider = ({ children, ...props }: DashboardStoreProviderProps) => {
  const storeRef = useRef<DashboardStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createDashboardStore({
      currentPage: props.currentPage ?? 1,
      skip: props.skip ?? TABLE_PAGINATION_DEFAULTS.skip,
      sortOptions: props.sortOptions ?? [],
      sortOrder: props.sortOrder ?? SortOrder.ASC,
      sortTag: props.sortTag ?? '',
      take: props.take ?? TABLE_PAGINATION_DEFAULTS.take,
      totalPages: props.totalPages ?? 100,
    })
  }

  return <DashboardStoreContext.Provider value={storeRef.current}>{children}</DashboardStoreContext.Provider>
}

export const useDashboardStore = <T,>(selector: (store: DashboardStore) => T): T => {
  const dashboardStoreContext = useContext(DashboardStoreContext)

  if (!dashboardStoreContext) {
    throw new Error(`useDashboardStore must be used within DashboardStoreProvider`)
  }

  return useStore(dashboardStoreContext, selector)
}
