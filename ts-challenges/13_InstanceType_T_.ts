export {}

class Foo {}

type MyInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : never

type A = MyInstanceType<typeof Foo> // Foo
type B = MyInstanceType<() => string> // Error
