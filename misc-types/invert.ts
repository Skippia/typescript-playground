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

const record1: TRecord1 = {
  a: 1,
  b: 'two',
  c: false
}

const keysMap: TKeysMap = { a: 'x', b: 'y', c: 'z' }

type TInvertedKeys1 = TInvert<TKeysMap>

const keysTransformer
  = <T extends Record<string, unknown>, X extends { [key in keyof T]: string }>(objSource: T, mapKeys: X) =>
    Object.entries(objSource).reduce((acc, cur) => {
      const [key, value] = cur as [keyof T, T[keyof T]]
      const newKey = mapKeys[key]
      return { ...acc, [newKey]: value }
      // @ts-expect-error bug ts...
    }, {} as { [key in X[keyof T]]: T[TInvert<X>[key]] })

/**
 * From: record: { a: 1, b: 'two', c: false }, keysMap: { a: 'x', b: 'y', c: 'z' }
 * To: { x: 1, y: 'two', z: false }
 */
const record2 = keysTransformer(record1,keysMap)

