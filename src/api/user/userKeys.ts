import { UserParams } from '@/models/user/userParams'

export const USER_QUERY_KEYS = Object.freeze({
  USER: 'user',
  GET: 'get',
  ME: 'me',
  CREATE: 'create',
  UPDATE: 'update',
  REMOVE: 'remove',
  UPDATE_PASSWORD: 'update-password',
  RESET_PASSWORD: 'reset-password',
  REQUEST_EMAIL_VERIFICATION: 'request-email-verification',
  REQUEST_PASSWORD_RESET: 'request-password-reset',
  REQUEST_EMAIL_CHANGE: 'request-email-change',
  VERIFY_EMAIL: 'verify-email',
  AVATAR: 'avatar',
  REDEEM_REFERRAL: 'redeem-referral',
  ASSETS: 'assets',
  WALLETS: 'wallets',
  DELETE: 'delete',
  RECOVER: 'recover',
  SYNC_WALLETS: 'sync-wallets',
  PRIVACY_CONSENT: 'privacy-consent',
})

export const userKeys = Object.freeze({
  getMany: (params: UserParams) => [USER_QUERY_KEYS.USER, USER_QUERY_KEYS.GET, params.skip, params.take],
  get: (id: string | number) => [USER_QUERY_KEYS.USER, USER_QUERY_KEYS.GET, id],
  getMe: [USER_QUERY_KEYS.USER, USER_QUERY_KEYS.GET, USER_QUERY_KEYS.ME],
  getAssets: (id: string | number) => [USER_QUERY_KEYS.USER, USER_QUERY_KEYS.GET, id, USER_QUERY_KEYS.ASSETS],
  getWallets: (id: string | number) => [USER_QUERY_KEYS.USER, USER_QUERY_KEYS.GET, id, USER_QUERY_KEYS.WALLETS],
  syncWallets: (id: string | number) => [USER_QUERY_KEYS.USER, USER_QUERY_KEYS.SYNC_WALLETS, id],
})
