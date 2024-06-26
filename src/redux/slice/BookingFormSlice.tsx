import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IBookingForm {
    propertyName:string,
    startDate: string,
    endDate:string,
    adultCount:number,
    teenCount:number,
    kidCount:number,
    roomCount:number,
    stateProgress: string,
    beds: number,
    filterKeys: string[],
    sortKey: string,
    pageNo: number,
    totalPages: number
}
const initialState: IBookingForm = {
    propertyName:"",
    startDate:"",
    endDate:"",
    adultCount:1,
    teenCount:0,
    kidCount:0,
    roomCount:1,
    stateProgress: 'pending',
    beds: 1,
    sortKey: "default",
    filterKeys: [],
    pageNo: 1,
    totalPages: 1
}
const bookingFormSlice = createSlice({
    name: "bookingList",
    initialState,
    reducers: {
        setPropertyName: (state, action: PayloadAction<string>) => {
            state.propertyName= action.payload;
        },
        setStartDate: (state,action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state,action) => {
            state.endDate = action.payload;
        },
        setAdultCount: (state, action: PayloadAction<number>) => {
            state.adultCount = action.payload;
        },
        setTeenCount: (state, action: PayloadAction<number>) => {
            state.teenCount = action.payload;
        },
        setKidCount: (state, action: PayloadAction<number>) => {
            state.kidCount = action.payload;
        },
        setRoomCount:(state, action: PayloadAction<number>)=>{
            state.roomCount = action.payload;
        },
        setBedsCount: (state,action) => {
            state.beds = action.payload;
        },
        addSelectedFilter: (state,action) => {
            state.filterKeys.push(action.payload);
        },
        removeSelectedFilter: (state,action) => {
            state.filterKeys = state.filterKeys.filter((filter) => filter !== action.payload);
        },
        addSelectedSort: (state,action) => {
            state.sortKey = action.payload;
        },
        setPageNumber: (state,action) => {
            state.pageNo = action.payload;
        },
        setTotalPages: (state,action) => {
            state.totalPages = action.payload;
        },
        setAllProp: (state,action) => {
            state.propertyName = action.payload.propertyName;
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.adultCount = action.payload.adultCount;
            state.teenCount = action.payload.teenCount;
            state.kidCount = action.payload.kidCount;
            state.roomCount = action.payload.roomCount;
            state.beds = action.payload.beds;
            state.filterKeys = action.payload.filterKeys;
            state.sortKey = action.payload.sortKey;
            state.pageNo = action.payload.pageNo;
            state.stateProgress = "done";
        }
    }
});
export default bookingFormSlice.reducer;
export const { setPropertyName, setAdultCount, setTeenCount, setKidCount, setRoomCount, setBedsCount,setStartDate,setEndDate, setAllProp,addSelectedFilter,removeSelectedFilter,addSelectedSort,setPageNumber,setTotalPages} = bookingFormSlice.actions;