/**
 * ! Omit is not distributive.
 * ? That means when `Omit` accepts Union, the result is narrowed to the common keys
 * https://github.com/microsoft/TypeScript/issues/39556#issuecomment-656925230
 */

type X = { userId: string }
type TransactionIncomeInput = {
  type: 'income'
} & X
type TransactionExpenseInput = {
  type: 'expense'
  categoryId: string
} & X
type TransactionTransferInput = {
  type: 'transfer'
  receiverId: string
  receiveAmount: string
  receiveCurrency: string
} & X

type TransactionInput =
  TransactionIncomeInput |
  TransactionExpenseInput |
  TransactionTransferInput

/**
 * Operator becomes distributive when we start to use extends
 */
type OmitDistributive<T, K extends keyof T> = T extends any ? Omit<T, K> : never

function createTransactionServiceWithDefaultOmit(input: Omit<TransactionInput, 'userId'>) {
  if (input.type === 'expense') {
    console.log(input.categoryId)  // ! Error
  }
}
function createTransactionServiceWithDistributiveOmit(input: OmitDistributive<TransactionInput, 'userId'>) {
  if (input.type === 'expense') {
    // `OmitDistributive` works correctly for our case
    console.log(input.categoryId)
  }
}

