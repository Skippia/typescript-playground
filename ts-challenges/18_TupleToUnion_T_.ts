export {}

type Foo = [string, number, boolean]

type TupleToUnion<T extends any[]> = T extends [...rest: infer A] ? A[number] : never

type Bar = TupleToUnion<Foo> // string | number | boolean
