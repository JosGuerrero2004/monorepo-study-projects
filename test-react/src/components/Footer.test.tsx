import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import amigoSecretoReducer from "../redux/amigoSecretoSlice"
import Footer from "./Footer";
import {vi} from "vitest";
// import { useNavigate } from "react-router-dom";


const mockNavigate = vi.fn();
const mockSorteo = vi.fn();

vi.mock("../hooks/useSorteador",()=>(
  {
    useSorteador: ()=>mockSorteo
  }
))





describe("Cuando no existen suficientes participantes", () => {
  test("La actividad no puede ser iniciada", () => {
    
    render ( 
        <Provider store={store}>
            <Footer/>
        </Provider>
    );

    const boton= screen.getByRole("button");

    expect(boton).toBeDisabled();

  })
})


describe("Cuando existen suficientes participantes", () => {

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


  test("La actividad puede ser iniciada",() => {
    render(
        <Provider store={storeMock}>
            <Footer/>
        </Provider>
    );

    const boton = screen.getByRole("button");
    expect(boton).toBeEnabled()
  });

  vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
    }));

    test("El Juego fue iniciado", () => {
      render(
        <Provider store={storeMock}>
            <Footer/>
        </Provider>
      )

      const boton = screen.getByRole("button");
      fireEvent.click(boton)
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/sorteo");
      expect(mockSorteo).toHaveBeenCalledTimes(1);
    
    })

})