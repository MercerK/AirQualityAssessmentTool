import React from 'react'

import { ApiCityItem, fetchCities } from '../../util/api/endpoints/city'
import { Select } from '../Select/Select'
import { FetchSuspense, useFetchData } from '../Suspense/Suspense'
import { convertToOptions } from './util'

interface Props {
  onChange?: (value: any) => void
  countryId?: string
  disabled?: boolean
  className?: string
}

export const City: React.FC<Props> = ({ countryId, disabled, ...rest }) => {
  const queryFn = ({ pageParam = 1 }) => fetchCities(pageParam, countryId)

  return (
    <FetchSuspense queryFn={queryFn} queryKey={`city-${countryId}`} disableFetch={disabled}>
      <CityBody countryId={countryId} disabled={disabled} {...rest} />
    </FetchSuspense>
  )
}

export const CityBody: React.FC<Props> = ({ onChange, disabled, className }) => {
  const data = useFetchData<ApiCityItem[]>()
  const options = convertToOptions<ApiCityItem>(data, (e, i) => ({
    key: `${e?.city}-${e?.country}` ?? i,
    value: e?.city ?? '',
    text: e?.city ?? '',
    selected: false,
  }))

  const onSelectChange = (event: any, ref: any) => {
    onChange?.(ref.value)
  }

  return (
    <Select
      className={className}
      options={options}
      onChange={onSelectChange}
      placeholder="Select City"
      disabled={disabled}
    />
  )
}
