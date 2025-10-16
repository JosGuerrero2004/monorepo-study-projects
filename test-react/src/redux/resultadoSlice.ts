import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultadoState {
    sorteo: Map<string,string>;
}

const initialState: ResultadoState = {
    sorteo: new Map(),
}

const resultadoSlice = createSlice(
    {
        name:"resultadoAmigoSecreto",
        initialState,
        reducers: {
            definirResultado: (state,action: PayloadAction<Map<string,string>>) =>{
                state.sorteo=action.payload;
            },
            limpiarResultado: (state)=> {
                state.sorteo=new Map();
            }
        }

});

export const {definirResultado, limpiarResultado} = resultadoSlice.actions;
export default resultadoSlice.reducer;