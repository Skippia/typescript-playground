export {}

function foo(this: { a: string }) {}
foo() // Error

const bar = foo.bind({ a: 'BFE.dev' })
bar() // OK

type MyOmitThisParameter<T extends (this: any, ...args: any) => any>
  = T extends (this: any, ...args: infer A) => infer R
    ? (...args: A) => R
    : never

type Foo = (this: { a: string }) => string
type Bar = MyOmitThisParameter<Foo> // () => string
