export {}

type LastChar<T extends string> = T extends `${infer F}${infer M}${infer L}` ? L : never

type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never
