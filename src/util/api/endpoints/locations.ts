import { StringOrNumber } from '../../util'
import { API_ORIGIN, ApiEndpoints } from '../constants'
import { ApiBaseParams, ApiResult } from '../types'
import { buildParams } from '../util'

export interface ApiLocationItem {
  id: number
  city: string
  name: string
  entity: string
  country: string
  sources: {
    id: string
    name: string
    url?: string
  }[]
  isMobile: boolean
  isAnalysis: boolean
  parameters: {
    id: number
    unit: string
    count: number
    average: number
    lastValue: number
    parameter: string
    displayName: string
    lastUpdated: string
    parameterId: number
    firstUpdated: string
  }[]
  sensorType: string
  coordinates: {
    latitude: number
    longitude: number
  }
  lastUpdated: string
  firstUpdated: string
  measurements: number
}

export interface ApiLocationParams extends ApiBaseParams {
  country_id?: StringOrNumber
  parameter_id?: StringOrNumber
  parameter?: string
  unit?: string[]
  coordinates?: string
  radius?: StringOrNumber
  country?: string[]
  city?: string[]
  location_id?: StringOrNumber
  location?: string[]
  isMobile?: boolean
  isAnalysis?: boolean
  sourceName?: string[]
  entity?: string
  sensorType?: string
  modelName?: string[]
  manufacturerName?: string[]
  dumpRaw?: boolean
  order_by?: 'country' | 'firstUpdated' | 'lastUpdated' | 'location' | 'count' | 'city' | 'sourceName' | 'random'
}

export const fetchLocations = (
  page: number = 1,
  params: ApiLocationParams = {}
): Promise<ApiResult<ApiLocationItem[]>> =>
  fetch(
    `${API_ORIGIN}${ApiEndpoints.Locations}?${buildParams<ApiLocationParams>({
      limit: 200,
      page,
      sort: 'asc',
      ...params,
    })}`
  ).then((res) => res.json())
