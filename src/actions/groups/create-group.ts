'use server'

import { createGroup, CreateGroupProps } from '@/http/groups/create-group'
import { AXIOS_INSTANCE } from '@/services/axios-instance'

type CreateGroupInput = {
  data: CreateGroupProps
  token?: string
}

export async function createGroupAction({
  data,
  token = '',
}: CreateGroupInput) {
  AXIOS_INSTANCE.defaults.headers.Authorization = `Bearer ${token}`

  const result = await createGroup({ ...data })

  if (!('id' in result)) return result

  return result
}
