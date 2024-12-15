'use server'

import { signInWithPassword } from '@/http/auth/sign-in-with-passoword'
import { createSession } from '@/lib/session'

type SignInInput = {
  email: string
  password: string
  redirectTo?: string
}

export async function signIn({ email, password }: SignInInput) {
  const result = await signInWithPassword({ email, password })

  if ('token' in result)
    await createSession({
      token: result.token,
    })

  return result
}
