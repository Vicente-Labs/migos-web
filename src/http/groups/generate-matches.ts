import { z } from 'zod'

import { axiosInstance } from '@/services/axios-instance'

const generateMatches201ResponseSchema = z.object({
  message: z.literal('Matches generated successfully'),
})

const generateMatches400ResponseSchema = z.object({
  message: z.enum([
    'Group must have at least 2 members',
    'Number of members must be a even number',
  ]),
})

const generateMatches401ResponseSchema = z.object({
  message: z.enum([
    'You are not able to perform this action',
    'Missing auth token',
    'Invalid token',
    `You're not a member of this group`,
  ]),
})

const generateMatchesResponseSchema = z.union([
  generateMatches201ResponseSchema,
  generateMatches400ResponseSchema,
  generateMatches401ResponseSchema,
])

type GenerateMatchesResponse = z.infer<typeof generateMatchesResponseSchema>

export interface GenerateMatchesProps {
  groupId: string
}

export async function generateMatches({
  groupId,
}: GenerateMatchesProps): Promise<GenerateMatchesResponse> {
  const result = await axiosInstance<GenerateMatchesResponse>({
    url: `groups/${groupId}/generate-matches`,
    method: 'PATCH',
  })

  return result
}
