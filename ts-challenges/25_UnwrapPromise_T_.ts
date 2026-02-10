export {}

type UnwrapPromise<T> = T extends Promise<infer WrapType> ? WrapType : never

type A = UnwrapPromise<Promise<string>> // string
type B = UnwrapPromise<Promise<null>> // null
type C = UnwrapPromise<null> // Error
