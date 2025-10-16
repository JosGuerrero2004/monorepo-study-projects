import shuffle from "just-shuffle";
export function realizarSorteo(participantes:string[] ) {

    const totalParticipantes = participantes.length;

    const participantesSorteados: string[] = shuffle(participantes);

    const resultado = new Map<string,string>();

    for(let i=0;i<totalParticipantes;i++){
        const indiceAmigo= i ===totalParticipantes-1 ? 0 : i+1;
        resultado.set(
            participantesSorteados[i],
            participantesSorteados[indiceAmigo]
        )
    }

    return resultado

}