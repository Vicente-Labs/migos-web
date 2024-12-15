import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const signInWithPasswordRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type SignInWithPasswordRequest = z.infer<typeof signInWithPasswordRequestSchema>

const signUp200ResponseSchema = z.object({
  message: z.literal('Authenticated successfully'),
  token: z.string(),
})

const signUp400ResponseSchema = z.object({
  message: z.literal('Validation error'),
  errors: z
    .object({
      name: z.array(z.string()).optional(),
      password: z.array(z.string()).optional(),
    })
    .optional(),
})

const signUp401ResponseSchema = z.object({
  message: z.literal('Invalid credentials'),
})

export type SignUp200ResponseSchema = z.infer<typeof signUp200ResponseSchema>
export type SignUp400ResponseSchema = z.infer<typeof signUp400ResponseSchema>
export type SignUp401ResponseSchema = z.infer<typeof signUp401ResponseSchema>

const signUpResponseSchema = z.union([
  signUp200ResponseSchema,
  signUp400ResponseSchema,
  signUp401ResponseSchema,
])

type SignInWithPasswordResponse = z.infer<typeof signUpResponseSchema>

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest): Promise<SignInWithPasswordResponse> {
  const result = await axiosInstance<SignInWithPasswordResponse>({
    url: 'authenticate/password',
    method: 'POST',
    data: {
      email,
      password,
    },
  })

  return result
}
