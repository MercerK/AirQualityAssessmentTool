import { StringOrNumber } from '../../util'
import { API_ORIGIN, ApiEndpoints, API_LIMIT } from '../constants'
import { ApiBaseParams, ApiResult } from '../types'
import { buildParams } from '../util'

export interface ApiMeasurementItem {
  firstUpdated: string
  lastUpdated: string
}

export interface ApiMeasurementParams extends ApiBaseParams {
  format?: string
  date_from?: string
  date_to?: string
  has_geo?: boolean
  parameter_id?: StringOrNumber
  parameter?: string[]
  unit?: string[]
  coordinates?: string
  radius?: StringOrNumber
  country_id?: StringOrNumber
  country?: string[]
  city?: string[]
  location_id?: StringOrNumber
  order_by?: 'city' | 'country' | 'location' | 'datetime'
  isMobile?: boolean
  isAnalysis?: boolean
  project?: StringOrNumber
  entity?: 'government' | 'community' | 'research'
  sensorType?: 'reference grade' | 'low-cost sensor'
  value_from?: StringOrNumber
  value_to?: StringOrNumber
  include_fields?: string
}

export const fetchMeasurements = (page: number = 1, city: string): Promise<ApiResult<ApiMeasurementItem[]>> =>
  fetch(
    `${API_ORIGIN}${ApiEndpoints.Measurements}?${buildParams<ApiMeasurementParams>({
      limit: API_LIMIT,
      page,
      offset: 0,
      sort: 'asc',
      city: [city],
    })}`
  ).then((res) => res.json())
