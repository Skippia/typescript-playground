export {}
type StringToArray<T extends string> = T extends `${infer F}${infer L}` ? [F, ...StringToArray<L>] : []
type LengthOfString<T extends string> = StringToArray<T>['length']

type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0
