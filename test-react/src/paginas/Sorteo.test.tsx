import { screen, render, fireEvent } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import AmigoSecretoReducer from "../redux/amigoSecretoSlice"
import Sorteo from "./Sorteo";
import resultadoReducer from "../redux/resultadoSlice"

describe("En la página del sorteo",() => {

  let storeMock:any;
  
  beforeEach(() => {
    storeMock= configureStore({
        reducer: {
            amigoSecreto: AmigoSecretoReducer,
            resultado: resultadoReducer
        }
    })

    storeMock.dispatch({
        type: "amigoSecreto/addName",
        payload: "Juan"
    })

    storeMock.dispatch({
        type: "amigoSecreto/addName",
        payload: "Laura"
    })

    storeMock.dispatch({
        type: "amigoSecreto/addName",
        payload: "Jorge"
    })

    storeMock.dispatch({
        type:"resultadoAmigoSecreto/definirResultado",
        payload: new Map([
            ["Juan","Laura"],
            ["Laura","Jorge"],
            ["Jorge","Juan"]
        ])
    })

  })

  test("todos los participantes pueden ver a su amigo secreto",() => {
    render(
        <Provider store={storeMock}>
            <Sorteo/>
        </Provider>
    );

    const opciones = screen.getAllByRole("option");
    expect(opciones).toHaveLength(4);
  })

  test("El amigo secreto es mostrado cuando es solicitado", () => {
    render(
        <Provider store={storeMock}>
            <Sorteo/>
        </Provider>
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select,
        {
            target: {
                value: "Juan"
            }
        }
    )
    const boton=screen.getByRole("button");
    fireEvent.click(boton);
    const amigoSecreto= screen.getByRole("alert");

    expect(amigoSecreto).toBeInTheDocument();
  })

})