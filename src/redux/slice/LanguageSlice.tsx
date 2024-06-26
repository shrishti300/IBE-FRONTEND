import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILanguage{
    languageName:string,
   state:string
}
const initialState:ILanguage ={
    languageName:"en-US",
    state:'pending',
}
const languageSlice = createSlice({
    name:"languageList",
    initialState,
    reducers:{
        setLanguage:(state, action:PayloadAction<string>)=>{
            state.languageName = action.payload;
        }
    }
});
export default languageSlice.reducer;
export const {setLanguage} = languageSlice.actions;