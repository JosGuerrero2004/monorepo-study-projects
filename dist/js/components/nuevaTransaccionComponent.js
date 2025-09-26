import Cuenta from '../types/Cuenta.js';
import extractoComponent from './extracto-component.js';
import saldoComponent from './saldo-component.js';
const elementoFormulario = document.querySelector('.block-nueva-transaccion form');
elementoFormulario.addEventListener('submit', function (event) {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert('Por favor, rellene todos los campos de la transacción');
            return;
        }
        const inputTipoTransaccion = elementoFormulario.querySelector('#tipoTransaccion');
        const inputValor = elementoFormulario.querySelector('#valor');
        const inputFecha = elementoFormulario.querySelector('#fecha');
        let tipoTransaccion = inputTipoTransaccion.value;
        let valor = inputValor.valueAsNumber;
        let fecha = new Date(inputFecha.value + 'T00:00:00');
        inputValor.clientWidth;
        const nuevaTransaccion = {
            tipoTransaccion: tipoTransaccion,
            valor: valor,
            fecha: fecha,
        };
        Cuenta.registrarTransaccion(nuevaTransaccion);
        console.log(nuevaTransaccion);
        saldoComponent.actualizar();
        extractoComponent.actualizar();
        elementoFormulario.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
