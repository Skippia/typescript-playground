export {}

type TupleToString<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]] ? `${F}${TupleToString<R>}` : ''

type A = TupleToString<['a']> // 'a'
type B = TupleToString<['B', 'F', 'E']> // 'BFE'
type C = TupleToString<[]> // ''
