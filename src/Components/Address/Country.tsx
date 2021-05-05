import React from 'react'

import { ApiCountryItem, fetchCountries } from '../../util/api/endpoints/country'
import { Select } from '../Select/Select'
import { FetchSuspense, useFetchData } from '../Suspense/Suspense'
import { convertToOptions } from './util'

interface Props {
  onChange?: (value: any) => void
  className?: string
}

const queryFn = ({ pageParam = 1 }) => fetchCountries(pageParam)

export const Country: React.FC<Props> = (props) => {
  return (
    <FetchSuspense queryFn={queryFn} queryKey="countries">
      <CountryBody {...props} />
    </FetchSuspense>
  )
}

export const CountryBody: React.FC<Props> = ({ onChange, className }) => {
  const data = useFetchData<ApiCountryItem[]>()
  const options = convertToOptions<ApiCountryItem>(data, (e, i) => ({
    key: e?.code ?? i,
    value: e?.code ?? '',
    text: e?.name ?? '',
    selected: false,
  }))

  const onSelectChange = (event: any, ref: any) => {
    onChange?.(ref.value)
  }

  return <Select className={className} options={options} onChange={onSelectChange} placeholder="Select Country" />
}
