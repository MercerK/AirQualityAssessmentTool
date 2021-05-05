import { ApiBaseParams } from './types'

type ParamsObject<T> = {
  [P in keyof T]: T[P]
}

export const buildParams = <T extends ApiBaseParams>(object: ParamsObject<T>) =>
  Object.keys(object)
    .map((e) => {
      const item = object[e as keyof typeof object]

      if (!item) return undefined

      if (Array.isArray(item)) {
        if (item.length > 0) return item.map((arrItem) => `${e}=${arrItem}`).reduce((a, b) => `${a}&${b}`)

        return undefined
      }

      return `${e}=${item}`
    })
    .filter((e) => e)
    .reduce((a, b) => `${a}&${b}`)
