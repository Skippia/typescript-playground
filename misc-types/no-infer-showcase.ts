// Before TS 5.4
type _NoInfer<T> = [T][T extends any ? 0 : never]
declare const _createTrafficLight: <C extends string>(colors:C[], defaultColor: _NoInfer<C>) => void
_createTrafficLight(['red', 'yellow', 'green'], 'orange') // Error because defaultColor is of another type
_createTrafficLight(['red', 'yellow', 'green'], 'green') // Works perfeclty


// >= TS 5.4
declare const createTrafficLight: <C extends string>(colors:C[], defaultColor: NoInfer<C>) => void
createTrafficLight(['red', 'yellow', 'green'], 'orange') // Error because defaultColor is of another type
createTrafficLight(['red', 'yellow', 'green'], 'green') // Works perfeclty
