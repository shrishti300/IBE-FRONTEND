import { createSlice } from "@reduxjs/toolkit";

interface ITenantForm {
    formState:string;
}
const initialState: ITenantForm= {
    formState:"property-info"
}
const tenantFormSlice = createSlice({
    name: "tenantFormList",
    initialState,
    reducers: {
        changeFormState: (state, action) => {
            state.formState = action.payload;
        }
    },
});
export default tenantFormSlice.reducer;
export const { changeFormState } = tenantFormSlice.actions;