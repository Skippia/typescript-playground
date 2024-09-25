export {}

type Equal<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false

type A = Equal<any, any> // true
type B = Equal<any, 1> // false
type C = Equal<never, never> // true
type D = Equal<'BFE', 'BFE'> // true
type E = Equal<'BFE', string> // false
type Y = Equal<1 | 2, 2 | 1> // true
type X = Equal<{ a: number }, { a: number }> // true
