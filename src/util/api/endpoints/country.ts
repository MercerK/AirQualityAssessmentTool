import { API_ORIGIN, ApiEndpoints } from '../constants'
import { ApiBaseParams, ApiResult } from '../types'
import { buildParams } from '../util'

export interface ApiCountryItem {
  code: string
  name: string
  locations: number
  firstUpdated: string
  lastUpdated: string
  parameters: string[]
  count: number
  cities: number
  sources: number
}

export interface ApiCountryParams extends ApiBaseParams {
  country_id?: number
  country?: string
  order_by?: 'country' | 'firstUpdated' | 'lastUpdated' | 'locations' | 'count'
}

export const fetchCountries = (page: number = 1): Promise<ApiResult<ApiCountryItem[]>> =>
  fetch(
    `${API_ORIGIN}${ApiEndpoints.Countries}?${buildParams<ApiCountryParams>({
      limit: 200,
      page,
      sort: 'asc',
      order_by: 'country',
    })}`
  ).then((res) => res.json())
