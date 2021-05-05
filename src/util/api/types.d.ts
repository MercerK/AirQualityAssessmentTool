import { FullPartial } from '../util'

export interface ApiMeta {
  name: string
  license: string
  website: string
  page: number
  limit: number
  found: number
}

export interface ApiResult<T> {
  meta: ApiMeta
  results: FullPartial<T>
}

export interface ApiBaseParams {
  limit?: number
  page?: number
  offset?: number
  sort?: 'asc' | 'desc'
}
