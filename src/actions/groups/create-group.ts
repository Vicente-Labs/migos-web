'use server'

import { postGroups, PostGroupsMutationBody } from '@/http/group'

type CreateGroupInput = {
  data: PostGroupsMutationBody
}

export async function createGroup({ data }: CreateGroupInput) {
  const { id, message } = await postGroups({ ...data })

  if (message && !id) throw new Error(message)

  return { id, message }
}
