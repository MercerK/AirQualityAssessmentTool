import { useRef, useEffect } from 'react'
import { QueryFunction, useInfiniteQuery } from 'react-query'
import { ApiResult } from '../util/api/types'

export const useQueryAllPages = <T extends ApiResult<any>>(key: string, fetchCallback: QueryFunction<T, string>) => {
  const { isLoading, error, data, fetchNextPage } = useInfiniteQuery(key, fetchCallback, {
    keepPreviousData: true,
    getNextPageParam: (lastPage) => (lastPage?.meta?.page ?? 0) + 1,
    staleTime: 30 * 1000,
  })
  const pageRef = useRef<any>()

  if (!pageRef.current) {
    pageRef.current = 1
  }

  useEffect(() => {
    if (isLoading || error || !data) return
    if (data.pages.length - 1 === pageRef.current) return

    const lastPage = data.pages[data.pages.length - 1]

    const { limit, found, page } = lastPage?.meta ?? { limit: -1, found: -1, page: -1 }

    if (limit === -1) return

    const amt = limit * page

    if (amt < found) {
      pageRef.current++
      fetchNextPage()
    }
    // eslint-disable-next-line
  }, [data])

  return { isLoading, error, data, fetchNextPage }
}
