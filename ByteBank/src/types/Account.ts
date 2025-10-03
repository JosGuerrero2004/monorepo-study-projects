import { Transaction } from './Transaction.js'
import { GroupTransaction } from './GroupTransaction.js'
import { TransactionType } from './TransactionType.js'
import { Storage } from './Storage.js'
import { ValidateDebit, ValidateDeposit } from './Decorators.js'

export class Account {
  // atributos - datos
  protected name: string
  protected balance: number = Storage.read<number>('balance') || 0
  private transactions: Transaction[] =
    Storage.read<Transaction[]>('transactions', (key: string, value: string) => {
      if (key === 'date') {
        return new Date(value)
      }

      return value
    }) || []

  constructor(name: string) {
    this.name = name
  }

  // metodos - funciones
  getName() {
    return this.name
  }

  getBalance() {
    return this.balance
  }

  getAccessDate(): Date {
    return new Date()
  }

  @ValidateDebit
  private debit(value: number): void {
    this.balance -= value
    Storage.save('balance', this.balance)
  }

  @ValidateDeposit
  protected deposit(value: number): void {
    this.balance += value
    Storage.save('balance', this.balance)
  }

  getTransactionGroups(): GroupTransaction[] {
    const transactionGroups: GroupTransaction[] = []
    const transactionList: Transaction[] = structuredClone(this.transactions)
    const sortedTransactions: Transaction[] = transactionList.sort(
      (t1, t2) => t2.date.getTime() - t1.date.getTime()
    )
    let currentGroupLabel: string = ''

    for (let transaction of sortedTransactions) {
      let groupLabel: string = transaction.date.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
      })
      if (currentGroupLabel !== groupLabel) {
        currentGroupLabel = groupLabel
        transactionGroups.push({
          label: groupLabel,
          transactions: [],
        })
      }
      transactionGroups.at(-1).transactions.push(transaction)
    }

    return transactionGroups
  }

  registerTransaction(newTransaction: Transaction): void {
    if (newTransaction.transactionType == TransactionType.DEPOSIT) {
      this.deposit(newTransaction.value)
    } else if (
      newTransaction.transactionType == TransactionType.TRANSFER ||
      newTransaction.transactionType == TransactionType.BILL_PAYMENT
    ) {
      this.debit(newTransaction.value)
      newTransaction.value *= -1
    } else {
      throw new Error('Tipo de Transacción es inválido!')
    }

    this.transactions.push(newTransaction)
    console.log(this.getTransactionGroups())
    Storage.save('transactions', this.transactions)
  }
}

export default new Account('Juana Ferreira')
