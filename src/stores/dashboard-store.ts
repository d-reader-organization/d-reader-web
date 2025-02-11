import { ProductsTab, SORT_OPTIONS } from '@/constants/general'
import { SortOrder } from '@/enums/sort'
import { ComicSortTag } from '@/models/comic/comicParams'
import { createStore } from 'zustand/vanilla'

export type DashboardState = {
  activeTab: string
  currentPage: number
  sortOrder: SortOrder
  skip: number
  sortOptions: Array<{ value: string; order: SortOrder; label: string }>
  sortTag: string
  tabs: ProductsTab[] //string[]
  take: number
  totalPages: number
}

type DashboardActions = {
  handleTabChange: (tab: string) => void
  setCurrentPage: (page: number) => void
  setTakePerPage: (take: number) => void
  updateSortParams: ({ sortOrder, sortTag }: { sortOrder: SortOrder; sortTag: string }) => void
}

export type DashboardStore = DashboardState & DashboardActions

export const defaultInitState: DashboardState = {
  activeTab: '',
  sortOptions: SORT_OPTIONS.COMICS,
  sortOrder: SortOrder.ASC,
  sortTag: ComicSortTag.Published,
  currentPage: 1,
  skip: 0,
  take: 5,
  tabs: [],
  totalPages: 0,
}

export const createDashboardStore = (initState: DashboardState = defaultInitState) => {
  return createStore<DashboardStore>()((set) => ({
    ...initState,
    handleTabChange: (tab: string) =>
      set(() => {
        const sortOptions = tab === 'Releases' ? SORT_OPTIONS.COMIC_ISSUES : SORT_OPTIONS.COMICS
        const initial = sortOptions.at(0)!
        return {
          activeTab: tab,
          sortOrder: initial.order,
          sortTag: initial.value,
          sortOptions,
          skip: 0,
          currentPage: 1,
        }
      }),
    setCurrentPage: (page: number) =>
      set(({ take }) => {
        return { currentPage: page, skip: (page - 1) * take }
      }),
    setTakePerPage: (take: number) => set(({ currentPage }) => ({ take, skip: (currentPage - 1) * take })),
    updateSortParams: (sortParams) => set(({}) => ({ ...sortParams, currentPage: 1, skip: 0 })),
  }))
}
