import { FormatoFecha } from '../types/FormatoFecha.js';
export function formatearMoneda(valor) {
    return valor.toLocaleString('en-US', { currency: 'USD', style: 'currency' });
}
export function formatearFecha(fecha, formato = FormatoFecha.PATRON) {
    if (formato === FormatoFecha.DIA_SEMANA_DIA_MES_ANIO) {
        return fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    if (formato === FormatoFecha.DIA_MES) {
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
        });
    }
    return fecha.toLocaleDateString('es-ES');
}
