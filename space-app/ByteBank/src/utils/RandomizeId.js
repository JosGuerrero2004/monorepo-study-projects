const RandomizeId = (inicio, fin) => {
  const id = Math.floor(Math.random() * (fin - inicio))
  console.log(id)
  return id
}

export default RandomizeId
