import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const signUpWithGoogleRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(20),
  password: z.string().min(6),
})

type SignUpWithGoogleRequest = z.infer<typeof signUpWithGoogleRequestSchema>

const signUp200ResponseSchema = z.object({
  message: z.literal('User created successfully'),
})

const signUp400ResponseSchema = z.object({
  message: z.literal('Validation error'),
  errors: z
    .object({
      email: z.array(z.string()).optional(),
      name: z.array(z.string()).optional(),
      password: z.array(z.string()).optional(),
    })
    .optional(),
})

const signUp409ResponseSchema = z.object({
  message: z.literal('User with same email already exists'),
})

const signUpResponseSchema = z.union([
  signUp200ResponseSchema,
  signUp400ResponseSchema,
  signUp409ResponseSchema,
])

type SignUpWithGoogleResponse = z.infer<typeof signUpResponseSchema>

export async function signUpWithPassword({
  name,
  email,
  password,
}: SignUpWithGoogleRequest): Promise<SignUpWithGoogleResponse> {
  const result = await axiosInstance<SignUpWithGoogleResponse>({
    url: 'users',
    method: 'POST',
    data: {
      name,
      email,
      password,
    },
  })

  return result
}
