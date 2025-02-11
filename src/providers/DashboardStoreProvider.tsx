//   take: pageSize,
'use client'

import { createDashboardStore, type DashboardState, type DashboardStore } from '@/stores/dashboard-store'
import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type DashboardStoreApi = ReturnType<typeof createDashboardStore>

export const DashboardStoreContext = createContext<DashboardStoreApi | undefined>(undefined)

export type DashboardStoreProviderProps = DashboardState & React.PropsWithChildren

export const DashboardStoreProvider = ({ children, ...props }: DashboardStoreProviderProps) => {
  const storeRef = useRef<DashboardStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createDashboardStore(props)
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
