type TDeepReadonly<T extends object> = {
  readonly [key in keyof T]: T[key] extends object
  ? TDeepReadonly<T[key]> : T[key]
}

type TUser = {
  name: string
  address: {
    city: string
  }
}

type TReadonlyUser = Readonly<TUser>
type TDeepReadonlyUser = TDeepReadonly<TUser>

declare const rUser: TReadonlyUser

//@ts-expect-error expected error
rUser.name = 'heh' 
rUser.address.city = 'heh' // we have no error because it's shallowly readonly

declare const dRUser: TDeepReadonlyUser

//@ts-expect-error expected error
dRUser.name = 'heh' // expected error
//@ts-expect-error expected error
dRUser.address.city = 'heh' // we have error because it's deeply readonly




