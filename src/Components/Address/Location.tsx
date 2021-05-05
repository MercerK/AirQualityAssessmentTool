import React from 'react'

import { ApiLocationItem, fetchLocations } from '../../util/api/endpoints/locations'
import { Select } from '../Select/Select'
import { FetchSuspense, useFetchData } from '../Suspense/Suspense'
import { convertToOptions } from './util'

interface Props {
  onChange?: (value: any) => void
  city: string
  disabled?: boolean
  className?: string
}

export const LocationField: React.FC<Props> = ({ city, disabled, ...rest }) => {
  const queryFn = ({ pageParam = 1 }) => fetchLocations(pageParam, { city: [city] })

  return (
    <FetchSuspense queryFn={queryFn} queryKey={`location-${city}`} disableFetch={disabled}>
      <LocationFieldBody city={city} {...rest} disabled={disabled} />
    </FetchSuspense>
  )
}

export const LocationFieldBody: React.FC<Props> = ({ onChange, disabled, className }) => {
  const data = useFetchData<ApiLocationItem[]>()
  const options = convertToOptions<ApiLocationItem>(data, (e, i) => ({
    key: `${e?.id}` ?? i,
    value: `${e?.id}-${e?.name}` ?? '',
    text: `${e?.name}` ?? '',
    selected: false,
  }))

  const onSelectChange = (event: any, ref: any) => {
    const id = ref.value.split('-')[0]
    const name = ref.value.split('-')[1]

    onChange?.({ id, name })
  }

  return (
    <Select
      className={className}
      options={options}
      onChange={onSelectChange}
      placeholder="Select Location"
      disabled={disabled}
    />
  )
}
