import { createStore } from 'zustand/vanilla'

export enum DailyDropContentType {
  lose = 'lose',
  spin = 'spin',
  win = 'win',
}

export type DailyDropsState = {
  activeContent: DailyDropContentType
}

export type DailyDropsActions = {
  updateActiveContent: (activeContent: DailyDropContentType) => void
}

export type DailyDropsStore = DailyDropsState & DailyDropsActions

export const defaultInitState: DailyDropsState = {
  activeContent: DailyDropContentType.spin,
}

export const createDailyDropsStore = (initState: DailyDropsState = defaultInitState) => {
  return createStore<DailyDropsStore>()((set) => ({
    ...initState,
    updateActiveContent: (activeContent: DailyDropContentType) => set(() => ({ activeContent })),
  }))
}
