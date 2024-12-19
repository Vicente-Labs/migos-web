import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().nullable().optional(),
})

export type Member = z.infer<typeof memberSchema>

const groupSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  avatarUrl: z.string().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  budget: z.string(),
  currency: z.enum(['USD', 'EUR', 'BRL']),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  endDate: z.coerce.date(),
  drawDate: z.coerce.date().nullable().optional(),
  membersCount: z.number(),
  members: memberSchema.array(),

  timesMatchesGenerated: z.number(),
})

export type Group = z.infer<typeof groupSchema>

const getGroup200ResponseSchema = z.object({
  message: z.literal('Group fetched successfully'),
  group: groupSchema,
})

const getGroup401ResponseSchema = z.object({
  message: z.enum(['Missing auth token', 'Invalid auth token']),
})

const getGroupResponseSchema = z.union([
  getGroup200ResponseSchema,
  getGroup401ResponseSchema,
])

type GetGroupResponse = z.infer<typeof getGroupResponseSchema>

export type GetGroup200 = z.infer<typeof getGroup200ResponseSchema>

export async function getGroup({
  groupId,
}: {
  groupId: string
}): Promise<GetGroupResponse> {
  const result = await axiosInstance<GetGroupResponse>({
    url: `groups/${groupId}`,
    method: 'GET',
  })

  return result
}
