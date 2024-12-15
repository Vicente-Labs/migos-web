import 'server-only'

import { cookies } from 'next/headers'

import { getMe } from '@/http/geral/get-me'
import { decrypt } from '@/lib/session'
import { AXIOS_INSTANCE } from '@/services/axios-instance'

export const verifySession = async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (session) {
    AXIOS_INSTANCE.defaults.headers.Authorization = `Bearer ${session.token}`

    try {
      const result = await getMe()

      if (!('user' in result)) return

      return { token: session.token, user: result.user }
    } catch {
      return undefined
    }
  }

  return undefined
}
