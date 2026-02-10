export {}
type LastItem<T extends any[]> = T extends [...starts: any[], last: infer L] ? L : never

type A = LastItem<[string, number, boolean]> // boolean
type B = LastItem<['B', 'F', 'E']> // 'E'
type C = LastItem<[]> // never
