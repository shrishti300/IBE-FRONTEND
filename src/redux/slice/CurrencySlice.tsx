import { createSlice } from "@reduxjs/toolkit";
import { convertCurrency } from "../thunk/FetchCurrency";

interface ICurrency {
    current: string,
    USD: number,
    INR: number,
    EUR: number,
    GBP: number,
    state: string
}
const initialState: ICurrency = {
    current: "USD",
    USD: 1,
    INR: 0,
    EUR: 0,
    GBP: 0,
    state: 'pending'
}
const currencySlice = createSlice({
    name: "currencyList",
    initialState,
    reducers: {
        changeCurrency: (state, action) => {
            state.current = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(convertCurrency.pending, (state) => {
            state.state = "pending"
        })
            .addCase(convertCurrency.fulfilled, (state, action) => {
                state.INR = action.payload.INR;
                state.EUR = action.payload.EUR;
                state.GBP = action.payload.GBP;
                state.state = "success"
            })
            .addCase(convertCurrency.rejected, (state) => {
                state.state = "error"
            })
    }
});
export default currencySlice.reducer;
export const { changeCurrency } = currencySlice.actions;