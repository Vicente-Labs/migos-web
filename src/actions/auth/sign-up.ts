'use server'

import { postUsers } from '@/http/auth'
import type { PostUsersBody } from '@/http/endpoints.schemas'

type SignUpParams = PostUsersBody

export async function signUp({ name, email, password }: SignUpParams) {
  const { message } = await postUsers({ name, email, password })

  return { message }
}
