'use server'

import { redirect } from 'next/navigation'

import { postAuthenticatePassword } from '@/http/auth'
import { createSession } from '@/lib/session'

type SignInInput = {
  email: string
  password: string
  redirectTo?: string
}

export async function signIn({ email, password, redirectTo }: SignInInput) {
  const { token, message } = await postAuthenticatePassword({ email, password })

  if (token) {
    await createSession({ token })

    if (redirectTo) redirect(redirectTo)
  }

  return { message }
}
