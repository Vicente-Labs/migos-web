import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const createGroup201ResponseSchema = z.object({
  message: z.literal('Group created successfully'),
  id: z.string(),
})

const createGroup400ResponseSchema = z.object({
  message: z.literal('Validation error'),
  errors: z
    .object({
      name: z.array(z.string()).optional(),
      description: z.array(z.string()).optional(),
      budget: z.array(z.string()).optional(),
      currency: z.array(z.string()).optional(),
      avatarUrl: z.array(z.string()).optional(),
      endDate: z.array(z.string()).optional(),
      drawDate: z.array(z.string()).optional(),
    })
    .optional(),
})

const createGroup401ResponseSchema = z.object({
  message: z.enum(['Missing auth token', 'Invalid auth token']),
})

const createGroupResponseSchema = z.union([
  createGroup201ResponseSchema,
  createGroup400ResponseSchema,
  createGroup401ResponseSchema,
])

type CreateGroupResponse = z.infer<typeof createGroupResponseSchema>

export interface CreateGroupProps {
  name: string
  description?: string | null
  budget: number
  currency: string
  avatarUrl?: string | null
  endDate: string
  drawDate: string
}

export async function createGroup({
  name,
  description,
  budget,
  currency,
  avatarUrl,
  endDate,
  drawDate,
}: CreateGroupProps): Promise<CreateGroupResponse> {
  const result = await axiosInstance<CreateGroupResponse>({
    url: `groups`,
    method: 'POST',
    data: {
      name,
      description,
      budget,
      currency,
      avatarUrl,
      endDate,
      drawDate,
    },
  })

  return result
}
