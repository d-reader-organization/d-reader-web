import { fetchRawComics } from '@/app/lib/api/comic/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import { ProductsTable } from '@/components/table/ProductsTable'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import { DASHBOARD_TABS, SORT_OPTIONS } from '@/constants/general'
import { RoutePath } from '@/enums/routePath'
import { SortOrder } from '@/enums/sort'
import { ComicSortTag } from '@/models/comic/comicParams'
import { DashboardStoreProvider } from '@/providers/DashboardStoreProvider'
import React from 'react'

export default async function ProductsPage() {
  const me = await fetchMe()

  if (!me) {
    return null
  }
  const comics = await fetchRawComics({
    skip: 0,
    take: 5,
    sortOrder: SortOrder.ASC,
    sortTag: ComicSortTag.Published as ComicSortTag,
  })

  return (
    <CreatorDashboardLayout title='Products' activePath={RoutePath.DashboardProducts}>
      <DashboardStoreProvider
        activeTab={'Series'}
        currentPage={1}
        sortOptions={SORT_OPTIONS.COMICS}
        sortOrder={SortOrder.ASC}
        skip={0}
        sortTag={ComicSortTag.Published}
        tabs={DASHBOARD_TABS}
        take={5}
        totalPages={17} // this will come from backend
      >
        <ProductsTable initialData={comics} />
      </DashboardStoreProvider>
      <SignatureRequestsTable title='Signature requests' />
    </CreatorDashboardLayout>
  )
}
