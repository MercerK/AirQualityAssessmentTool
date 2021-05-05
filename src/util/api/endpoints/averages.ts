import { API_ORIGIN, ApiEndpoints, API_LIMIT } from '../constants'
import { ApiBaseParams, ApiResult } from '../types'
import { buildParams } from '../util'

export interface ApiAverageItem {
  average: number
  day?: string
  month?: string
  displayName: string
  id: number
  measurement_count: number
  name: string
  parameter: string
  parameterId: number
  subtitle: string
  unit: string
}

export interface ApiAverageParams extends ApiBaseParams {
  date_from?: string
  date_to?: string
  parameter_id?: string | number
  parameter?: string[]
  unit?: string[]
  project_id?: string | number
  project?: string[]
  country_id?: number | string
  country?: string[]

  spatial: 'country' | 'location' | 'project' | 'total'
  temporal: 'day' | 'month' | 'year' | 'moy' | 'dow' | 'hour' | 'hod'
  location?: string[]
  group?: boolean
}

export const fetchAverages = (
  page: number = 1,
  params: Partial<ApiAverageParams> = {}
): Promise<ApiResult<ApiAverageItem[]>> =>
  fetch(
    `${API_ORIGIN}${ApiEndpoints.Averages}?${buildParams<ApiAverageParams>({
      limit: API_LIMIT,
      page,
      offset: 0,
      sort: 'asc',
      spatial: 'location',
      temporal: 'month',
      ...params,
    })}`
  ).then((res) => res.json())
