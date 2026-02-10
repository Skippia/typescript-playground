export {}

function Foo(this: { a: string }) {}
function Bar() {}

type MyThisParameterType<T extends (this: any, ...args: any) => any> = T extends (this: infer R, ...args: any) => any ? R : unknown

type A = MyThisParameterType<typeof Foo> // {a: string}
type B = MyThisParameterType<typeof Bar> // unknown
