export {}

type IsEmptyType<T> = T extends Record<string, string> ? keyof T extends never ? true : false : false

type A = IsEmptyType<string> // false
type B = IsEmptyType<{ a: 3; b: 2 }> // false
type C = IsEmptyType<{}> // true
type D = IsEmptyType<any> // false
type E = IsEmptyType<object> // false
type F = IsEmptyType<Object> // false
