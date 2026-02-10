export {}

type MyNonNullable<T extends keyof any> = T extends null | undefined ? never : T

type Foo = 'a' | 'b' | null | undefined

type A = MyNonNullable<Foo> // 'a' | 'b'
