export{}

type Foo = {
  a: string
  b: number
  c: boolean
}

type MyPick<T extends object, K extends keyof T> = {
  [key in keyof T as key extends K ? key : never]: T[key]
}

type A = MyPick<Foo, 'a' | 'b'> // {a: string, b: number}
type B = MyPick<Foo, 'c'> // {c: boolean}
type C = MyPick<Foo, 'd'> // Error
