/* eslint-disable prefer-const */
declare let b: string
declare let c: string | number

c = b // ✅

/**
 * string is a sub-type of string | number, all elements of string appear in string | number,
 * so we can assign b to c. c still behaves as we originally intended it. This is co-variance.
 */

/**
 * This on the other hand, won’t work:
 */

type Fun<X> = (...args: X[]) => void

declare let f: Fun<string>
declare let g: Fun<string | number>

g = f // 💥 this cannot be assigned

/**
 * And if you think about it, this is also clear.
 * When assigning f to g, we suddenly can’t call g with numbers anymore! We miss part of the contract of g.
 * This is contra-variance, and it effectively works like an intersection.
 */

/**
 * This is what happens when we put contra-variant positions in a conditional type: TypeScript creates an intersection out of it.
 * Meaning that since we infer from a function argument, TypeScript knows that we have to fulfill the complete contract.
 * Creating an intersection of all constituents in the union.
 */
