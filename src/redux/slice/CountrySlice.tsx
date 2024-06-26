import { createSlice } from "@reduxjs/toolkit";
import { convertCurrency } from "../thunk/FetchCurrency";

interface ICountryInfo {
    countryData: any[]; // Change 'Array' to 'any[]' or specify a specific type
    subCountry: any[];
    cities:any[]
  }
  
  const initialState: ICountryInfo = {
    countryData: [],
    subCountry: [],
    cities:[]
  };

  
const countryInfoSlice = createSlice({
    name: "countryInfoList",
    initialState,
    reducers: {
        setCountryData: (state, action) => {
            state.countryData = action.payload;
        },
        
        setSubCountry:(state, action) =>{
            state.subCountry = action.payload;
        },
        setCities:(state, action)=>{
            state.cities =action.payload;
        }
    },
});
export default countryInfoSlice.reducer;
export const { setCountryData,setSubCountry, setCities} = countryInfoSlice.actions;