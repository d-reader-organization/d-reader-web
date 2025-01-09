import { decodeJwt } from 'jose/jwt/decode'

export function isTokenValid(token: string): boolean {
  try {
    const decoded = decodeJwt(token)
    const currentTime = Date.now() / 1000
    return !!decoded.exp && decoded.exp >= currentTime
  } catch (_) {
    return false
  }
}
