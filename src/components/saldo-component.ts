import Cuenta from '../types/Cuenta.js'
import { FormatoFecha } from '../types/FormatoFecha.js'
import { formatearFecha, formatearMoneda } from '../utils/formatters.js'

const elementoFecha = document.querySelector('.block-saldo time') as HTMLElement
const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement

if (elementoFecha) {
  elementoFecha.textContent = formatearFecha(
    Cuenta.getFechaDeAcceso(),
    FormatoFecha.DIA_SEMANA_DIA_MES_ANIO
  )
}

renderizarSaldo()

function renderizarSaldo(): void {
  if (elementoSaldo != null) {
    elementoSaldo.textContent = formatearMoneda(Cuenta.getSaldo())
  }
}

const saldoComponent = {
  actualizar() {
    renderizarSaldo()
  },
}

export default saldoComponent
