import { AxiosError } from 'axios'
import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const signInWithPasswordRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type SignInWithPasswordRequest = z.infer<typeof signInWithPasswordRequestSchema>

const signInWithPassword200ResponseSchema = z.object({
  message: z.literal('Authenticated successfully'),
  token: z.string(),
})

const signInWithPassword400ResponseSchema = z.object({
  message: z.literal('Validation error'),
  errors: z
    .object({
      name: z.array(z.string()).optional(),
      password: z.array(z.string()).optional(),
    })
    .optional(),
})

const signInWithPassword401ResponseSchema = z.object({
  message: z.literal('Invalid credentials'),
})

export type SignInWithPassword200Response = z.infer<
  typeof signInWithPassword200ResponseSchema
>
export type SignInWithPassword400Response = z.infer<
  typeof signInWithPassword400ResponseSchema
>
export type SignInWithPassword401Response = z.infer<
  typeof signInWithPassword401ResponseSchema
>

const signInWithPasswordResponseSchema = z.union([
  signInWithPassword200ResponseSchema,
  signInWithPassword400ResponseSchema,
  signInWithPassword401ResponseSchema,
])

export type SignInWithPasswordResponse = z.infer<
  typeof signInWithPasswordResponseSchema
>

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest): Promise<SignInWithPasswordResponse> {
  try {
    const result = await axiosInstance<SignInWithPasswordResponse>({
      url: 'authenticate/password',
      method: 'POST',
      data: {
        email,
        password,
      },
    })

    return result
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401)
        return signInWithPassword401ResponseSchema.parse(error.response?.data)

      if (error.response?.status === 400)
        return signInWithPassword400ResponseSchema.parse(error.response?.data)
    }

    throw error
  }
}
