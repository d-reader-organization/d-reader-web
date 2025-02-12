import { ComicParams, RawComicParams } from '@/models/comic/comicParams'

export const COMIC_QUERY_KEYS = Object.freeze({
  COMIC: 'comic',
  GET: 'get',
  GET_RAW: 'get-raw',
  CREATE: 'create',
  BY_OWNER: 'by-owner',
  UPDATE: 'update',
  COVER: 'cover',
  BANNER: 'banner',
  FILES: 'files',
  LOGO: 'logo',
  SEARCH: 'search',
  RATE: 'rate',
  SUBSCRIBE: 'subscribe',
  BOOKMARK: 'bookmark',
  FAVOURITISE: 'favouritise',
  PUBLISH: 'publish',
  UNPUBLISH: 'unpublish',
  DELETE: 'delete',
  RECOVER: 'recover',
  FAVORITES: 'favorites',
})

export const comicKeys = Object.freeze({
  getMany: (params: ComicParams) => [
    COMIC_QUERY_KEYS.COMIC,
    COMIC_QUERY_KEYS.GET,
    params.search,
    params.creatorId,
    params.genreSlugs,
    params.filterTag,
    params.sortOrder,
    params.sortTag,
    params.skip,
    params.take,
  ],
  getManyRaw: (params: RawComicParams) => [
    COMIC_QUERY_KEYS.COMIC,
    COMIC_QUERY_KEYS.GET_RAW,
    params.search,
    params.creatorId,
    params.genreSlugs,
    params.sortOrder,
    params.sortTag,
    params.skip,
    params.take,
  ],
  get: (slug: string) => [COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET, slug],
  getRaw: (slug: string) => [COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET_RAW, slug],
  getByOwner: (userId: string | number) => [
    COMIC_QUERY_KEYS.COMIC,
    COMIC_QUERY_KEYS.GET,
    COMIC_QUERY_KEYS.BY_OWNER,
    userId,
  ],
})
