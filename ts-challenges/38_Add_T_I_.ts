export {}

type NumberToArray<T extends number, A extends any[] = []> = A['length'] extends T ? A : NumberToArray<T, [...A, any]>

type Add<A extends number, B extends number> = [...NumberToArray<A>, ...NumberToArray<B>]['length']
type A = Add<1, 2> // 3
type B = Add<0, 0> // 0

