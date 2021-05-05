export type FullPartial<T> = {
  [P in keyof T]?: FullPartial<T[P]>
}

export type StringOrNumber = string | number
