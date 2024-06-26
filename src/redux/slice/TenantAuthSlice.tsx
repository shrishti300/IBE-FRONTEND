import { createSlice } from "@reduxjs/toolkit"

export interface ITenantDetail{
    email: string,
    name: string,
    token: string
}

export interface ITenantLoggedIn{
    tenant: ITenantDetail | undefined;
    tenantState: string
}

const initialState : ITenantLoggedIn = {
    tenant: undefined,
    tenantState: "pending"
}

const tenantAuthSlice = createSlice({
    name: 'tenantAuthSlice',
    initialState,
    reducers: {
        addTenantDetail: (state,action) => {
            state.tenant = action.payload;
        },
        changeState: (state,action) => {
            state.tenantState = action.payload;
        }
    }
})

export default tenantAuthSlice.reducer;
export const {addTenantDetail, changeState} = tenantAuthSlice.actions;