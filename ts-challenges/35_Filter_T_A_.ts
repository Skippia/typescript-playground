export {}

/**
 * Doesn't work on 100%
 */
 type Filter2<T extends any[], A, E extends A[] = []> =
 T extends [infer F, ...infer R]
   ? F extends A
     ? Filter2<R, A, [...E, F]> : Filter2<R, A, E>
   : E

/**
 * Works greatly
 */
 type Filter<T extends any[], A, E extends A[] = []> =
 T extends [infer F, ...infer R]
   ? [F] extends [A]
       ? Filter<R, A, [...E, F]> : Filter<R, A, E>
   : E

type F = Filter<[1, 'BFE', 2, any, 'dev'], string> // result is ["BFE", any, "dev"]
type F2 = Filter2<[1, 'BFE', 2, any, 'dev'], string> // result is ["BFE", any, "dev"] | ["BFE", "dev"]
