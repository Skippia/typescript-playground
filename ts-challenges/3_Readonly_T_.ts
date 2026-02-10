export {}

type Foo = {
  a: string
}

type MyReadonly<T extends object> = {
  readonly[key in keyof T]: T[key]
}

const a:Foo = {
  a: 'BFE.dev',
}
a.a = 'bigfrontend.dev'
// OK

const b:MyReadonly<Foo> = {
  a: 'BFE.dev'
}
b.a = 'bigfrontend.dev'
// Error
