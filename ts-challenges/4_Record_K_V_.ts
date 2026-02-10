export {}

type Key = 'a' | 'b' | 'c'

type MyRecord<K extends string | symbol | number, V> = {
  [L in K]: V
}

const a: MyRecord<Key, string> = {
  a: 'BFE.dev',
  b: 'BFE.dev',
  c: 'BFE.dev'
}

a.a = 'bigfrontend.dev' // OK
a.b = 123 // Error
a.d = 'BFE.dev' // Error

type Foo = MyRecord<{a: string}, string> // Error
