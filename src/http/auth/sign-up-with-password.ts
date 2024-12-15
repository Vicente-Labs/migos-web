import { AxiosError } from 'axios'
import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const signUpWithPasswordRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(20),
  password: z.string().min(6),
})

type SignUpWithPasswordRequest = z.infer<typeof signUpWithPasswordRequestSchema>

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

type SignUpWithPasswordResponse = z.infer<typeof signUpResponseSchema>

export async function signUpWithPassword({
  name,
  email,
  password,
}: SignUpWithPasswordRequest): Promise<SignUpWithPasswordResponse> {
  try {
    const result = await axiosInstance<SignUpWithPasswordResponse>({
      url: 'users',
      method: 'POST',
      data: {
        name,
        email,
        password,
      },
    })

    return result
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409)
        return signUp409ResponseSchema.parse(error.response?.data)

      return signUp400ResponseSchema.parse(error.response?.data)
    }
    throw error
  }
}
