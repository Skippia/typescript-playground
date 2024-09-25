export {}

type Foo = {
  a: string
  b: number
  c: boolean
}

type MyOmit<T extends object,K extends keyof any> = {
  [key in keyof T as key extends K ? never: key]: T[key]
}

type A = MyOmit<Foo, 'a' | 'b'> // {c: boolean}
type B = MyOmit<Foo, 'c'> // {a: string, b: number}
type C = MyOmit<Foo, 'c' | 'd'>  // {a: string, b: number}
