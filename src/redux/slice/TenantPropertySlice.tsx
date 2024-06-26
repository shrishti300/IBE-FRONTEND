import { createSlice } from "@reduxjs/toolkit";

interface ITenantProperty {
    maxDays: number;
    maxGuests: number;
    percentagePayable: number;
    taxPercent: number;
    resortFee: number;
    wheelChair: boolean;
    kids: boolean;
    teens: boolean;
    filters: string[];
    sort: string[]
}
const initialState: ITenantProperty = {
    maxDays: 14,
    maxGuests: 20,
    percentagePayable: 25,
    taxPercent: 18,
    resortFee: 0,
    wheelChair: true,
    kids: true,
    teens: true,
    filters: [],
    sort: []
}
const tenantPropertySlice = createSlice({
    name: "tenantFormList",
    initialState,
    reducers: {
        addMaxDays: (state, action) => {
            state.maxDays = action.payload;
        },
        addMaxGuests: (state, action) => {
            state.maxGuests = action.payload;
        },
        addPercentPayable: (state, action) => {
            state.percentagePayable = action.payload;
        },
        addTaxPercent: (state, action) => {
            state.taxPercent = action.payload;
        },
        isWheelChair: (state, action) => {
            state.wheelChair = action.payload;
        },
        kidsAllowed: (state,action) => {
            state.kids = action.payload;
        },
        teensAllowed: (state,action) => {
            state.teens = action.payload;
        },
        addFilters: (state,action) => {
            state.filters = action.payload;
        },
        addSort: (state,action) => {
            state.sort = action.payload;
        },
        addResortFee: (state,action) => {
            state.resortFee = action.payload;
        }
    },
});
export default tenantPropertySlice.reducer;
export const { addMaxDays, addMaxGuests, addPercentPayable,addTaxPercent,isWheelChair,kidsAllowed,teensAllowed,addFilters,addSort,addResortFee } = tenantPropertySlice.actions;