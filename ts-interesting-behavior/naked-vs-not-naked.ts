/* eslint-disable @typescript-eslint/no-explicit-any */
// type Naked<T> =
//   T extends ... // naked!

/**
 * Naked types in conditional types have a certain feature.
 * If T is a union, they run the conditional type for each constituent of the union.
 * So with a naked type, a conditional of union types becomes a union of conditional types. (A | B)[] => A[] | B[]
 */

// type NotNaked<T> =
//   { o: T } extends ... // not naked!

type WrapNaked<T> = T extends any ? { o: T } : never

type Foo1 = WrapNaked<string | number | boolean> // { o: string; } | { o: number; } | { o: false; } | { o: true; }

// A naked type, so this equals to

type Foo2 = WrapNaked<string> | WrapNaked<number> | WrapNaked<boolean>

// equals to

type Foo3 = string extends any
  ? { o: string }
  : never | number extends any
  ? { o: number }
  : never | boolean extends any
  ? { o: boolean }
  : never

type Foo4 = { o: string } | { o: number } | { o: boolean }

// Not-naked version

type WrapNotNaked<T> = { o: T } extends any ? { o: T } : never
type WrapNakedModifying<T> = [T] extends [any] ? { o: T } : never

type Foo5 = WrapNotNaked<string | number | boolean> //  {  o: string | number | boolean; }
type Foo51 = WrapNakedModifying<string | number | boolean> //  {  o: string | number | boolean; }

// A non Naked type, so this equals to

type Foo6 = { o: string | number | boolean } extends any
  ? { o: string | number | boolean }
  : never

type Foo7 = { o: string | number | boolean }

/**
 * Shortly speaking:
 *  if T is union - naked type distributes union to subtypes and maps over each of them separetely
 *    (Transform<A | B> => Transform<A> | Transform<B> )
 *  if T is union - not-naked type run the conditional type for the whole union at once (?)
      (Transform<A | B> => Transform<A | B>)
* */
