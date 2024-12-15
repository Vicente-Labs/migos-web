import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().nullable(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

const signUp200ResponseSchema = z.object({
  message: z.literal('User found'),
  user: userSchema,
})

const getMe401ResponseSchema = z.object({
  message: z.enum(['Missing auth token', 'Invalid auth token']),
})

const getMe404ResponseSchema = z.object({
  message: z.literal('User not found'),
})

const getMeResponseSchema = z.union([
  signUp200ResponseSchema,
  getMe401ResponseSchema,
  getMe404ResponseSchema,
])

type GetMeResponse = z.infer<typeof getMeResponseSchema>

export async function getMe(): Promise<GetMeResponse> {
  const result = await axiosInstance<GetMeResponse>({
    url: 'me',
    method: 'GET',
  })

  return result
}
