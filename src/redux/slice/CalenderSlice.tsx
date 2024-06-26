import { createSlice } from "@reduxjs/toolkit";
import { IRoomPrice, IRoomRates, fetchRates } from "../thunk/CalenderThunk";

const initialState: IRoomRates = {
    roomRates: {},
    state: "pending",
    daterange: [
        {
            startDate: "Check In",
            endDate: "Check Out",
            key: 'selection'
        }
    ],
    averageRate: 0
}


const RoomRateSlice = createSlice({
    name: "calenderList",
    initialState,
    reducers: {
        addDates: (state,action) => {
            state.daterange = action.payload;
        },
        calcAvgRate: (state,action) => {
            state.averageRate = action.payload;
        },
        changeState: (state,action) => {
            state.state = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchRates.pending, (state) => {
            state.state = "pending"
        })
            .addCase(fetchRates.fulfilled, (state, action) => {
                const roomRates : IRoomPrice[] = action.payload;
                roomRates.map((room) => {
                    state.roomRates[room.date] = room.minRate;
                })
            })
            .addCase(fetchRates.rejected, (state, action) => {
                state.state = "error"
                state.error = action.error.message;
            })
    }
});

export default RoomRateSlice.reducer;
export const {addDates, calcAvgRate, changeState} = RoomRateSlice.actions;