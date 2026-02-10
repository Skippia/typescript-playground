export {}

type UnionToIntersection<T> =
  (T extends any
    ? (x: T) => any : never) extends (x: infer R) => any ? R : never

type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }> // {a: string} & {b: string} & {c: string}
