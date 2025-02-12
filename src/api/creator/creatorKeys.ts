import { CreatorParams } from '@/models/creator/creatorParams'

export const CREATOR_QUERY_KEYS = Object.freeze({
  CREATOR: 'creator',
  GET: 'get',
  ME: 'me',
  UPDATE: 'update',
  UPDATE_PASSWORD: 'update-password',
  RESET_PASSWORD: 'reset-password',
  REQUEST_EMAIL_VERIFICATION: 'request-email-verification',
  VERIFY_EMAIL: 'verify-email',
  SEARCH: 'search',
  FILES: 'files',
  AVATAR: 'avatar',
  BANNER: 'banner',
  LOGO: 'logo',
  DELETE: 'delete',
  RECOVER: 'recover',
  FOLLOW: 'follow',
})

export const creatorKeys = Object.freeze({
  getMany: (params: CreatorParams) => [
    CREATOR_QUERY_KEYS.CREATOR,
    CREATOR_QUERY_KEYS.GET,
    params.search,
    params.genreSlugs,
    params.filterTag,
    params.sortOrder,
    params.sortTag,
    params.skip,
    params.take,
  ],
  get: (slug: string) => [CREATOR_QUERY_KEYS.CREATOR, CREATOR_QUERY_KEYS.GET, slug],
  getMe: [CREATOR_QUERY_KEYS.CREATOR, CREATOR_QUERY_KEYS.GET, CREATOR_QUERY_KEYS.ME],
})
