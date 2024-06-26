import { createSlice } from "@reduxjs/toolkit";
import { IMinPriceHmap } from "../../utils/types/IProperty";

interface IItinerarySlice {
    promotion: any[];
    promotionName: string;
    resortFee: number;
    occupancyTax: number;
    VAT: number;
    isCheckout: number;
    roomType: string;
    startDate: string;
    endDate: string;
    minPriceHmap: IMinPriceHmap;
    dueNow: number;
    guestInfo: string;
    nightlyRate: number;
    subtotal: number;
    taxes: number;
    vat: number;
    total: number;
    valid: boolean;
}

const initialState : IItinerarySlice= {
    promotion: [],
    promotionName: '',
    resortFee: 0,
    occupancyTax: 0,
    VAT: 18,
    isCheckout: 0,
    roomType: '',
    startDate: '', 
    endDate: '', 
    minPriceHmap: {},
    dueNow: 0,
    guestInfo: '',
    nightlyRate: 0,
    subtotal: 0,
    taxes: 0,
    vat: 0,
    total: 0,
    valid: false
}


const itinerarySlice = createSlice({
    name: 'IItinerarySlice',
    initialState,
    reducers: {
        addPromotion: (state,action) => {
            state.promotion = action.payload;
        },
        addTaxes: (state,action) => {
            state.resortFee = action.payload.resortFee;
            state.occupancyTax = action.payload.occupancyTax;
        },
        changeCheckoutStatus: (state,action) => {
            state.isCheckout = action.payload;
        },
        addRoomType: (state,action) => {
            state.roomType = action.payload;
        },
        setMinPriceHmap: (state,action) => {
            state.minPriceHmap = action.payload;
        },
        setDueNow: (state,action) => {
            state.dueNow = action.payload;
        },
        setConfirmationFields: (state,action) => {
            state.guestInfo = action.payload.guestInfo;
            state.nightlyRate = action.payload.nightlyRate;
            state.subtotal = action.payload.subtotal;
            state.taxes = action.payload.taxes;
            state.vat = action.payload.vat;
            state.total = action.payload.total;
        },
        setValid: (state,action) => {
            state.valid = action.payload;
        }
    }
})

export default itinerarySlice.reducer;
export const {addPromotion, addTaxes, changeCheckoutStatus,addRoomType,setMinPriceHmap,setDueNow,setConfirmationFields,setValid} = itinerarySlice.actions;
