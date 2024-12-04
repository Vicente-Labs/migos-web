/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Migos | API Specs
 * API documentation for Migos
 * OpenAPI spec version: 0.0.0
 */
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { axiosInstance } from '../services/axios-instance'
import type {
  GetGroupsGroupIdInvites200,
  GetGroupsGroupIdInvites400,
  GetGroupsGroupIdInvites401,
  GetGroupsGroupIdInvites500,
  GetInvitesInviteId200,
  GetInvitesInviteId400,
  GetInvitesInviteId401,
  GetInvitesInviteId500,
  GetPendingInvites200,
  GetPendingInvites400,
  GetPendingInvites401,
  GetPendingInvites500,
  PostGroupGroupIdInvites201,
  PostGroupGroupIdInvites400,
  PostGroupGroupIdInvites401,
  PostGroupGroupIdInvites500,
  PostGroupGroupIdInvitesBody,
  PostGroupsGroupIdInvitesInviteIdRevoke201,
  PostGroupsGroupIdInvitesInviteIdRevoke400,
  PostGroupsGroupIdInvitesInviteIdRevoke401,
  PostGroupsGroupIdInvitesInviteIdRevoke500,
  PostInvitesInviteIdAccept201,
  PostInvitesInviteIdAccept400,
  PostInvitesInviteIdAccept401,
  PostInvitesInviteIdAccept500,
} from './endpoints.schemas'

/**
 * @summary Create a group invite
 */
export const postGroupGroupIdInvites = (
  groupId: string,
  postGroupGroupIdInvitesBody: PostGroupGroupIdInvitesBody,
  signal?: AbortSignal,
) => {
  return axiosInstance<PostGroupGroupIdInvites201>({
    url: `/group/${groupId}/invites`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: postGroupGroupIdInvitesBody,
    signal,
  })
}

export const getPostGroupGroupIdInvitesMutationOptions = <
  TError =
    | PostGroupGroupIdInvites400
    | PostGroupGroupIdInvites401
    | PostGroupGroupIdInvites500,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postGroupGroupIdInvites>>,
    TError,
    { groupId: string; data: PostGroupGroupIdInvitesBody },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof postGroupGroupIdInvites>>,
  TError,
  { groupId: string; data: PostGroupGroupIdInvitesBody },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postGroupGroupIdInvites>>,
    { groupId: string; data: PostGroupGroupIdInvitesBody }
  > = (props) => {
    const { groupId, data } = props ?? {}

    return postGroupGroupIdInvites(groupId, data)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostGroupGroupIdInvitesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postGroupGroupIdInvites>>
>
export type PostGroupGroupIdInvitesMutationBody = PostGroupGroupIdInvitesBody
export type PostGroupGroupIdInvitesMutationError =
  | PostGroupGroupIdInvites400
  | PostGroupGroupIdInvites401
  | PostGroupGroupIdInvites500

/**
 * @summary Create a group invite
 */
export const usePostGroupGroupIdInvites = <
  TError =
    | PostGroupGroupIdInvites400
    | PostGroupGroupIdInvites401
    | PostGroupGroupIdInvites500,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postGroupGroupIdInvites>>,
    TError,
    { groupId: string; data: PostGroupGroupIdInvitesBody },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof postGroupGroupIdInvites>>,
  TError,
  { groupId: string; data: PostGroupGroupIdInvitesBody },
  TContext
> => {
  const mutationOptions = getPostGroupGroupIdInvitesMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Accept a group invite
 */
export const postInvitesInviteIdAccept = (
  inviteId: string,
  signal?: AbortSignal,
) => {
  return axiosInstance<PostInvitesInviteIdAccept201>({
    url: `/invites/${inviteId}/accept`,
    method: 'POST',
    signal,
  })
}

export const getPostInvitesInviteIdAcceptMutationOptions = <
  TError =
    | PostInvitesInviteIdAccept400
    | PostInvitesInviteIdAccept401
    | PostInvitesInviteIdAccept500,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postInvitesInviteIdAccept>>,
    TError,
    { inviteId: string },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof postInvitesInviteIdAccept>>,
  TError,
  { inviteId: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postInvitesInviteIdAccept>>,
    { inviteId: string }
  > = (props) => {
    const { inviteId } = props ?? {}

    return postInvitesInviteIdAccept(inviteId)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostInvitesInviteIdAcceptMutationResult = NonNullable<
  Awaited<ReturnType<typeof postInvitesInviteIdAccept>>
>

export type PostInvitesInviteIdAcceptMutationError =
  | PostInvitesInviteIdAccept400
  | PostInvitesInviteIdAccept401
  | PostInvitesInviteIdAccept500

/**
 * @summary Accept a group invite
 */
export const usePostInvitesInviteIdAccept = <
  TError =
    | PostInvitesInviteIdAccept400
    | PostInvitesInviteIdAccept401
    | PostInvitesInviteIdAccept500,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postInvitesInviteIdAccept>>,
    TError,
    { inviteId: string },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof postInvitesInviteIdAccept>>,
  TError,
  { inviteId: string },
  TContext
> => {
  const mutationOptions = getPostInvitesInviteIdAcceptMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Fetch group invites
 */
export const getGroupsGroupIdInvites = (
  groupId: string,
  signal?: AbortSignal,
) => {
  return axiosInstance<GetGroupsGroupIdInvites200>({
    url: `/groups/${groupId}/invites`,
    method: 'GET',
    signal,
  })
}

export const getGetGroupsGroupIdInvitesQueryKey = (groupId: string) => {
  return [`/groups/${groupId}/invites`] as const
}

export const getGetGroupsGroupIdInvitesQueryOptions = <
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getGetGroupsGroupIdInvitesQueryKey(groupId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getGroupsGroupIdInvites>>
  > = ({ signal }) => getGroupsGroupIdInvites(groupId, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!groupId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetGroupsGroupIdInvitesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getGroupsGroupIdInvites>>
>
export type GetGroupsGroupIdInvitesQueryError =
  | GetGroupsGroupIdInvites400
  | GetGroupsGroupIdInvites401
  | GetGroupsGroupIdInvites500

export function useGetGroupsGroupIdInvites<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetGroupsGroupIdInvites<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetGroupsGroupIdInvites<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Fetch group invites
 */

export function useGetGroupsGroupIdInvites<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetGroupsGroupIdInvitesQueryOptions(groupId, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getGetGroupsGroupIdInvitesSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getGetGroupsGroupIdInvitesQueryKey(groupId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getGroupsGroupIdInvites>>
  > = ({ signal }) => getGroupsGroupIdInvites(groupId, signal)

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetGroupsGroupIdInvitesSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof getGroupsGroupIdInvites>>
>
export type GetGroupsGroupIdInvitesSuspenseQueryError =
  | GetGroupsGroupIdInvites400
  | GetGroupsGroupIdInvites401
  | GetGroupsGroupIdInvites500

export function useGetGroupsGroupIdInvitesSuspense<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options: {
    query: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetGroupsGroupIdInvitesSuspense<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetGroupsGroupIdInvitesSuspense<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
/**
 * @summary Fetch group invites
 */

export function useGetGroupsGroupIdInvitesSuspense<
  TData = Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
  TError =
    | GetGroupsGroupIdInvites400
    | GetGroupsGroupIdInvites401
    | GetGroupsGroupIdInvites500,
>(
  groupId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getGroupsGroupIdInvites>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
} {
  const queryOptions = getGetGroupsGroupIdInvitesSuspenseQueryOptions(
    groupId,
    options,
  )

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Revoke invite
 */
export const postGroupsGroupIdInvitesInviteIdRevoke = (
  groupId: string,
  inviteId: string,
  signal?: AbortSignal,
) => {
  return axiosInstance<PostGroupsGroupIdInvitesInviteIdRevoke201>({
    url: `/groups/${groupId}/invites/${inviteId}/revoke`,
    method: 'POST',
    signal,
  })
}

export const getPostGroupsGroupIdInvitesInviteIdRevokeMutationOptions = <
  TError =
    | PostGroupsGroupIdInvitesInviteIdRevoke400
    | PostGroupsGroupIdInvitesInviteIdRevoke401
    | PostGroupsGroupIdInvitesInviteIdRevoke500,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postGroupsGroupIdInvitesInviteIdRevoke>>,
    TError,
    { groupId: string; inviteId: string },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof postGroupsGroupIdInvitesInviteIdRevoke>>,
  TError,
  { groupId: string; inviteId: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postGroupsGroupIdInvitesInviteIdRevoke>>,
    { groupId: string; inviteId: string }
  > = (props) => {
    const { groupId, inviteId } = props ?? {}

    return postGroupsGroupIdInvitesInviteIdRevoke(groupId, inviteId)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostGroupsGroupIdInvitesInviteIdRevokeMutationResult = NonNullable<
  Awaited<ReturnType<typeof postGroupsGroupIdInvitesInviteIdRevoke>>
>

export type PostGroupsGroupIdInvitesInviteIdRevokeMutationError =
  | PostGroupsGroupIdInvitesInviteIdRevoke400
  | PostGroupsGroupIdInvitesInviteIdRevoke401
  | PostGroupsGroupIdInvitesInviteIdRevoke500

/**
 * @summary Revoke invite
 */
export const usePostGroupsGroupIdInvitesInviteIdRevoke = <
  TError =
    | PostGroupsGroupIdInvitesInviteIdRevoke400
    | PostGroupsGroupIdInvitesInviteIdRevoke401
    | PostGroupsGroupIdInvitesInviteIdRevoke500,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postGroupsGroupIdInvitesInviteIdRevoke>>,
    TError,
    { groupId: string; inviteId: string },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof postGroupsGroupIdInvitesInviteIdRevoke>>,
  TError,
  { groupId: string; inviteId: string },
  TContext
> => {
  const mutationOptions =
    getPostGroupsGroupIdInvitesInviteIdRevokeMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * @summary Fetch pending invites
 */
export const getPendingInvites = (signal?: AbortSignal) => {
  return axiosInstance<GetPendingInvites200>({
    url: `/pending-invites`,
    method: 'GET',
    signal,
  })
}

export const getGetPendingInvitesQueryKey = () => {
  return [`/pending-invites`] as const
}

export const getGetPendingInvitesQueryOptions = <
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetPendingInvitesQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getPendingInvites>>
  > = ({ signal }) => getPendingInvites(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getPendingInvites>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetPendingInvitesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getPendingInvites>>
>
export type GetPendingInvitesQueryError =
  | GetPendingInvites400
  | GetPendingInvites401
  | GetPendingInvites500

export function useGetPendingInvites<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getPendingInvites>>,
        TError,
        TData
      >,
      'initialData'
    >
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetPendingInvites<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getPendingInvites>>,
        TError,
        TData
      >,
      'initialData'
    >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetPendingInvites<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Fetch pending invites
 */

export function useGetPendingInvites<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetPendingInvitesQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getGetPendingInvitesSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetPendingInvitesQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getPendingInvites>>
  > = ({ signal }) => getPendingInvites(signal)

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof getPendingInvites>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetPendingInvitesSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof getPendingInvites>>
>
export type GetPendingInvitesSuspenseQueryError =
  | GetPendingInvites400
  | GetPendingInvites401
  | GetPendingInvites500

export function useGetPendingInvitesSuspense<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options: {
  query: Partial<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetPendingInvitesSuspense<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetPendingInvitesSuspense<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
/**
 * @summary Fetch pending invites
 */

export function useGetPendingInvitesSuspense<
  TData = Awaited<ReturnType<typeof getPendingInvites>>,
  TError = GetPendingInvites400 | GetPendingInvites401 | GetPendingInvites500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getPendingInvites>>,
      TError,
      TData
    >
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
} {
  const queryOptions = getGetPendingInvitesSuspenseQueryOptions(options)

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get invite details
 */
export const getInvitesInviteId = (inviteId: string, signal?: AbortSignal) => {
  return axiosInstance<GetInvitesInviteId200>({
    url: `/invites/${inviteId}`,
    method: 'GET',
    signal,
  })
}

export const getGetInvitesInviteIdQueryKey = (inviteId: string) => {
  return [`/invites/${inviteId}`] as const
}

export const getGetInvitesInviteIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getGetInvitesInviteIdQueryKey(inviteId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getInvitesInviteId>>
  > = ({ signal }) => getInvitesInviteId(inviteId, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!inviteId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getInvitesInviteId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetInvitesInviteIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getInvitesInviteId>>
>
export type GetInvitesInviteIdQueryError =
  | GetInvitesInviteId400
  | GetInvitesInviteId401
  | GetInvitesInviteId500

export function useGetInvitesInviteId<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getInvitesInviteId>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetInvitesInviteId<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getInvitesInviteId>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetInvitesInviteId<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary Get invite details
 */

export function useGetInvitesInviteId<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetInvitesInviteIdQueryOptions(inviteId, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getGetInvitesInviteIdSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getGetInvitesInviteIdQueryKey(inviteId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getInvitesInviteId>>
  > = ({ signal }) => getInvitesInviteId(inviteId, signal)

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof getInvitesInviteId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetInvitesInviteIdSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof getInvitesInviteId>>
>
export type GetInvitesInviteIdSuspenseQueryError =
  | GetInvitesInviteId400
  | GetInvitesInviteId401
  | GetInvitesInviteId500

export function useGetInvitesInviteIdSuspense<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options: {
    query: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetInvitesInviteIdSuspense<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetInvitesInviteIdSuspense<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
/**
 * @summary Get invite details
 */

export function useGetInvitesInviteIdSuspense<
  TData = Awaited<ReturnType<typeof getInvitesInviteId>>,
  TError =
    | GetInvitesInviteId400
    | GetInvitesInviteId401
    | GetInvitesInviteId500,
>(
  inviteId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getInvitesInviteId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
} {
  const queryOptions = getGetInvitesInviteIdSuspenseQueryOptions(
    inviteId,
    options,
  )

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}
