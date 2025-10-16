import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addName } from "../redux/amigoSecretoSlice";
import { setError, clearError } from "../redux/errorSlice";

import "./Formulario.css"
const Formulario = () => {

  const [nombre,setNombre] = useState("");
  const inputRef=useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const names = useSelector((state:any)=>state.amigoSecreto.names);
  const error = useSelector((state: any)=>state.error.message);
  
  const agregarParticipante = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(names.includes(nombre)){
      dispatch(setError("No se pueden agregar nombres duplicados"));
    } else {
      dispatch(addName(nombre));
      dispatch(clearError());
    }
    setNombre("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={agregarParticipante}>
        <div className="grupo-input-btn">
          <input
          value={nombre}
          type="text"
          ref={inputRef}
          placeholder="Ingrese los nombres de los participantes"
          onChange={e=> setNombre(e.target.value)}
          
          />
          <button disabled={!nombre}>Agregar</button>
        </div>
        {error && <p className="alerta error" role="alert">{error}</p>}

    </form>
  )
}
export default Formulario