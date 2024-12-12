import {
  GetAuthenticateGoogle200,
  type PostAuthenticatePassword200,
} from '@/http/endpoints.schemas'

export type SessionPayload =
  | Pick<PostAuthenticatePassword200, 'token'>
  | Pick<GetAuthenticateGoogle200, 'token'>
