export {}

type Repeat<T, C extends number, A extends unknown[] = []> = A['length'] extends C ? A : Repeat<T, C, [...A, T]>

type A = Repeat<number, 3> // [number, number, number]
type B = Repeat<string, 2> // [string, string]
type C = Repeat<1, 1> // [1, 1]
type D = Repeat<0, 0> // []
