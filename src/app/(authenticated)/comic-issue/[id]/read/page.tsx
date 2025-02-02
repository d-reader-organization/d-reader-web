import { fetchCollectibleComics } from '@/app/lib/api/asset/queries'
import { fetchComicIssue, fetchComicIssuePages } from '@/app/lib/api/comicIssue/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { getAccessToken } from '@/app/lib/utils/auth'
import { ComicIssuePages } from '@/components/comicIssue/Pages'
import { PreviewPagesBackgroundIcon } from '@/components/icons/PreviewPagesBackgroundIcon'
import { EReaderNavigation } from '@/components/layout/EReaderNavigation'
import { ReadMoreButton } from '@/components/shared/buttons/ReadMoreButton'
import { UnwrapIssueDialog } from '@/components/shared/dialogs/UnwrapIssueDialog'
import { ComicIssuePageParams } from '@/models/common'
import React from 'react'

export default async function ReadComicIssuePage(props: ComicIssuePageParams) {
  const params = await props.params
  const accessToken = await getAccessToken()
  const pages = await fetchComicIssuePages({ id: params.id, accessToken })
  const comicIssue = await fetchComicIssue({ id: params.id, accessToken })
  const me = await fetchMe()

  if (!pages || !comicIssue) return null

  const collectibleComics = await fetchCollectibleComics({
    comicIssueId: params.id,
    userId: me?.id,
  })

  const hasUnusedCollectibleComics = collectibleComics.some((collectibleComic) => !collectibleComic.isUsed)
  return (
    <>
      <EReaderNavigation comicIssue={comicIssue} />
      <main className='flex flex-col justify-center items-center max-w-screen-md mb-16 mx-auto'>
        <ComicIssuePages pages={pages} />
        {(!comicIssue.myStats?.canRead || !comicIssue.isFullyUploaded) && (
          <div className='rounded-2xl relative m-4 w-full border-2 border-grey-300 p-4 min-h-80'>
            <PreviewPagesBackgroundIcon className='w-full h-auto brightness-50' />
            <div className='flex flex-col gap-2 absolute text-center p-4 top-1/2 left-1/2 w-full max-w-[380px] transform -translate-x-1/2 -translate-y-1/2'>
              {!me && <ReadMoreButton />}
              {!!me && !comicIssue.myStats?.canRead && (
                <>
                  <p className='text-lg sm:text-xl font-bold'>This is a comic preview!</p>
                  <p className='text-sm sm:text-base md:text-xl'>
                    To view all pages you need to own at least one <strong>opened</strong> copy of this item.
                  </p>
                </>
              )}
              {!!me && (
                <UnwrapIssueDialog
                  collectibleComics={collectibleComics}
                  showUnwrapButton={hasUnusedCollectibleComics && !comicIssue.myStats?.canRead}
                />
              )}
              {!comicIssue.isFullyUploaded && (
                <p className='preview-message-text'>
                  This comic is not yet fully uploaded. New chapters/pages might be added weekly.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
