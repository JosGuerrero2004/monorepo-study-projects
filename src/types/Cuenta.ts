import { TipoTransaccion } from './TipoTransaccion.js'
import { Transaccion } from './Transaccion.js'

let saldo: number = 3000

const Cuenta = {
  getSaldo() {
    return saldo
  },

  getFechaDeAcceso(): Date {
    return new Date()
  },

  registrarTransaccion(nuevaTransaccion: Transaccion): void {
    if (nuevaTransaccion.tipoTransaccion == TipoTransaccion.DEPOSITO) {
      saldo += nuevaTransaccion.valor
    } else if (
      nuevaTransaccion.tipoTransaccion == TipoTransaccion.TRANSFERENCIA ||
      nuevaTransaccion.tipoTransaccion == TipoTransaccion.PAGO_FACTURA
    ) {
      saldo -= nuevaTransaccion.valor
    } else {
      alert('Tipo de transacción invalida')
      return
    }
  },
}

export default Cuenta
