import React, { useEffect, useState } from 'react'
import { StringOrNumber } from '../../util/util'
import { City } from './City'
import { Country } from './Country'
import { LocationField } from './Location'

export type AddressFields = 'country' | 'city'

export interface AddressResult {
  country?: string
  city?: string
  locationId?: StringOrNumber
  locationName?: string
  // Expand as needed
}

interface Props {
  onChange?: (value: AddressResult) => void
}

export const Address: React.FC<Props> = ({ onChange }) => {
  const [data, setData] = useState<AddressResult>({})

  useEffect(() => {
    onChange?.(data)
    // eslint-disable-next-line
  }, [data])

  return (
    <div className="w-full">
      <Country
        className="my-2"
        onChange={(value) =>
          setData({ country: value, city: undefined, locationId: undefined, locationName: undefined })
        }
      />

      <City
        className="my-2"
        disabled={!data.country}
        onChange={(value) => setData({ ...data, locationId: undefined, city: value, locationName: undefined })}
        countryId={data.country}
        key={data.country}
      />

      <LocationField
        className="my-2"
        city={data.city ?? ''}
        disabled={!data.city}
        key={data.city}
        onChange={(value) => setData({ ...data, locationId: value.id, locationName: value.name })}
      />
    </div>
  )
}
