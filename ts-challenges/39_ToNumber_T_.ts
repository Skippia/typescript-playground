export {}

type ToNumber<T extends string, A extends any[] = []> =
  `${A['length']}` extends T
    ? A['length'] : ToNumber<T, [...A, any]>

type A = ToNumber<'1'> // 1
type B = ToNumber<'40'> // 40
type C = ToNumber<'0'> // 0
