export {}

type Flat<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...Flat<F>, ...Flat<R>] : [F, ...Flat<R>]
  : []

type A = Flat<[1, 2, 3]> // [1,2,3]
type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []
type X = Flat<[1, [2, 3]]>
