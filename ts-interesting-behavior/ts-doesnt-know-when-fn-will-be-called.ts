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

orderStates.status = 'cancel' // error, since orderStates: `OrderCreateState`

function cancelOrder() {
  // TS cannot prove that this assignment goes object into inconsistent state
  orderStates.status = 'cancel' // no error
}

const _cancelOrder = () => {
  orderStates.status = 'cancel' // error
}

export {}
