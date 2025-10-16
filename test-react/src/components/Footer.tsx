import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSorteador } from "../hooks/useSorteador";

import "./Footer.css"
function Footer() {

    const navigate = useNavigate();

    const participantes=useSelector((state:any)=>state.amigoSecreto.names);

    const sortear =useSorteador();

    const iniciar = () => {
      sortear();
      navigate("/sorteo")
    }
    

    return (
        <footer className="footer-configuraciones">
            <button className="boton" disabled={participantes.length<3} onClick={iniciar }>
                Iniciar Juego
            </button>
            <img src="/imagenes/bolsas.png" alt="Bolsa de compras" />
        </footer>
    )
}

export default Footer