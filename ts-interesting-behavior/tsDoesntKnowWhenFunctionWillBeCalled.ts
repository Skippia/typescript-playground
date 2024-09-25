// declare let orderStates: OrderStates // того же поведения (1) вне фукнкции можно добиться declare - тайпскрипт не подсматривал за инициализацией )

interface OrderCreateState {
  status: 'create'
}
interface OrderCanselState {
  status: 'cancel'
  message: string
}
type OrderStates = OrderCreateState | OrderCanselState

const orderStates: OrderStates = {
  status: 'create',
}

orderStates.status = 'cancel' // ошибка, т.к. orderStates = OrderCreateState

// если так сделать, то все ок
// orderStates = {
// 	status: 'cancel',
// 	message: 'error'
// }

function cancelOrder() {
  // тайпскрипт не может строго доказать что это присваивание приведет объёкт в неконсистентное состояниек (1)
  orderStates.status = 'cancel' // нет ошибки
}
