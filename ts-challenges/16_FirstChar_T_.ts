export {}

type FirstChar<T extends string> = T extends `${infer F}${infer L}` ? F : never

type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never
