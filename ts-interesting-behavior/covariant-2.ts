class Mammal {
  mustMilk = true
}

class Animal extends Mammal {
  name = 'animal'
}

class Dog extends Animal {
  isBark = true
}

declare let mammalFactory: () => Mammal;
declare let animalFactory: () => Animal;
declare let dogFactory: () => Dog;

mammalFactory = animalFactory // ✅
mammalFactory = dogFactory // ✅
animalFactory = dogFactory // ✅
dogFactory = animalFactory // 💥
dogFactory = mammalFactory // 💥
animalFactory = mammalFactory // 💥


declare let mammalHandler: (mam: Mammal) => void;
declare let animalHandler: (animal: Animal) => void;
declare let dogHandler: (dog: Dog) => void;

animalHandler = mammalHandler // ✅
dogHandler = animalHandler // ✅
dogHandler = mammalHandler // ✅
mammalHandler = animalHandler  // 💥
mammalHandler  = dogHandler  // 💥
animalHandler  = dogHandler  // 💥

// T ⊆ string
function concat<T extends string>(a: T, b: T): T {
  const v =  a.concat(b)
  const x = 'hello' as const
  return v // string is not ⊆ T (string is supertype of T)
}

// T ⊆ 'hello'
function greet<T extends 'hello'>(t: T): T {
  console.log(t)
  const x = 'hello' as const
  /**
   * T extends 'hello' does not mean that T is exactly 'hello'. 
   * ! It only means T could be any type that extends 'hello', 
   * which, in this case, is still only 'hello' itself 
   * (but it doesn't matter due to how TS works).
   * ! Another words TS cannot guarantee that except of 'hello' there is no another types which are subtypes of 'hello' type.
  */
  return x // 'hello' is not ⊆ T ('hello' is supertype of T)
}

greet('hello')



