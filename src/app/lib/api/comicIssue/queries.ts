import { ComicIssue } from '@/models/comicIssue'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { fetchWrapper } from '../../fetchWrapper'
import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { Nullable } from '@/models/common'
import { ComicPage } from '@/models/comic/comicPage'
import { OwnedCollectibleComic } from '@/models/asset'
import { RawComicIssue } from '@/models/comicIssue/rawComicIssue'

const { BY_OWNER, COMIC_ISSUE, GET, GET_PUBLIC, GET_RAW, PAGES } = COMIC_ISSUE_QUERY_KEYS

export const fetchComicIssues = async (params: ComicIssueParams): Promise<ComicIssue[]> => {
  const { data } = await fetchWrapper<ComicIssue[]>({
    params,
    path: `${COMIC_ISSUE}/${GET}`,
    revalidateCacheInSeconds: 60,
  })
  return data ?? []
}

export const fetchRawComicIssues = async (params: ComicIssueParams): Promise<RawComicIssue[]> => {
  const response = await fetchWrapper<RawComicIssue[]>({
    params,
    path: `${COMIC_ISSUE}/${GET_RAW}`,
    revalidateCacheInSeconds: 15,
  })
  return response.data ?? []
}

export const fetchComicIssue = async ({
  accessToken,
  id,
}: {
  accessToken?: string
  id: string | number
}): Promise<Nullable<ComicIssue>> => {
  const response = await fetchWrapper<ComicIssue>({ accessToken, path: `${COMIC_ISSUE}/${GET}/${id}` })
  return response.data
}

export const fetchComicIssuePages = async ({
  accessToken,
  id,
}: {
  accessToken?: string
  id: string | number
}): Promise<ComicPage[]> => {
  const response = await fetchWrapper<ComicPage[]>({ accessToken, path: `${COMIC_ISSUE}/${GET}/${id}/${PAGES}` })
  return response.data ?? []
}

export const fetchPublicComicIssue = async (id: string | number): Promise<Nullable<ComicIssue>> => {
  const response = await fetchWrapper<ComicIssue>({
    path: `${COMIC_ISSUE}/${GET_PUBLIC}/${id}`,
    revalidateCacheInSeconds: 10,
  })
  return response.data
}

export const fetchOwnedCollectibleComics = async ({
  params,
  userId,
}: {
  params: ComicIssueParams
  userId: number
}): Promise<OwnedCollectibleComic[]> => {
  const response = await fetchWrapper<OwnedCollectibleComic[]>({
    path: `${COMIC_ISSUE}/${GET}/${BY_OWNER}/${userId}`,
    params,
    revalidateCacheInSeconds: 10,
  })
  return response.data ?? []
}
