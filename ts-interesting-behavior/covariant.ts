/* eslint-disable prefer-const */
/**
 * ! About co-variance 
 */
declare let b: string
declare let c: string | number

/**
 * unsafe because string | number cannot be narrowed to string
 */
b = c  // 💥
// c = b // ✅ (b is compatible with c)

declare let f1: () => string
declare let g1: () => string | number

/**
 * break break behavior of f1 since its signature tells that
 * function should return only string, but g1 can return string | number 
 */
f1 = g1 // 💥
/**
 * g1 signature tells that fn should return string or number, 
 * f1 returns only string, which doesn't break function behavior.
 * ! Such behavior is called co-variant
 */
// g1 = f1 //✅ 

// -----------------------------------------------------------------------------------------------

/**
 * ! About contra-variance 
 */

/**
 * string is a sub-type of string | number, all elements of string appear in string | number,
 * so we can assign b to c. c still behaves as we originally intended it. 
 * ! This is co-variance (real type is compatible(same or narrowed) with expected)
 */

declare let f: (x: string) => void
declare let g: (x: string | number) => void

/**
 * break behavior of g, since we won't be able to call g with number anymore. 
 * g signature is ready to accept number, but impl of f does not
 */
/**
 * ! Contra-variance for function arguments works only if "strictFunctionTypes": true
 */
g = f // 💥
/**
 * f signature accepts only string which narrowed than real impl of g.
 * It's ok, we didn't break behavior
 */
// f = g // ✅

/**
 * And if you think about it, this is also clear.
 * When assigning f to g, we suddenly can’t call g with numbers anymore! We miss part of the contract of g.
 * ! This is contra-variance, and it effectively works like an intersection.
 */

/**
 * ! Summary:
 * ? 1. For variables which store values and for return types of functions typescript uses co-variance
 * ? 2. For arguments of functions typescript has 2 behaviors:
 * ?   2.1. (Default behavior): arguments of functions are co-variant
 * ?   2.2 (Stricter behavior with "strictFunctionTypes": true): arguments of functions are contra-variant
 */
