import React, { createContext, useContext } from 'react'
import { InfiniteData, QueryFunction } from 'react-query'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useQueryAllPages } from '../../hooks/useQueryAllPages'
import { ApiResult } from '../../util/api/types'
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary'

interface Props<T> {
  disableFetch?: boolean
  fallback?: any

  queryKey: string
  queryFn: QueryFunction<T, string>
  children: React.ReactNode
}

interface DataContextType {
  data?: InfiniteData<any>
}

export const SuspenseContext = createContext<DataContextType>({ data: undefined })

export const useFetchData = <T,>() => {
  const { data } = useContext(SuspenseContext)

  return data as Partial<InfiniteData<ApiResult<T>>>
}

export const FetchSuspense = <T extends ApiResult<any>>({ disableFetch = false, children, ...rest }: Props<T>) => {
  return (
    <ErrorBoundary>
      {disableFetch === true && children}
      {!disableFetch && <FetchSuspenseBody disableFetch={disableFetch} children={children} {...rest} />}
    </ErrorBoundary>
  )
}

export const FetchSuspenseBody = <T extends ApiResult<any>>({ queryKey, queryFn, children }: Props<T>) => {
  const { isLoading, data } = useQueryAllPages(queryKey, queryFn)

  if (isLoading)
    return (
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    )

  return <SuspenseContext.Provider value={{ data }}>{children}</SuspenseContext.Provider>
}
