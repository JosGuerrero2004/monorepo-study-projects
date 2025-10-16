import { realizarSorteo } from "./realizarSorteo";
describe("Dado un sorteo de amigo secreto", () => {
  test("Cada participante no pueda sortear su propio nombre", () => {
    const participantes = ["Juan","Laura","Jorge"];
    const sorteo = realizarSorteo(participantes);

    participantes.forEach(participante=>{
        const amigoSecreto=sorteo.get(participante);
        expect(amigoSecreto).not.toEqual(participante)
    })
  })
})