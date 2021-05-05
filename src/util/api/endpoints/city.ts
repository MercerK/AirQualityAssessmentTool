import { API_ORIGIN, ApiEndpoints, API_LIMIT } from '../constants'
import { ApiBaseParams, ApiResult } from '../types'
import { buildParams } from '../util'

export interface ApiCityItem {
  country: string
  city: string
  count: number
  locations: number
  firstUpdated: string
  lastUpdated: string
  parameters: string[]
}

export interface ApiCityParams extends ApiBaseParams {
  country_id?: number | string
  country?: string
  city?: string[]
  order_by?: 'city' | 'country' | 'firstUpdated' | 'lastUpdated'
  entity?: string
}

export const fetchCities = (page: number = 1, countryId?: string): Promise<ApiResult<ApiCityItem[]>> =>
  fetch(
    `${API_ORIGIN}${ApiEndpoints.Cities}?${buildParams<ApiCityParams>({
      limit: API_LIMIT,
      page,
      offset: 0,
      sort: 'asc',
      country_id: countryId,
      order_by: 'city',
    })}`
  ).then((res) => res.json())
