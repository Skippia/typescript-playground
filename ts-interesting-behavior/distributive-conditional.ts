/**
 * Distributive Conditional Types
 */

/**
 * When conditional types act on a generic type, they become distributive when given a union type. For example, take the following:
 */

type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number> // string[] | number[]
/**
 * What happens here is that StrArrOrNumArr distributes on:
 * 1. string | number
 * and maps over each member type of the union, to what is effectively:
 * 2. ToArray<string> | ToArray<number>;
 * 3. string[] | number[]
 */

/**
 * To avoid this default behavior surround each side of the extends keyword with square brackets
 */

type _ToArray<Type> = [Type] extends any ? Type[] : never
type _StrArrOrNumArr = _ToArray<string | number> // (string | number)[]
