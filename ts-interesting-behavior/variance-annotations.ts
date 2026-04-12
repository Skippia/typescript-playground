/* eslint-disable prefer-const */
/**
 * ! Variance Annotations (in, out, in out) — explicit variance markers for generic type parameters
 * Introduced in TypeScript 4.7
 * Builds on co-variance and contra-variance concepts from covariant.ts and covariant-2.ts
 */

class Mammal {
  mustMilk = true
}

class Animal extends Mammal {
  name = 'animal'
}

class Dog extends Animal {
  isBark = true
}

/**
 * Subtyping chain: Dog <: Animal <: Mammal
 * (Dog is the most specific, Mammal is the most general)
 */

// -----------------------------------------------------------------------------------------------

/**
 * ! `out T` — marks type parameter as covariant
 * T only appears in output/return positions.
 * Direction of assignability follows the subtyping direction: narrower -> wider is OK.
 */
type Provider<out T> = () => T

declare let dogProvider: Provider<Dog>
declare let animalProvider: Provider<Animal>
declare let mammalProvider: Provider<Mammal>

/**
 * Provider<Dog> returns Dog, which is also a valid Animal/Mammal.
 * So narrower providers can be assigned to wider ones.
 */
mammalProvider = animalProvider // ✅
mammalProvider = dogProvider    // ✅
animalProvider = dogProvider    // ✅

/**
 * Provider<Animal> might return a plain Animal, which is NOT a Dog.
 * Assigning wider providers to narrower ones would break the contract.
 */
dogProvider = animalProvider    // 💥
dogProvider = mammalProvider    // 💥
animalProvider = mammalProvider // 💥

/**
 * This matches the factory behavior from covariant-2.ts —
 * the `out` annotation makes the covariant direction explicit.
 */

// -----------------------------------------------------------------------------------------------

/**
 * ! `in T` — marks type parameter as contravariant
 * T only appears in input/parameter positions.
 * Direction of assignability is reversed: wider -> narrower is OK.
 */
type Consumer<in T> = (value: T) => void

declare let dogConsumer: Consumer<Dog>
declare let animalConsumer: Consumer<Animal>
declare let mammalConsumer: Consumer<Mammal>

/**
 * Consumer<Mammal> can handle any Mammal, so it can certainly handle an Animal or Dog.
 * Wider consumers can be assigned to narrower ones.
 */
animalConsumer = mammalConsumer // ✅
dogConsumer = animalConsumer    // ✅
dogConsumer = mammalConsumer    // ✅

/**
 * Consumer<Dog> only knows how to handle Dogs.
 * If we assign it to Consumer<Animal>, someone could pass a plain Animal — breaking the contract.
 */
mammalConsumer = animalConsumer // 💥
mammalConsumer = dogConsumer    // 💥
animalConsumer = dogConsumer    // 💥

/**
 * This matches the handler behavior from covariant-2.ts —
 * the `in` annotation makes the contravariant direction explicit.
 */

// -----------------------------------------------------------------------------------------------

/**
 * ! `in out T` — marks type parameter as invariant
 * T appears in both input and output positions.
 * Neither direction of assignment is safe — only exact type matches are allowed.
 */
type Store<in out T> = {
  get: () => T
  set: (value: T) => void
}

declare let dogStore: Store<Dog>
declare let animalStore: Store<Animal>

/**
 * Why animalStore = dogStore fails:
 * If allowed, someone could call animalStore.set(new Animal()),
 * which would violate dogStore's expectation that stored values are Dogs.
 *
 * Why dogStore = animalStore fails:
 * If allowed, dogStore.get() might return a plain Animal — not a Dog.
 */
animalStore = dogStore // 💥
dogStore = animalStore // 💥

// -----------------------------------------------------------------------------------------------

/**
 * ! TypeScript validates that variance annotations match actual usage of T
 * If the annotation contradicts how T is used, the compiler produces an error.
 */

/**
 * T is used in input position (parameter), but marked as `out` (covariant).
 * TypeScript detects the mismatch.
 */
type BadProvider<out T> = (value: T) => void // 💥

/**
 * T is used in output position (return), but marked as `in` (contravariant).
 */
type BadConsumer<in T> = () => T // 💥

/**
 * T is used in both positions, but marked only as `out`.
 * The `set` method uses T in input position, violating the covariant annotation.
 */
type BadStore<out T> = { // 💥
  get: () => T
  set: (value: T) => void
}

// -----------------------------------------------------------------------------------------------

/**
 * ! Practical benefit: faster type checking for deeply nested and recursive types
 *
 * Without `out`, TypeScript must do a full structural comparison
 * to determine if Tree<Dog> is assignable to Tree<Animal> —
 * recursively checking every `value` and `children` at every level.
 *
 * With `out`, TypeScript can use the variance annotation as a shortcut:
 * it knows T is covariant, so it only needs to check that Dog extends Animal.
 */
type Tree<out T> = {
  value: T
  children: Tree<T>[]
}

declare let dogTree: Tree<Dog>
declare let animalTree: Tree<Animal>

animalTree = dogTree // ✅ (TypeScript uses variance shortcut — no deep structural check)
dogTree = animalTree // 💥

type LinkedList<out T> = {
  value: T
  next: LinkedList<T> | null
}

declare let dogList: LinkedList<Dog>
declare let animalList: LinkedList<Animal>

animalList = dogList // ✅
dogList = animalList // 💥

// -----------------------------------------------------------------------------------------------

/**
 * ! Summary:
 * ? 1. `out T` marks T as covariant — T only appears in return/output positions. Provider<Dog> is assignable to Provider<Animal>.
 * ? 2. `in T` marks T as contravariant — T only appears in parameter/input positions. Consumer<Animal> is assignable to Consumer<Dog>.
 * ? 3. `in out T` marks T as invariant — T appears in both positions. Only exact type matches are allowed.
 * ? 4. TypeScript enforces correctness: using T in a position that contradicts the annotation produces a compile error.
 * ? 5. Main practical benefit: variance annotations allow TypeScript to skip expensive structural comparisons
 * ?    for deeply nested/recursive types, using variance as a shortcut instead.
 * ? 6. Variance annotations serve as self-documentation — they make the intended variance of type parameters
 * ?    explicit for other developers reading the code.
 */

export {}
