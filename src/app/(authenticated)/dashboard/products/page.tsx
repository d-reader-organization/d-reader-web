import { fetchRawComics } from '@/app/lib/api/comic/queries'
import { fetchMe } from '@/app/lib/api/creator/queries'
import { getAccessToken } from '@/app/lib/utils/auth'
import { CreatorDashboardLayout } from '@/components/layout/CreatorDashboardLayout'
import { ProductsTableWrapper } from '@/components/table/ProductsTableWrapper'
import SignatureRequestsTable from '@/components/table/SignatureRequestsTable'
import { SORT_OPTIONS } from '@/constants/general'
import { RoutePath } from '@/enums/routePath'
import { SortOrder } from '@/enums/sort'
import { ComicSortTag } from '@/models/comic/comicParams'
import { TableStoreProvider } from '@/providers/TableStoreProvider'
import React from 'react'

export default async function ProductsPage() {
  const accessToken = await getAccessToken()
  const me = await fetchMe({ accessToken })

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
      <TableStoreProvider
        sortOptions={SORT_OPTIONS.COMICS}
        sortOrder={SortOrder.ASC}
        sortTag={ComicSortTag.Published}
        totalPages={comics.length} // this will come from backend
      >
        <ProductsTableWrapper initialData={comics} />
      </TableStoreProvider>
      <SignatureRequestsTable title='Signature requests' creatorId={me.id} accessToken={accessToken} />
    </CreatorDashboardLayout>
  )
}
