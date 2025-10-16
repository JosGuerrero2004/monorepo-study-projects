import Formulario from "../components/Formulario";
import Footer from "../components/Footer";
import ListaParticipantes from "../components/ListaParticipantes";
import Card from "../components/Card";


const Configuracion = () => {
    return (
        <Card>  
            <section>
                <h2>Vamos a Comenzar!</h2>
                <Formulario/>
                <ListaParticipantes/>
                <Footer/>
            </section>
        </Card>
    )
  
}

export default Configuracion