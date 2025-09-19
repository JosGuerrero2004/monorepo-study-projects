const isNewFoto = (fecha) => {
  const hoy = new Date()
  const formattedDate = new Date(fecha)

  const valid = new Date()
  valid.setMonth(hoy.getMonth() - 6)

  return formattedDate > valid
}

export default isNewFoto
