import { Section } from '@/components/discover/filters'
import { SortOrder } from '@/enums/sortOrder'
import { ComicParams } from '@/models/comic/comicParams'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { CreatorParams } from '@/models/creator/creatorParams'
import { Genre } from '@/models/genre-new'
import { createStore } from 'zustand/vanilla'

export type DiscoverFilterState = {
  selectedSection: Section | undefined
  comicParams: ComicParams
  comicIssueParams: ComicIssueParams
  creatorParams: CreatorParams
  completeGenresList: Genre[]
}

export type DiscoverFilterActions = {
  updateSelectedSection: (section: Section | undefined) => void
  updateComicParams: (params: Partial<ComicParams>) => void
  updateComicIssueParams: (params: Partial<ComicIssueParams>) => void
  updateCreatorParams: (params: Partial<CreatorParams>) => void
  updateCompleteGenresList: (genres: Genre[]) => void
  updateAllParamGenreSlugs: (genreSlugs: string[]) => void
}

export type DiscoverFilterStore = DiscoverFilterState & DiscoverFilterActions

export const defaultInitState: DiscoverFilterState = {
  selectedSection: undefined,
  comicParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    creatorSlug: undefined,
    titleSubstring: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
  comicIssueParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    creatorSlug: undefined,
    comicSlug: undefined,
    titleSubstring: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
  creatorParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    nameSubstring: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
  completeGenresList: [],
}

export const createDiscoverFilterStore = (initState: DiscoverFilterState = defaultInitState) => {
  return createStore<DiscoverFilterStore>()((set) => ({
    ...initState,
    updateSelectedSection: (section: Section | undefined) => set(() => ({ selectedSection: section })),
    updateComicParams: (params) => set((state) => ({ comicParams: { ...state.comicParams, ...params } })),
    updateComicIssueParams: (params) =>
      set((state) => ({ comicIssueParams: { ...state.comicIssueParams, ...params } })),
    updateCreatorParams: (params) => set((state) => ({ creatorParams: { ...state.creatorParams, ...params } })),
    updateCompleteGenresList: (genres: Genre[]) => set(() => ({ completeGenresList: genres })),
    updateAllParamGenreSlugs: (genreSlugs: string[]) =>
      set((state) => ({
        comicParams: { ...state.comicParams, genreSlugs: genreSlugs.length ? genreSlugs : undefined },
        comicIssueParams: { ...state.comicIssueParams, genreSlugs: genreSlugs.length ? genreSlugs : undefined },
        creatorParams: { ...state.creatorParams, genreSlugs: genreSlugs.length ? genreSlugs : undefined },
      })),
  }))
}
