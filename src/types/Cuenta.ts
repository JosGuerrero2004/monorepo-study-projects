import { GrupoTransaccion } from './GrupoTransaccion.js'
import { TipoTransaccion } from './TipoTransaccion.js'
import { Transaccion } from './Transaccion.js'

let saldo: number = JSON.parse(localStorage.getItem('saldo')) || 0

const transacciones: Transaccion[] =
  JSON.parse(localStorage.getItem('transacciones'), (key: string, value: string) => {
    if (key === 'fecha') {
      return new Date(value)
    }

    return value
  }) || []

function debitar(valor: number) {
  if (valor <= 0) {
    throw new Error('El valor a ser debitado debe ser mayor que cero')
  }
  if (valor > saldo) {
    throw new Error('¡Saldo insuficiente!')
  }
  saldo -= valor
  localStorage.setItem('saldo', saldo.toString())
}

function depositar(valor: number) {
  if (valor <= 0) {
    throw new Error('El valor a depositar debe ser mayor que cero')
  }
  saldo += valor
  localStorage.setItem('saldo', saldo.toString())
}

const Cuenta = {
  getSaldo() {
    return saldo
  },

  getFechaDeAcceso(): Date {
    return new Date()
  },

  getGrupoTransacciones(): GrupoTransaccion[] {
    const gruposTransacciones: GrupoTransaccion[] = []
    const listaTransacciones: Transaccion[] = structuredClone(transacciones)

    const transaccionesOrdenadas: Transaccion[] = listaTransacciones.sort(
      (t1, t2) => t2.fecha.getTime() - t1.fecha.getTime()
    )

    let labelActualGrupoTransaccion: string = ''

    for (const transaccion of transaccionesOrdenadas) {
      let labelGrupoTransaccion: string = transaccion.fecha.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
      })

      if (labelActualGrupoTransaccion != labelGrupoTransaccion) {
        labelActualGrupoTransaccion = labelGrupoTransaccion
        gruposTransacciones.push({ label: labelGrupoTransaccion, transacciones: [] })
      }
      gruposTransacciones.at(-1).transacciones.push(transaccion)
    }
    return gruposTransacciones
  },

  registrarTransaccion(nuevaTransaccion: Transaccion): void {
    if (nuevaTransaccion.tipoTransaccion == TipoTransaccion.DEPOSITO) {
      depositar(nuevaTransaccion.valor)
    } else if (
      nuevaTransaccion.tipoTransaccion == TipoTransaccion.TRANSFERENCIA ||
      nuevaTransaccion.tipoTransaccion == TipoTransaccion.PAGO_FACTURA
    ) {
      debitar(nuevaTransaccion.valor)
      nuevaTransaccion.valor = -nuevaTransaccion.valor
    } else {
      throw new Error('Tipo de transacción inválido')
    }

    transacciones.push(nuevaTransaccion)
    localStorage.setItem('transacciones', JSON.stringify(transacciones))
  },
}

export default Cuenta
