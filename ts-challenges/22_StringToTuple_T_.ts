export {}
type StringToTuple<T extends string> = T extends `${infer F}${infer L}` ? [F, ...StringToTuple<L>] : []
type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<''> // []
