import React from 'react'
import loadingSVG from '/img/Loading.svg'

const Cargando = () => {
  return (
    <div style={{ display: 'block', textAlign: 'center', flex: 1 }}>
      <img src={loadingSVG} style={{ width: '30vw' }} />
    </div>
  )
}

export default Cargando
