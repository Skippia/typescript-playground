export {}

type AllExceptAny = keyof any
type IsAny<T> = [unknown] extends [T] ? ([T] extends [AllExceptAny] ? true : false) : false

type A = IsAny<string> // false
type B = IsAny<any> // true
type C = IsAny<unknown> // false
type D = IsAny<never> // false

