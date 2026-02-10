export {}

// all properties are optional
interface Foo {
  a?: string
  b?: number
  c?: boolean
}

type MyRequired<T extends object> = {
  [key in keyof T]-?: T[key]
}

const a: MyRequired<Foo> = {}
// Error

const b: MyRequired<Foo> = {
  a: 'BFE.dev',
}
// Error

const c: MyRequired<Foo> = {
  b: 123,
}
// Error

const d: MyRequired<Foo> = {
  b: 123,
  c: true,
}
// Error

const e: MyRequired<Foo> = {
  a: 'BFE.dev',
  b: 123,
  c: true,
}
// valid
