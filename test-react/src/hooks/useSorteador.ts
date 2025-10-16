
import { useSelector, useDispatch } from "react-redux";
import { definirResultado } from "../redux/resultadoSlice";
import { realizarSorteo } from "../helpers/realizarSorteo";


export const useSorteador = () => {
  const participantes = useSelector((state:any)=>state.amigoSecreto.names);

  const dispatch = useDispatch();


  return () => {

    const resultado = realizarSorteo(participantes)
    dispatch(definirResultado(resultado))

  }
}