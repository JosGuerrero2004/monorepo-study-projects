import './estilos.css'

const Encabezado = () => {
    return (
        <header className="encabezado">
            <div className="imagen-logo" role="img" aria-label='Logo de Sorteador'></div>
            <img className='participante' src="/imagenes/participante.png" alt="Participante con un presente na mão" />
        </header>
    )
}

export default Encabezado
