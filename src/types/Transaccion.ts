import { TipoTransaccion } from './TipoTransaccion.js'

export type Transaccion = {
  tipoTransaccion: TipoTransaccion
  valor: number
  fecha: Date
}
