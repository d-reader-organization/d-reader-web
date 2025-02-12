import { fetchRawComics } from '@/app/lib/api/comic/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import { ProductsTableWrapper } from '@/components/table/ProductsTableWrapper'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import { SORT_OPTIONS } from '@/constants/general'
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
        sortOptions={SORT_OPTIONS.COMICS}
        sortOrder={SortOrder.ASC}
        sortTag={ComicSortTag.Published}
        totalPages={comics.length} // this will come from backend
      >
        <ProductsTableWrapper initialData={comics} />
      </DashboardStoreProvider>
      <SignatureRequestsTable title='Signature requests' />
    </CreatorDashboardLayout>
  )
}
