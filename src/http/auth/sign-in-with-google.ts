import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const signInWithGoogleRequestSchema = z.object({
  code: z.string(),
})

type SignInWithGoogleRequest = z.infer<typeof signInWithGoogleRequestSchema>

const signUp200ResponseSchema = z.object({
  message: z.literal('Authenticated successfully'),
  token: z.string(),
})

const signUp400ResponseSchema = z.object({
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

const signUp401ResponseSchema = z.object({
  message: z.literal('Invalid credentials'),
})

const signUpResponseSchema = z.union([
  signUp200ResponseSchema,
  signUp400ResponseSchema,
  signUp401ResponseSchema,
])

type SignInWithGoogleResponse = z.infer<typeof signUpResponseSchema>

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
