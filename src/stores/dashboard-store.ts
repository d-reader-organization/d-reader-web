import { SORT_OPTIONS } from '@/constants/general'
import { SortOrder } from '@/enums/sort'
import { ComicSortTag } from '@/models/comic/comicParams'
import { createStore } from 'zustand/vanilla'

// sort options could be optional?
// filter options could be optional?
// take & skip required?

type SortOption = { value: string; order: SortOrder; label: string }

export type DashboardState = {
  currentPage: number
  skip: number
  sortOptions: SortOption[]
  sortOrder: SortOrder
  sortTag: string
  take: number
  totalPages: number
}

type DashboardActions = {
  setCurrentPage: (page: number) => void
  setTakePerPage: (take: number) => void
  setSortOptions: (sortOptions: SortOption[]) => void
  updateSortParams: ({ sortOrder, sortTag }: { sortOrder: SortOrder; sortTag: string }) => void
}

export type DashboardStore = DashboardState & DashboardActions

export const defaultInitState: DashboardState = {
  sortOptions: SORT_OPTIONS.COMICS,
  sortOrder: SortOrder.ASC,
  sortTag: ComicSortTag.Published,
  currentPage: 1,
  skip: 0,
  take: 5,
  totalPages: 0,
}

export const createDashboardStore = (initState: DashboardState = defaultInitState) => {
  return createStore<DashboardStore>()((set) => ({
    ...initState,
    setCurrentPage: (page: number) =>
      set(({ take }) => {
        return { currentPage: page, skip: (page - 1) * take }
      }),
    setSortOptions: (sortOptions) =>
      set(() => {
        if (!sortOptions.length) {
          return {}
        }
        const initial = sortOptions.at(0)!
        return { sortOptions, sortOrder: initial.order, sortTag: initial.value }
      }),
    setTakePerPage: (take: number) => set(({ currentPage }) => ({ take, skip: (currentPage - 1) * take })),
    updateSortParams: (sortParams) => set(({}) => ({ ...sortParams, currentPage: 1, skip: 0 })),
  }))
}
