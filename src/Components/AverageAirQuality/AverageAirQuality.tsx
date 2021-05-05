import { ResponsiveLine, Serie } from '@nivo/line'
import React from 'react'
import { ApiAverageItem, fetchAverages } from '../../util/api/endpoints/averages'

import { AddressResult } from '../Address/Address'
import { FetchSuspense, useFetchData } from '../Suspense/Suspense'
import { convert } from '@shootismoke/convert'
import { Card } from 'semantic-ui-react'
import { FullPartial } from '../../util/util'

interface Props {
  data: AddressResult[]
}

const getLocs = (data: AddressResult[]): string[] => data.map((e) => e.locationId?.toString() ?? '').filter((e) => e)

export const AverageAirQuality: React.FC<Props> = ({ data }) => {
  const now = new Date().getFullYear()
  const locs = getLocs(data)
  const queryFn = ({ pageParam = 1 }) =>
    fetchAverages(pageParam, {
      location: locs,
      date_from: new Date(`01/01/${now}`).toISOString(),
      date_to: new Date().toISOString(),
    })

  return (
    <FetchSuspense queryKey={`aq-${locs.join()}`} queryFn={queryFn} key={`aq-${locs.join()}`}>
      <AverageAirQualityBody data={data} />
    </FetchSuspense>
  )
}

interface BodyData {
  id: number
  name: string
  data: FullPartial<ApiAverageItem>[]
}

export const AverageAirQualityBody: React.FC<Props> = ({ data: addressData }) => {
  const data = useFetchData<ApiAverageItem[]>()

  const series: BodyData[] = []

  addressData.forEach((addressData) => {
    if (series.findIndex((e) => e.name === addressData.locationName) !== -1) return
    if (!addressData.locationId) return

    series.push({
      id: -1,
      name: addressData.locationName ?? '',
      data: [] as any[],
    })
  })

  if (data && data.pages) {
    data.pages.forEach((page) => {
      if (page.results) {
        page.results.forEach((result) => {
          if (!result) return
          if (!result.month) return
          if (!result.average) return
          if (!result.id) return
          if (!result.unit) return
          if (!result.subtitle) return

          let targetLineSeriesIndex = series.findIndex((e: any) => e.name === result.subtitle)

          series[targetLineSeriesIndex].data.push(result)
        })
      }
    })
  }

  return (
    <div className="ui stackable three cards">
      {series.map((serie) => (
        <Card style={{ maxHeight: '15rem', overflow: 'auto' }}>
          <Card.Content>
            <Card.Header>{serie.name}</Card.Header>
            {serie.data.length === 0 && <span>No data available</span>}

            {serie.data.length > 0 &&
              serie.data.map((e) => (
                <Card.Description className="flex flex-row">
                  <label>{e.month}</label> <span className="flex-grow" />
                  <span>
                    {e.average} {e.unit}
                  </span>
                </Card.Description>
              ))}
          </Card.Content>
        </Card>
      ))}
    </div>
  )
}

/**
 * The data is in many formats and can be difficult to compare due to that.
 *
 * Another challenge is that the line chart isn't working as expected, which
 * may be due to my implementation or something else.
 */
export const AverageAirQualityChart: React.FC<Props> = () => {
  const data = useFetchData<ApiAverageItem[]>()
  const series: Serie[] = []

  if (data && data.pages) {
    data.pages.forEach((page) => {
      if (page.results) {
        // const context = {
        //   id: '',
        //   color: 'blue',
        //   data: [] as any[],
        // }
        page.results.forEach((result) => {
          if (!result) return
          if (!result.month) return
          if (!result.average) return
          if (!result.id) return
          if (!result.unit) return

          let targetLineSeriesIndex = series.findIndex((e) => e.id === result.id)

          if (targetLineSeriesIndex === -1)
            targetLineSeriesIndex =
              series.push({
                id: result.id,
                // color: 'blue',
                data: [] as any[],
              }) - 1

          // @ts-ignore
          const avg = convert(result.unit, result.unit, 'raw', result.average)

          series[targetLineSeriesIndex].data.push({
            x: result.month,
            y: avg,
          })
        })

        // series.push(context)
      }
    })
  }

  return (
    <div style={{ width: '100vw', height: '500px' }}>
      <ResponsiveLine
        data={series}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        // yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          // orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Dates',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          // orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Average',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}
