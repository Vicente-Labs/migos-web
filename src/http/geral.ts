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
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { axiosInstance } from '../services/axios-instance'
import type {
  GetMe200,
  GetMe401,
  GetMe404,
  GetMe500,
  GetUsersUserId200,
  GetUsersUserId400,
  GetUsersUserId401,
  GetUsersUserId404,
  GetUsersUserId500,
} from './endpoints.schemas'

/**
 * Get the profile of the authenticated user
 */
export const getMe = (signal?: AbortSignal) => {
  return axiosInstance<GetMe200>({ url: `/me`, method: 'GET', signal })
}

export const getGetMeQueryKey = () => {
  return [`/me`] as const
}

export const getGetMeQueryOptions = <
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetMeQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMe>>> = ({
    signal,
  }) => getMe(signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getMe>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>
export type GetMeQueryError = GetMe401 | GetMe404 | GetMe500

export function useGetMe<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options: {
  query: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof getMe>>,
        TError,
        TData
      >,
      'initialData'
    >
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetMe<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof getMe>>,
        TError,
        TData
      >,
      'initialData'
    >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetMe<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetMe<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetMeQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getGetMeSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetMeQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMe>>> = ({
    signal,
  }) => getMe(signal)

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof getMe>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetMeSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof getMe>>
>
export type GetMeSuspenseQueryError = GetMe401 | GetMe404 | GetMe500

export function useGetMeSuspense<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options: {
  query: Partial<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetMeSuspense<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetMeSuspense<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}

export function useGetMeSuspense<
  TData = Awaited<ReturnType<typeof getMe>>,
  TError = GetMe401 | GetMe404 | GetMe500,
>(options?: {
  query?: Partial<
    UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>
  >
}): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
} {
  const queryOptions = getGetMeSuspenseQueryOptions(options)

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * Get user profile
 */
export const getUsersUserId = (userId: string, signal?: AbortSignal) => {
  return axiosInstance<GetUsersUserId200>({
    url: `/users/${userId}`,
    method: 'GET',
    signal,
  })
}

export const getGetUsersUserIdQueryKey = (userId: string) => {
  return [`/users/${userId}`] as const
}

export const getGetUsersUserIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, TError, TData>
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetUsersUserIdQueryKey(userId)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersUserId>>> = ({
    signal,
  }) => getUsersUserId(userId, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!userId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getUsersUserId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUsersUserIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getUsersUserId>>
>
export type GetUsersUserIdQueryError =
  | GetUsersUserId400
  | GetUsersUserId401
  | GetUsersUserId404
  | GetUsersUserId500

export function useGetUsersUserId<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsersUserId>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUsersUserId<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUsersUserId>>,
          TError,
          TData
        >,
        'initialData'
      >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUsersUserId<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, TError, TData>
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetUsersUserId<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, TError, TData>
    >
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getGetUsersUserIdQueryOptions(userId, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getGetUsersUserIdSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getUsersUserId>>,
        TError,
        TData
      >
    >
  },
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetUsersUserIdQueryKey(userId)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersUserId>>> = ({
    signal,
  }) => getUsersUserId(userId, signal)

  return { queryKey, queryFn, ...queryOptions } as UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof getUsersUserId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUsersUserIdSuspenseQueryResult = NonNullable<
  Awaited<ReturnType<typeof getUsersUserId>>
>
export type GetUsersUserIdSuspenseQueryError =
  | GetUsersUserId400
  | GetUsersUserId401
  | GetUsersUserId404
  | GetUsersUserId500

export function useGetUsersUserIdSuspense<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options: {
    query: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getUsersUserId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetUsersUserIdSuspense<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getUsersUserId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}
export function useGetUsersUserIdSuspense<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getUsersUserId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
}

export function useGetUsersUserIdSuspense<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError =
    | GetUsersUserId400
    | GetUsersUserId401
    | GetUsersUserId404
    | GetUsersUserId500,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseSuspenseQueryOptions<
        Awaited<ReturnType<typeof getUsersUserId>>,
        TError,
        TData
      >
    >
  },
): UseSuspenseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>
} {
  const queryOptions = getGetUsersUserIdSuspenseQueryOptions(userId, options)

  const query = useSuspenseQuery(queryOptions) as UseSuspenseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}
