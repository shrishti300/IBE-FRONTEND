import { createSlice } from "@reduxjs/toolkit";

interface ICheckoutInfo {
  travelerFirstName: string;
  travelerLastName: string;
  phoneNo: number;
  travellerEmail: string;
  billingFirstName: string;
  billingLastName: string;
  mailAddress1: string;
  mailAddress2: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: number;
  cardName: string;
  expMM: number;
  expYY: number;
  cvvCode: number;
  specialOffer: boolean;
  agreeToTerms: boolean;
  timeLeft: number;
  image: string;
}

const initialState: ICheckoutInfo = {
  travelerFirstName: "",
  travelerLastName: "",
  phoneNo: 0, 
  travellerEmail: "",
  billingFirstName: "",
  billingLastName: "",
  mailAddress1: "",
  mailAddress2: "",
  country: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: 0,
  cardName: "",
  expMM: 0, 
  expYY: 0,
  cvvCode: 0, 
  specialOffer: false,
  agreeToTerms: false,
  timeLeft: 600,
  image: ''
};

const checkoutInfoSlice = createSlice({
  name: "checkoutInfoList",
  initialState,
  reducers: {
    setTravelerFirstName: (state, action) => {
      state.travelerFirstName = action.payload;
    },
    setTravelerLastName: (state, action) => {
      state.travelerLastName = action.payload;
    },
    setPhoneNo: (state, action) => {
      state.phoneNo = action.payload;
    },
    setTravellerEmail: (state, action) => {
      state.travellerEmail = action.payload;
    },
    setBillingFirstName: (state, action) => {
      state.billingFirstName = action.payload;
    },
    setBillingLastName: (state, action) => {
      state.billingLastName = action.payload;
    },
    setMailAddress1: (state, action) => {
      state.mailAddress1 = action.payload;
    },
    setMailAddress2: (state, action) => {
      state.mailAddress2 = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setZip: (state, action) => {
      state.zip = action.payload;
    },
    setCardNumber: (state, action) => {
      state.cardNumber = action.payload;
    },
    setCardName: (state, action) => {
      state.cardName = action.payload;
    },
    setExpMM: (state, action) => {
      state.expMM = action.payload;
    },
    setExpYY: (state, action) => {
      state.expYY = action.payload;
    },
    setCvvCode: (state, action) => {
      state.cvvCode = action.payload;
    },
    setSpecialOffer: (state, action) => {
      state.specialOffer = action.payload;
    },
    setAgreeToTerms: (state, action) => {
      state.agreeToTerms = action.payload;
    },
    setTimeLeft: (state,action) => {
      state.timeLeft = action.payload;
    },
    setImage: (state,action) => {
      state.image = action.payload;
    }
  },
});
export default checkoutInfoSlice.reducer;
export const {
  setTravelerLastName,
  setTravelerFirstName,
  setBillingFirstName,
  setBillingLastName,
  setTravellerEmail,
  setMailAddress1,
  setMailAddress2,
  setPhoneNo,
  setCountry,
  setCity,
  setState,
  setZip,
  setCardNumber,
  setCardName,
  setExpMM,
  setExpYY,
  setCvvCode,
  setSpecialOffer,
  setAgreeToTerms,
  setTimeLeft,
  setImage
} = checkoutInfoSlice.actions;
