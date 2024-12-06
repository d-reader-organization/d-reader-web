import { ComicParams } from '@/models/comic/comicParams'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { CreatorParams } from '@/models/creator/creatorParams'
import { Genre } from '@/models/genre'
import { createStore } from 'zustand/vanilla'

export type DiscoverQueryParamsStoreState = {
  completeGenresList: Genre[]
  comicParams: ComicParams
  comicIssueParams: ComicIssueParams
  creatorParams: CreatorParams
}

export type DiscoverQueryParamsStoreActions = {
  resetToDefaultInitState: () => void
  updateSearch: (search: string | undefined) => void
  updateCompleteGenresList: (genres: Genre[]) => void
  updateAllParamGenreSlugs: (genreSlugs: string[]) => void
  updateComicParams: (params: Partial<ComicParams>) => void
  updateComicIssueParams: (params: Partial<ComicIssueParams>) => void
  updateCreatorParams: (params: Partial<CreatorParams>) => void
}

export type DiscoverQueryParamsStore = DiscoverQueryParamsStoreState & DiscoverQueryParamsStoreActions

export const defaultInitState: DiscoverQueryParamsStoreState = {
  completeGenresList: [],
  comicParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    creatorSlug: undefined,
    search: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
  comicIssueParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    creatorSlug: undefined,
    search: undefined,
    comicSlug: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
  creatorParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    search: undefined,
    sortOrder: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
}

export const createDiscoverQueryParamsStore = (initState: DiscoverQueryParamsStoreState = defaultInitState) => {
  return createStore<DiscoverQueryParamsStore>()((set) => ({
    ...initState,
    resetToDefaultInitState: () =>
      set((state) => ({
        ...defaultInitState,
        completeGenresList: state.completeGenresList,
      })),
    updateSearch: (search) =>
      set((state) => ({
        comicParams: {
          ...state.comicParams,
          search,
        },
        comicIssueParams: {
          ...state.comicIssueParams,
          search,
        },
        creatorParams: {
          ...state.creatorParams,
          search,
        },
      })),
    updateCompleteGenresList: (genres) =>
      set(() => ({
        completeGenresList: genres,
      })),
    updateAllParamGenreSlugs: (genreSlugs) =>
      set((state) => ({
        comicParams: {
          ...state.comicParams,
          genreSlugs: genreSlugs.length ? genreSlugs : undefined,
        },
        comicIssueParams: {
          ...state.comicIssueParams,
          genreSlugs: genreSlugs.length ? genreSlugs : undefined,
        },
        creatorParams: {
          ...state.creatorParams,
          genreSlugs: genreSlugs.length ? genreSlugs : undefined,
        },
      })),
    updateComicParams: (params) =>
      set((state) => ({
        comicParams: { ...state.comicParams, ...params },
      })),
    updateComicIssueParams: (params) =>
      set((state) => ({
        comicIssueParams: { ...state.comicIssueParams, ...params },
      })),
    updateCreatorParams: (params) =>
      set((state) => ({
        creatorParams: { ...state.creatorParams, ...params },
      })),
  }))
}
