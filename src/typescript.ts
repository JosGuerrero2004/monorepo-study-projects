// Tipos Primitivos
let valor: number = 3000;
let nombre: string = "";
let isPago: boolean = false;
let cualquiera: any = "";
cualquiera = 22;

// Arrays
const lista: number[] = [];
lista.push(13, 22.5, 22, 89, 1.58);

// Tipos Personalizados (Type Alias)
type Transaccion = {
  tipoTransaccion: TipoTransaccion;
  fecha: Date;
  valor: number;
};

// Enum
enum TipoTransaccion {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferencia",
  PAGO_FACTURA = "Pago de factura",
}

const nuevaTransaccion: Transaccion = {
  tipoTransaccion: TipoTransaccion.PAGO_FACTURA,
  fecha: new Date(),
  valor: 0,
};
