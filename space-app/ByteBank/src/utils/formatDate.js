/**
 * Formatea una fecha en el formato '12 de septiembre de 2025'.
 * @param {string|Date} fecha - La fecha a formatear.
 * @returns {string} - La fecha formateada.
 */
const formatDate = (fecha) => {
  if (!fecha) return 'Fecha no válida'

  const objetoFecha = new Date(fecha)
  const dia = objetoFecha.getDate()
  const mes = objetoFecha.toLocaleDateString('es-ES', { month: 'long' })
  const año = objetoFecha.getFullYear()

  return `${dia} de ${mes} de ${año}`
}

export default formatDate
