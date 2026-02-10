export {}

type FirstItem<T extends any[]> = T extends [] ? never : T[0]

type A = FirstItem<[string, number, boolean]> // string
type B = FirstItem<['B', 'F', 'E']> // 'B'
