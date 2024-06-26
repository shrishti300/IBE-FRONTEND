import { createSlice } from "@reduxjs/toolkit";

interface IUserSlice{
    email: string;
    loggedIn: boolean;
}

const initialState : IUserSlice = {
    email: '',
    loggedIn: false
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUserEmail: (state,action) => {
            state.email = action.payload;
        },
        changeLoggedIn: (state,action) => {
            state.loggedIn = action.payload;
        }
    }
})

export const {addUserEmail,changeLoggedIn} = userSlice.actions;
export default userSlice.reducer;