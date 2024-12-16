import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const signInWithGoogleRequestSchema = z.object({
  code: z.string(),
})

type SignInWithGoogleRequest = z.infer<typeof signInWithGoogleRequestSchema>

const signInWithGoogle200ResponseSchema = z.object({
  message: z.literal('Authenticated successfully'),
  token: z.string(),
})

export type SignInWithGoogle200Response = z.infer<
  typeof signInWithGoogle200ResponseSchema
>

const signInWithGoogle400ResponseSchema = z.object({
  message: z.enum([
    'Validation error',
    'User info not found',
    'User not found',
    'Invalid or expired authorization code',
  ]),
  errors: z
    .object({
      code: z.array(z.string()).optional(),
    })
    .optional(),
})

const signInWithGoogle401ResponseSchema = z.object({
  message: z.literal('Invalid credentials'),
})

const signInWithGoogleResponseSchema = z.union([
  signInWithGoogle200ResponseSchema,
  signInWithGoogle400ResponseSchema,
  signInWithGoogle401ResponseSchema,
])

export type SignInWithGoogleResponse = z.infer<
  typeof signInWithGoogleResponseSchema
>

export async function signIpWithGoogle({
  code,
}: SignInWithGoogleRequest): Promise<SignInWithGoogleResponse> {
  const result = await axiosInstance<SignInWithGoogleResponse>({
    url: 'authenticate/google',
    method: 'POST',
    data: {
      code,
    },
  })

  return result
}
