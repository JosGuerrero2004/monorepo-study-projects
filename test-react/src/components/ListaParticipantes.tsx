import { useSelector } from "react-redux";

const ListaParticipantes = () => {
  
    const participantes = useSelector((state:any)=>state.amigoSecreto.names)

    return (
        <ul>
            {participantes.map((participante:any)=>(
                <li key={participante}>{participante}</li>
            ))}
        </ul>
    )
}

export default ListaParticipantes