import { NextRequest, NextResponse } from 'next/server'
import { RoutePath } from './enums/routePath'
import { accessTokenKey, jwtCookieProps, REDIRECT_TO_KEY, refreshTokenKey } from './constants/general'
import { refreshTokenCall } from './app/lib/api/auth/mutations'
import { isTokenValid } from './app/lib/utils/jwt'

const allowedOrigins = ['https://dial.to']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function middleware(request: NextRequest) {
  const requestUrlPath = request.nextUrl.pathname
  const isAuthenticatedUser = isTokenValid(request.cookies.get(accessTokenKey)?.value ?? '')
  if (authRoutesRegex.test(requestUrlPath)) {
    const refreshToken = request.cookies.get(refreshTokenKey)?.value ?? ''
    if (!isAuthenticatedUser) {
      return await handleUnauthorized({
        path: requestUrlPath,
        refreshToken,
        url: request.url,
      })
    }
  }

  if (requestUrlPath.includes(RoutePath.Login) && isAuthenticatedUser) {
    const redirectTo = request.nextUrl.searchParams.get(REDIRECT_TO_KEY)
    return NextResponse.redirect(new URL(redirectTo ?? RoutePath.Home, request.url))
  }

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle simple requests
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    '/claim/:path+',
    '/discover/:path+',
    '/invest/:path+/express-interest',
    '/library/:path*',
    '/profile',
    '/circle',
    '/creator/:path*',
    '/mint/:path+',
    '/api/:path*',
    '/login/:path*',
  ],
}

const authRoutesRegex = /^\/(library|profile|claim|circle|invest\/[^/]+\/express-interest)(\/.*)?$/

const handleUnauthorized = async ({ path, refreshToken, url }: { path: string; refreshToken: string; url: string }) => {
  if (refreshToken) {
    const newToken = await refreshTokenCall(refreshToken)

    if (newToken) {
      const response = NextResponse.redirect(url)
      response.cookies.set(accessTokenKey, newToken, jwtCookieProps)
      return response
    }
  }
  const updatedUrl = new URL(RoutePath.Login, url)
  updatedUrl.searchParams.append(REDIRECT_TO_KEY, path)
  return NextResponse.redirect(updatedUrl)
}
