'use client'

import { RawComic } from '@/models/comic/rawComic'
import { useDashboardStore } from '@/providers/DashboardStoreProvider'
import { ProductsTab } from '@/constants/general'
import { ReleasesTable } from './ReleasesTable'
import SeriesTable from './SeriesTable'

type Props = { initialData: RawComic[] }

export const ProductsTable: React.FC<Props> = ({ initialData }) => {
  const activeTab = useDashboardStore((state) => state.activeTab)

  return activeTab === ProductsTab.Releases ? (
    <ReleasesTable title='My issues' />
  ) : (
    <SeriesTable initialData={initialData} title='My comics & art' />
  )
}
