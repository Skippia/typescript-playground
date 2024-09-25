export {}

type Foo = 'a' | 'b' | 'c'

type MyExtract<T extends keyof any, E extends keyof any> = T extends E ? T : never

type A = MyExtract<Foo, 'a'> // 'a'
type B = MyExtract<Foo, 'a' | 'b'> // 'a' | 'b'
type C = MyExtract<Foo, 'b' | 'c' | 'd' | 'e'> // 'b' | 'c'
type D = MyExtract<Foo, never> // never
