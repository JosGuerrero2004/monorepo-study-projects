import Cuenta from '../types/Cuenta.js';
import { FormatoFecha } from '../types/FormatoFecha.js';
import { formatearFecha, formatearMoneda } from '../utils/formatters.js';
const elementoFecha = document.querySelector('.block-saldo time');
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (elementoFecha) {
    elementoFecha.textContent = formatearFecha(Cuenta.getFechaDeAcceso(), FormatoFecha.DIA_SEMANA_DIA_MES_ANIO);
}
renderizarSaldo();
function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatearMoneda(Cuenta.getSaldo());
    }
}
const saldoComponent = {
    actualizar() {
        renderizarSaldo();
    },
};
export default saldoComponent;
