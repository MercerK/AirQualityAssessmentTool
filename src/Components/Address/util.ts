import { DropdownItemProps } from 'semantic-ui-react'

export const convertToOptions = <T>(data: any, mapCallback: (t: T, i: number) => any): DropdownItemProps[] => {
  if (!!data && !!data.pages)
    return data.pages
      .map((e: any) => {
        if (!e.results) return null

        return [
          ...e.results
            ?.map(mapCallback)
            .sort((a: any, b: any) => {
              if (a.text > b.text) return 1
              if (b.text > a.text) return -1
              return 0
            })
            .filter((item: any) => {
              // This is meant to help filter out bad data.
              if (!isNaN(parseInt(item.text))) return false
              if (item.text.toLowerCase() === 'n/a') return false
              if (item.text.toLowerCase() === 'unused') return false

              return true
            }),
        ]
      })
      .flat()

  return []
}
