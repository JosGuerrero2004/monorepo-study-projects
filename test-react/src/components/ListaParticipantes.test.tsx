import { render, screen } from "@testing-library/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ListaParticipantes from "./ListaParticipantes";
import { configureStore } from "@reduxjs/toolkit";
import amigoSecretoReducer from "../redux/amigoSecretoSlice"

describe("Una lista vacia de participantes", ()=>{
    test("debe ser renderizada sin elementos", ()=>{

        render(
            <Provider store={store}>
                <ListaParticipantes/>
            </Provider>
        );

        const items= screen.queryAllByRole("listitem");

        expect(items).toHaveLength(0);


    })
})

describe("Una lista que contenga participantes",() => {

    let storeMock:any;

    beforeEach(() => {
      storeMock= configureStore({
        reducer: {
            amigoSecreto: amigoSecretoReducer,
        }
      });

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


    });

  test("Debe ser renderizada correctamente",() => {
    render (
        <Provider store={storeMock}>
            <ListaParticipantes/>
        </Provider>
    );

    const items= screen.queryAllByRole("listitem");

    expect(items).toHaveLength(3);

  })
})