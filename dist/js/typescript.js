// Tipos Primitivos
let valor = 3000;
let nombre = "";
let isPago = false;
let cualquiera = "";
cualquiera = 22;
// Arrays
const lista = [];
lista.push(13, 22.5, 22, 89, 1.58);
// Enum
var TipoTransaccion;
(function (TipoTransaccion) {
    TipoTransaccion["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransaccion["TRANSFERENCIA"] = "Transferencia";
    TipoTransaccion["PAGO_FACTURA"] = "Pago de factura";
})(TipoTransaccion || (TipoTransaccion = {}));
const nuevaTransaccion = {
    tipoTransaccion: TipoTransaccion.PAGO_FACTURA,
    fecha: new Date(),
    valor: 0,
};
