export {}

type Equal<A, B> = keyof A extends keyof B ? [A] extends [B] ? [B] extends [A] ? true : false : false : false

type FindIndex<T extends any[], E, A extends any[] = []> =
  T extends [infer F, ...infer R]
    ? Equal<F, E> extends true
      ? [...A]['length'] : FindIndex<R, E, [...A, F]>
    : never

type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1> // 2
type C = FindIndex<A, 3> // never
type D = FindIndex<[any, never, 1, '2', true, true], true> // never
