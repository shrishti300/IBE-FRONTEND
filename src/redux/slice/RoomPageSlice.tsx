import { createSlice } from "@reduxjs/toolkit"

interface IRoomPage{
    filter: string[],
    sort: string[],
    btnClick: boolean
}

const initialState : IRoomPage = {
    filter: [],
    sort: [],
    btnClick: false
}

const roomPageSlice = createSlice({
    name: "roomPageSlice",
    initialState,
    reducers: {
        setFilter: (state,action) => {
            state.filter = action.payload;
        },
        setSort: (state,action) => {
            state.sort = action.payload
        },
        setBtnClick: (state,action) => {
            state.btnClick = action.payload;
        }
    }
})

export default roomPageSlice.reducer;
export const {setFilter, setSort, setBtnClick} = roomPageSlice.actions;