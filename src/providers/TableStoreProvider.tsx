//   take: pageSize,
'use client'

import { SortOrder } from '@/enums/sort'
import { createTableStore, type TableState, type TableStore } from '@/stores/table-store'
import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

export type TableStoreApi = ReturnType<typeof createTableStore>

export const TableStoreContext = createContext<TableStoreApi | undefined>(undefined)

export type TableStoreProviderProps = Partial<TableState> & React.PropsWithChildren

const TABLE_PAGINATION_DEFAULTS = {
  skip: 0,
  take: 5,
}

export const TableStoreProvider = ({ children, ...props }: TableStoreProviderProps) => {
  const storeRef = useRef<TableStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createTableStore({
      currentPage: props.currentPage ?? 1,
      skip: props.skip ?? TABLE_PAGINATION_DEFAULTS.skip,
      sortOptions: props.sortOptions ?? [],
      sortOrder: props.sortOrder ?? SortOrder.ASC,
      sortTag: props.sortTag ?? '',
      take: props.take ?? TABLE_PAGINATION_DEFAULTS.take,
      totalPages: props.totalPages ?? 100,
    })
  }

  return <TableStoreContext.Provider value={storeRef.current}>{children}</TableStoreContext.Provider>
}

export const useTableStore = <T,>(selector: (store: TableStore) => T): T => {
  const tableStoreContext = useContext(TableStoreContext)

  if (!tableStoreContext) {
    throw new Error(`useTableStore must be used within TableStoreProvider`)
  }

  return useStore(tableStoreContext, selector)
}
