export {}

class Foo {
  constructor(a: string, b: number, c: boolean) {}
}

type MyConstructorParameters<T extends (new (...args: any) => any)> = T extends (new (...args: infer R) => any) ? R : never

type C = MyConstructorParameters<typeof Foo>
// [a: string, b: number, c: boolean]
