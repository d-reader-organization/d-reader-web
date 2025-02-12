import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { Comic, SearchResultComic } from '@/models/comic'
import { ComicParams, RawComicParams } from '@/models/comic/comicParams'
import { fetchWrapper } from '../../fetchWrapper'
import { Nullable } from '@/models/common'
import { RawComic } from '@/models/comic/rawComic'

const { BY_OWNER, COMIC, FAVORITES, GET, GET_RAW, SEARCH } = COMIC_QUERY_KEYS

export const fetchComics = async (params: ComicParams): Promise<Comic[]> => {
  const { data } = await fetchWrapper<Comic[]>({
    params,
    path: `${COMIC}/${GET}`,
    revalidateCacheInSeconds: 15 * 60,
  })
  return data ?? []
}

export const fetchRawComics = async (params: RawComicParams): Promise<RawComic[]> => {
  const { data } = await fetchWrapper<RawComic[]>({
    params,
    path: `${COMIC}/${GET_RAW}`,
    revalidateCacheInSeconds: 15,
  })
  return data ?? []
}

export const fetchComic = async ({
  accessToken,
  slug,
}: {
  accessToken?: string
  slug: string
}): Promise<Nullable<Comic>> => {
  const { data } = await fetchWrapper<Comic>({
    accessToken,
    path: `${COMIC}/${GET}/${slug}`,
  })

  return data
}

export const searchComics = async (params: ComicParams): Promise<SearchResultComic[]> => {
  const { data } = await fetchWrapper<SearchResultComic[]>({
    params,
    path: `${COMIC}/${SEARCH}`,
  })
  return data ?? []
}

export const fetchComicsByOwner = async ({
  params,
  userId,
}: {
  params: ComicParams
  userId: number
}): Promise<Comic[]> => {
  const { data } = await fetchWrapper<Comic[]>({
    params,
    path: `${COMIC}/${GET}/${BY_OWNER}/${userId}`,
    revalidateCacheInSeconds: 60,
  })

  return data ?? []
}

export const fetchFavoriteComics = async ({ params, userId }: { params: ComicParams; userId: number }) => {
  const response = await fetchWrapper<Comic[]>({
    params,
    path: `${COMIC}/${GET}/${FAVORITES}/${userId}`,
    revalidateCacheInSeconds: 10,
  })

  return response.data ?? []
}
