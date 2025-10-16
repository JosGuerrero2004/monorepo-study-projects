import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

import "./Sorteo.css"

const Sorteo = () => {

    const participantes = useSelector((state:any)=>state.amigoSecreto.names);
    const resultado = useSelector((state:any)=>state.resultado.sorteo)

    const [participante,setParticipante] = useState("");

    const [amigoSecreto,setAmigoSecreto]= useState("");
    const sortear = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setAmigoSecreto(resultado.get(participante));
        
    }

    return (<Card>

        <section className="sorteo">
            <h2>Quien va a sacar el papelito?</h2>
            <form onSubmit={sortear}>
                <select 
                    required
                    name="participantes"
                    id="participantes"
                    value={participante}
                    onChange={e=>setParticipante(e.target.value)}
                    
                    >
                    <option value="">Seleccione su nombre</option>
                    {participantes.map((participante:string)=>
                    <option key={participante}>{participante}</option>
                )}
                </select>
                <button className="boton-sortear">Sortear</button>
            </form>
                {amigoSecreto && <p className="resultado" role="alert">{amigoSecreto}</p>}
            <footer className="sorteo">
                <img src="/imagenes/avion.png" className="avion" alt="Avion" />
            </footer>
        </section>
    </Card>
    )
  
}

export default Sorteo