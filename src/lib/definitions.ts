import type { SignInWithGoogle200Response } from '@/http/auth/sign-in-with-google'
import type { SignInWithPassword200Response } from '@/http/auth/sign-in-with-passoword'

export type SessionPayload =
  | Pick<SignInWithGoogle200Response, 'token'>
  | Pick<SignInWithPassword200Response, 'token'>
