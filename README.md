# typescript-playground

> Horror stories for Non-TS fans

Коллекция из 42 type-level челленджей, демонстраций неочевидного поведения TypeScript и кастомных утилитарных типов. Весь код — исключительно на уровне типов (`noEmit: true`), никакого рантайма. Если хочешь по-настоящему понять систему типов TS — тебе сюда.

## Quick Start

```bash
git clone <repo-url>
cd typescript-playground
npm install
```

Доступные скрипты:

| Скрипт | Что делает |
|--------|-----------|
| `npm run typecheck` | Однократная проверка типов (`tsc --noEmit`) |
| `npm run typecheck:watch` | То же, но в watch-режиме |
| `npm run eslint` | Линтинг |
| `npm run eslint:fix` | Линтинг с автофиксом |

Как работать: открываешь файл в IDE, смотришь на подсветку типов и ошибки. Каждый файл — самодостаточная задача. Наводишь курсор на тип — видишь результат. Ломаешь — чинишь — понимаешь.

## Project Structure

```
typescript-playground/
├── ts-challenges/           # 42 type-level челленджа
│   ├── 1_Partial_T_.ts
│   ├── ...
│   └── 42_Equal_T_I_.ts
├── ts-interesting-behavior/ # Неочевидное поведение TS
│   ├── covariant.ts
│   ├── covariant-2.ts
│   ├── distributive-conditional.ts
│   ├── intersection-to-union.ts
│   ├── naked-vs-not-naked.ts
│   ├── omit-is-not-distributive.ts
│   └── ts-doesnt-know-when-fn-will-be-called.ts
├── misc-types/              # Утилитарные типы
│   ├── deep-readonly.ts
│   ├── invert.ts
│   └── no-infer-showcase.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

## Type Challenges

42 задачи на реализацию встроенных и кастомных utility types с нуля. Каждый файл — отдельный челлендж с тестовыми проверками через type assertions.

### Mapped Types (#1-6)

Базовые mapped types — основа системы типов TS. Тут учишься ходить по ключам объекта и трансформировать их.

| # | Тип | Что делает |
|---|-----|-----------|
| 1 | `MyPartial<T>` | Делает все свойства опциональными |
| 2 | `MyRequired<T>` | Делает все свойства обязательными |
| 3 | `MyReadonly<T>` | Делает все свойства readonly |
| 4 | `MyRecord<K, V>` | Создаёт объектный тип с ключами K и значениями V |
| 5 | `MyPick<T, K>` | Выбирает указанные свойства из типа |
| 6 | `MyOmit<T, K>` | Убирает указанные свойства из типа |

```ts
type MyPartial<T extends object> = { [key in keyof T]?: T[key] }
```

### Union Operations (#7-9)

Операции над union-типами через distributive conditional types.

| # | Тип | Что делает |
|---|-----|-----------|
| 7 | `MyExclude<T, E>` | Исключает из union типы, совместимые с E |
| 8 | `MyExtract<T, E>` | Извлекает из union типы, совместимые с E |
| 9 | `MyNonNullable<T>` | Убирает `null` и `undefined` из union |

```ts
type MyExclude<T, E> = T extends E ? never : T
```

### Function Types (#10-15)

Вытаскивание информации из типов функций через `infer`. Самый хитрый трюк тут — `ThisParameterType`, потому что `this` в TS-функциях живёт отдельной жизнью.

| # | Тип | Что делает |
|---|-----|-----------|
| 10 | `MyParameters<T>` | Извлекает типы параметров функции |
| 11 | `MyConstructorParameters<T>` | Извлекает параметры конструктора класса |
| 12 | `MyReturnType<T>` | Извлекает возвращаемый тип функции |
| 13 | `MyInstanceType<T>` | Извлекает тип экземпляра из конструктора |
| 14 | `MyThisParameterType<T>` | Извлекает тип `this`-параметра |
| 15 | `MyOmitThisParameter<T>` | Убирает `this`-параметр из функции |

```ts
type MyReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : never
```

### String Manipulation (#16-17, #24, #32-33)

Template literal types — одна из самых мощных фич TS. Позволяют парсить и генерировать строковые типы.

| # | Тип | Что делает |
|---|-----|-----------|
| 16 | `FirstChar<T>` | Первый символ строки |
| 17 | `LastChar<T>` | Последний символ строки |
| 24 | `LengthOfString<T>` | Длина строкового типа |
| 32 | `RepeatString<S, N>` | Повторяет строку N раз |
| 33 | `TupleToString<T>` | Склеивает кортеж строк в одну строку |

```ts
type FirstChar<T extends string> = T extends `${infer F}${infer _}` ? F : never
```

### Tuple Operations (#18-19, #21-23, #26-27, #29, #31, #34-35)

Самая обширная категория. Рекурсивные типы над кортежами — по сути, функциональное программирование на уровне типов.

| # | Тип | Что делает |
|---|-----|-----------|
| 18 | `TupleToUnion<T>` | Кортеж в union |
| 19 | `FirstItem<T>` | Первый элемент кортежа |
| 21 | `LastItem<T>` | Последний элемент кортежа |
| 22 | `StringToTuple<T>` | Строка в кортеж символов |
| 23 | `LengthOfTuple<T>` | Длина кортежа |
| 26 | `ReverseTuple<T>` | Разворот кортежа |
| 27 | `Flat<T>` | Плоский массив из вложенных |
| 29 | `Shift<T>` | Убирает первый элемент |
| 31 | `Push<T, I>` | Добавляет элемент в конец |
| 34 | `Repeat<T, C>` | Повторяет тип C раз в кортеже |
| 35 | `Filter<T, A>` | Фильтрация элементов по типу |

```ts
type ReverseTuple<T extends any[]> =
  T extends [...infer F, infer L] ? [L, ...ReverseTuple<F>] : []
```

### Type Guards & Checks (#20, #28, #30, #42)

Типы-предикаты: проверяют, является ли тип `never`, `any`, пустым объектом или совпадает с другим. Стоит разобраться, если хочешь понять, почему `[T] extends [never]` работает, а `T extends never` — нет.

| # | Тип | Что делает |
|---|-----|-----------|
| 20 | `IsNever<T>` | Проверяет, является ли тип `never` |
| 28 | `IsEmptyType<T>` | Проверяет, пуст ли объектный тип |
| 30 | `IsAny<T>` | Проверяет, является ли тип `any` |
| 42 | `Equal<A, B>` | Проверяет точное равенство двух типов |

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

### Type-level Arithmetic (#36-39)

Арифметика на уровне типов через подсчёт длины кортежей. Выглядит безумно, но работает.

| # | Тип | Что делает |
|---|-----|-----------|
| 36 | `LargerThan<A, B>` | A > B |
| 37 | `SmallerThan<A, B>` | A < B |
| 38 | `Add<A, B>` | A + B |
| 39 | `ToNumber<T>` | Строка в число (`"42"` → `42`) |

```ts
type Add<A extends number, B extends number> =
  [...NumberToArray<A>, ...NumberToArray<B>]['length']
```

### Advanced Transformations (#25, #40-41)

Продвинутые трансформации: unwrap промисов, union → intersection, поиск индекса в кортеже.

| # | Тип | Что делает |
|---|-----|-----------|
| 25 | `UnwrapPromise<T>` | Извлекает тип из `Promise<T>` |
| 40 | `UnionToIntersection<T>` | `A \| B` → `A & B` |
| 41 | `FindIndex<T, E>` | Индекс элемента в кортеже |

```ts
type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never
```

## Interesting TypeScript Behavior

Файлы из `ts-interesting-behavior/` — демонстрации неочевидных аспектов системы типов. Каждый файл — отдельная история.

### Covariance & Contravariance

`covariant.ts`, `covariant-2.ts`

Ковариантность и контравариантность в TS на примерах наследования. Возвращаемые типы ковариантны (можно вернуть потомка вместо родителя), а аргументы функций — контравариантны (можно принять родителя вместо потомка). Это не абстрактная теория — `strictFunctionTypes` включает проверку именно контравариантности аргументов. Без этого флага TS разрешает бивариантные аргументы, что приводит к runtime-ошибкам.

### Distributive Conditional Types

`distributive-conditional.ts`

Когда conditional type применяется к «голому» (naked) type parameter, он автоматически распределяется по union. `T extends U ? X : Y` при `T = A | B` превращается в `(A extends U ? X : Y) | (B extends U ? X : Y)`. Это фундаментальное поведение, на котором построены `Exclude`, `Extract` и другие встроенные типы.

### Naked vs Not-naked Types

`naked-vs-not-naked.ts`

Распределение по union происходит только для «голых» type parameters — тех, что стоят в conditional type без обёртки. Стоит обернуть в `[T]` или `T[]` — распределение пропадает. Именно поэтому `IsNever` использует `[T] extends [never]`, а не просто `T extends never`.

### Omit is Not Distributive

`omit-is-not-distributive.ts`

Стандартный `Omit` не распределяется по discriminated unions — он «сплющивает» union в общий тип. Если нужно сохранить дискриминант, приходится писать свой `OmitDistributive`, который сначала распределяет, а потом применяет `Omit` к каждому члену union отдельно.

### Union-to-Intersection Trick

`intersection-to-union.ts`

Контравариантные позиции (аргументы функций) превращают union в intersection при инференсе. `(x: A) => void | (x: B) => void` при `infer R` в позиции аргумента даёт `A & B`. На этом трюке построен `UnionToIntersection<T>` — один из самых элегантных хаков в type-level TS.

### TS Can't Track Function Call Timing

`ts-doesnt-know-when-fn-will-be-called.ts`

TypeScript сужает типы внутри блока кода, но не может знать, когда будет вызвана callback-функция. Если ты сузил тип переменной через `if`, а потом передал callback, внутри которого используешь эту переменную — TS не гарантирует, что сужение всё ещё актуально. Классическая проблема с замыканиями и мутабельными переменными.

## Utility Types (misc-types/)

### DeepReadonly

`misc-types/deep-readonly.ts`

Встроенный `Readonly<T>` работает только на один уровень вложенности. `TDeepReadonly<T>` рекурсивно проходит по всем вложенным объектам:

```ts
type TDeepReadonly<T extends object> = {
  readonly [key in keyof T]: T[key] extends object ? TDeepReadonly<T[key]> : T[key]
}
```

### Invert

`misc-types/invert.ts`

Инверсия ключей и значений объектного типа — `{ a: '1', b: '2' }` → `{ '1': 'a', '2': 'b' }`. Файл содержит и type-level реализацию, и runtime-функцию.

```ts
type TInvert<T extends Record<string, string>> = {
  [key in T[keyof T]]: {
    [keyInner in keyof T]: T[keyInner] extends key ? keyInner : never
  }[keyof T]
}
```

### NoInfer Showcase

`misc-types/no-infer-showcase.ts`

`NoInfer<T>` не даёт TypeScript выводить тип из конкретного аргумента. До TS 5.4 приходилось использовать хак с условным типом, теперь это встроенный utility type. Полезно, когда хочешь, чтобы тип выводился из одного параметра, а второй просто проверялся.

```ts
declare const createTrafficLight: <C extends string>(
  colors: C[],
  defaultColor: NoInfer<C>
) => void
```

## Configuration Notes

**tsconfig.json** — максимально строгий режим:
- `strict: true` + все `strict*` флаги включены явно
- `noUncheckedIndexedAccess: true` — индексный доступ возвращает `T | undefined`
- `noEmit: true` — никакой компиляции, только проверка типов
- `verbatimModuleSyntax: true` — строгий импорт/экспорт

**ESLint** — [`@antfu/eslint-config`](https://github.com/antfu/eslint-config) с правилом `type` вместо `interface` (`@typescript-eslint/consistent-type-definitions`).

**Стилистика** — 2 пробела, single quotes, LF (см. `.editorconfig`).
