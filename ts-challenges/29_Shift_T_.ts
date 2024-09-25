export {}

type Shift<T extends any[]> = T extends [F:any, ...rest: infer R] ? R : []

type A = Shift<[1, 2, 3]> // [2,3]
type B = Shift<[1]> // []
type C = Shift<[]> // []
