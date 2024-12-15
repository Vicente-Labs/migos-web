'use server'

import { signUpWithPassword } from '@/http/auth/sign-up-with-password'

type SignUpParams = {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: SignUpParams) {
  const result = await signUpWithPassword({ name, email, password })

  return result
}
