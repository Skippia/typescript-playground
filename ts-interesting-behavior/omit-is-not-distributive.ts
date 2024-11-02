/**
 * ! Omit is not distributive.
 * ? That means when `Omit` accepts Union, the result is narrowed to the common keys
 * https://github.com/microsoft/TypeScript/issues/39556#issuecomment-656925230
 */


 type TransactionIncomeInput = {
  type: 'income'
} 
 type TransactionExpenseInput = {
  type: 'expense'
  categoryId: string
} 
 type TransactionTransferInput = {
  type: 'transfer'
  receiverId: string
  receiveAmount: string
  receiveCurrency: string
} 

type TransactionInput =
  TransactionIncomeInput |
  TransactionExpenseInput |
  TransactionTransferInput

type OmitDistributive<T, K extends keyof any> = T extends any ? Omit<T, K> : never

function createTransactionServiceWithDefaultOmit(input: Omit<TransactionInput, 'userId'>) {
  if (input.type === 'expense') {
    //@ts-expect-error `Omit` doesn't work in this case
    console.log(input.categoryId)  // ! Error
  }
}
function createTransactionServiceWithDistributiveOmit(input: OmitDistributive<TransactionInput, 'userId'>) {
  if (input.type === 'expense') {
    // `OmitDistributive` works correctly for our case
    console.log(input.categoryId) 
  }
}

