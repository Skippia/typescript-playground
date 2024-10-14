type TInvert<T extends Record<string, string>> = {
  [key in T[keyof T]]: {
    [keyInner in keyof T]: T[keyInner] extends key ? keyInner : never
  }[keyof T]
}

type TRecord1 = {
  a: number,
  b: string
  c: boolean
}

type TKeysMap = {
  a: 'x',
  b: 'y',
  c: 'z'
}

declare const record1: TRecord1
declare const keysMap: TKeysMap

type TInvertedKeys1 = TInvert<TKeysMap>

const keysTransformer
  = <T extends Record<string, unknown>, X extends { [key in keyof T]: string }>(objSource: T, mapKeys: X) =>
    Object.entries(objSource).reduce((acc, cur) => {
      const [key, value] = cur as [keyof T, T[keyof T]]
      const newKey = mapKeys[key]
      return { ...acc, [newKey]: value }
      // @ts-expect-error bug ts...
    }, {} as { [key in X[keyof T]]: T[TInvert<X>[key]] })

const record2 = keysTransformer(record1,keysMap)
