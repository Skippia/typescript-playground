import { s } from 'vitest/dist/index-fde81ec3'

export {}

type NumberToArray<T extends number, A extends string[] = []> = A['length'] extends T ? A : NumberToArray<T, [...A, '*']>

/**
 * First way
 */
/* type LargerThan<A extends number, B extends number> =
  NumberToArray<A> extends [string, ...infer R1]
    ? NumberToArray<B> extends [string, ...infer R2]
      ? LargerThan<R1['length'], R2['length']> : true
    : false
 */

/**
 * Second way
*/
type LargerThan<A extends number, B extends number, S extends any[] = []> =
  S['length'] extends A ? false
    : S['length'] extends B ? true
      : LargerThan<A, B, [any, ...S]>

type A = LargerThan<1, 3> // false
type B = LargerThan<1, 0> // true
type C = LargerThan<10, 2> // true
