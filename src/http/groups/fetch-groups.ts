import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const roleSchema = z.enum(['ADMIN', 'MEMBER'])

const groupSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  role: roleSchema,
  name: z.string(),
  description: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  budget: z.string(),
  currency: z.enum(['USD', 'EUR', 'BRL']),
  isMember: z.boolean(),
  isOwner: z.boolean(),
  endDate: z.coerce.date().nullable().optional(),
  drawDate: z.coerce.date().nullable().optional(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

const fetchGroups200ResponseSchema = z.object({
  message: z.literal('Groups fetched successfully'),
  groups: groupSchema.array(),
})

const fetchGroups401ResponseSchema = z.object({
  message: z.enum(['Missing auth token', 'Invalid auth token']),
})

const fetchGroupsResponseSchema = z.union([
  fetchGroups200ResponseSchema,
  fetchGroups401ResponseSchema,
])

type FetchGroupsResponse = z.infer<typeof fetchGroupsResponseSchema>

export async function fetchGroups(): Promise<FetchGroupsResponse> {
  const result = await axiosInstance<FetchGroupsResponse>({
    url: 'groups',
    method: 'GET',
  })

  return result
}
