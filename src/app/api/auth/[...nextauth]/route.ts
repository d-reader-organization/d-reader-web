import { accessTokenKey, googleAccessTokenKey, redirectToKey, refreshTokenKey } from '@/constants/general'
import { Authorization } from '@/models/auth'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'
import NextAuth from 'next-auth'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    redirect: async (params) => {
      const url = new URL(params.url)
      const redirectTo = url.searchParams.get(redirectToKey) ?? ''
      return redirectTo ? `${params.baseUrl}${redirectTo}` : params.url
    },
    signIn: async ({ account }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login-with-google`, {
        method: 'PATCH',
        headers: {
          authorization: `Google ${account?.access_token}`,
        },
      })
      const parsed: Authorization | string = await response.json()
      const requestCookies = cookies()
      if (typeof parsed === 'string') {
        requestCookies.set(googleAccessTokenKey, account?.access_token ?? '')
        return parsed
      }

      requestCookies.set(accessTokenKey, parsed.accessToken)
      requestCookies.set(refreshTokenKey, parsed.refreshToken)
      return true
    },
  },
})

export { handler as GET, handler as POST }
