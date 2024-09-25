export {}

type ArrayToString<T extends string[]> =
/**
 * const {F, R} = T
 * if (F && R)
 *   if (typeof F === 'string')
 *     if (typeof R === `string[]`) return `${F}ArrayToString<R>
 *    else return F
 *   else returm never
 * else return ''
 *
 */

T extends [first: infer F, ...rest: infer R]
  ? (F extends string
      ? (R extends string[]
          ? `${F}${ArrayToString<R>}` : F)
      : never)
  : ''

/**
 * My way (as usual overthinking)
 */
type RepeatString<S extends string, N extends number, A extends string[] = []> = A['length'] extends N ? ArrayToString<A> : RepeatString<S, N, [...A, S]>

/**
 * Much easier way (true recursive function)
 */
// type RepeatString<S extends string, N extends number, A extends string[] = []> = A['length'] extends N ? '' : `${S}${RepeatString<S, N, [...A, S]>}`

type A = RepeatString<'a', 0> // ''
type B = RepeatString<'a', 1> // 'a'
type C = RepeatString<'a', 2> // 'aa'
type D = RepeatString<'a', 10> // 'aa'
