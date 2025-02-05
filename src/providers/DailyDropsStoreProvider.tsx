'use client'

import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { type DailyDropsStore, createDailyDropsStore } from '@/stores/daily-drops-store'

export type DailyDropsStoreApi = ReturnType<typeof createDailyDropsStore>

export const DailyDropsStoreContext = createContext<DailyDropsStoreApi | undefined>(undefined)

export type DailyDropsStoreProviderProps = React.PropsWithChildren

export const DailyDropsStoreProvider = ({ children }: DailyDropsStoreProviderProps) => {
  const storeRef = useRef<DailyDropsStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createDailyDropsStore()
  }

  return <DailyDropsStoreContext.Provider value={storeRef.current}>{children}</DailyDropsStoreContext.Provider>
}

export const useDailyDropsStore = <T,>(selector: (store: DailyDropsStore) => T): T => {
  const dailyDropsContext = useContext(DailyDropsStoreContext)

  if (!dailyDropsContext) {
    throw new Error(`useDailyDropsStore must be used within DailyDropsStoreProvider`)
  }

  return useStore(dailyDropsContext, selector)
}
