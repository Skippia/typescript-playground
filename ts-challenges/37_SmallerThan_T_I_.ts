export {}

type NumberToArray<T extends number, A extends string[] = []> = A['length'] extends T ? A : NumberToArray<T, [...A, any]>

/**
 * First way
 */
/* type SmallerThan<A extends number, B extends number> =
  NumberToArray<A> extends [string, ...infer R1]
    ? NumberToArray<B> extends [string, ...infer R2]
      ? SmallerThan<R1['length'], R2['length']> : false
    : A extends B ? false : true
 */
/**
 * Second way
*/
type SmallerThan<A extends number, B extends number, S extends any[] = []> =
  S['length'] extends B ? false
    : S['length'] extends A ? true
      : SmallerThan<A, B, [any, ...S]>

type A = SmallerThan<0, 1> // true
type B = SmallerThan<1, 0> // false
type C = SmallerThan<10, 9> // false
type D = SmallerThan<1, 1> // false
type E = SmallerThan<10, 10> // false
