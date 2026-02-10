/**
 * `Distributive Conditional Types` are feature that allow to apply conditional logic to each member 
 * of a union type individually. 
 * This “distributive” behavior applies only to union types and can simplify complex type transformations 
 * by breaking down a union into its components and applying the conditional type to each on
 */

/**
 * When conditional types act on a generic type, they become distributive when given a union type. For example, take the following:
 */

type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number> // string[] | number[]
/**
 * What happens here is that StrArrOrNumArr distributes on:
 * string | number and maps over each member type of the union.
 * 
 * ToArray<string | number> ≡ ToArray<string> | ToArray<number>
 */

/**
 * To avoid this default behavior surround each side of the extends keyword with square brackets
 */

type _ToArray<Type> = [Type] extends any ? Type[] : never
type _StrArrOrNumArr = _ToArray<string | number> // (string | number)[]

// ---------------------------------------------------------------------------

/**
 * When we apply conditional type to arguments of function we always get union type
 * of these arguments
 */
type InferParam<T> = T extends (arg: infer P) => any ? P : never;

type FuncUnion = ((x: string | number) => void) | ((x: number | boolean) => void);

type InferredParam = InferParam<FuncUnion> // string | number | boolean
