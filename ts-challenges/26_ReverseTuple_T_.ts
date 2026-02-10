export {}

type ReverseTuple<T extends any[]> = T extends [...infer F, infer L] ? [L, ...ReverseTuple<F>] : []

type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
type B = ReverseTuple<[1, 2, 3]> // [3,2,1]
type C = ReverseTuple<[]> // []
