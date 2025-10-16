import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AmigoSecreto {
    names: string[]
}

const initialState: AmigoSecreto = {
    names: []
};

const amigoSecretoSlice = createSlice({
    name: "amigoSecreto",
    initialState,
    reducers: {
        addName: (state, action: PayloadAction<string>) =>{
            if (action.payload && !state.names.includes(action.payload)) {
                state.names.push(action.payload)
            } 
        },
        resetNames: (state) =>{
            state.names = []
        }
    }
});

export const {addName,resetNames} = amigoSecretoSlice.actions;
export default amigoSecretoSlice.reducer;