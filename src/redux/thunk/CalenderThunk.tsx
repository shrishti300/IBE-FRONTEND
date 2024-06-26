import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_ROOM_RATES_API;

export interface IRoomPrice{
    date:string;
    minRate:number;
}

interface DateRangeItem {
    startDate: string;
    endDate: string;
    key: string;
}


export interface IRoomRates{
    roomRates:{
        [date: string] : number
    };
    state:"pending"|"fulfilled"|"error",
    daterange: DateRangeItem[]
    error?:string;
    averageRate: number;
}

export const fetchRates = createAsyncThunk("calender/fetchRoomRates" ,async () => {
    const response = await axios.get(API);
    console.log(response);
    return response?.data;
})