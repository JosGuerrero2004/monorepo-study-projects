import error404 from '../assets/404.png'

const NotFound = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={error404}
        alt='ruta no encontrada, error 404'
        style={{ maxWidth: '400px' }}
      />
    </div>
  )
}

export default NotFound
