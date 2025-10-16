import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { Provider } from "react-redux";
import { store } from "../redux/store";
test ("Cuando el input está vacío, nuevos participantes no podrán ser agregados", () => {
    
    render(
        <Provider store={store}>
            <Formulario/>
        </Provider>
    );

    // Encontrar en el DOM el input

    const input = screen.getByPlaceholderText("Ingrese los nombres de los participantes");

    // Encontrar en el DOM el botón

    const boton = screen.getByRole("button");

    // Garantizar que el input esté en el documento
    expect(input).toBeInTheDocument();
    // Garantizar que el botón esté deshabilitado
    expect(boton).toBeDisabled();

})

test ("Agregar un participante si existe un texto ingresado", () => {
  render (
    <Provider store={store}>
            <Formulario/>
        </Provider>
  )


  // Encontramos en el DOM el input

  const input = screen.getByPlaceholderText("Ingrese los nombres de los participantes");

  // Encontrar el botón en el DOM

  const boton = screen.getByRole("button");

  // Insertar un participante

  fireEvent.change(input,{
    target: {
        value: "Fernanda"
    }
  })

  // Presionamos el botón

  fireEvent.click(boton);

  // Garantizar que el input tenga el foco activo

  expect(input).toHaveFocus();

  // Garantizar que el input quede vacio

  expect(input).toHaveValue("");

})

test("Nombres duplicados no pueden ser agregados a la lista", () => {
  render(
    <Provider store={store}>
        <Formulario/>
    </Provider>
  )

    // Encontramos en el DOM el input

    const input = screen.getByPlaceholderText("Ingrese los nombres de los participantes");

    // Encontrar el botón en el DOM
  
    const boton = screen.getByRole("button");
  
    // Insertar un participante
  
    fireEvent.change(input,{
      target: {
          value: "Fernanda"
      }
    })

      // Presionamos el botón

     fireEvent.click(boton);

     // Insertar un participante
  
     fireEvent.change(input,{
        target: {
            value: "Fernanda"
        }
      })
  
        // Presionamos el botón
  
       fireEvent.click(boton);

       const mensajeDeError = screen.getByRole("alert");

       expect(mensajeDeError.textContent).toBe("No se pueden agregar nombres duplicados")
  
})
