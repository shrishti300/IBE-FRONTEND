import { createSlice } from "@reduxjs/toolkit";
import { IProperty } from "../../utils/types/IProperty";
import { getProperty } from "../thunk/PropertyThunk";

interface IPropertyArray {
  propertyList: IProperty[];
  state: string;
}
const initialState: IPropertyArray = {
  propertyList: [],
  state: "",
};
const propertySlice = createSlice({
  name: "propertyList",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getProperty.pending, (state) => {
        state.state = "pending";
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.state = "fulfilled";
        state.propertyList = action.payload;
      })
      .addCase(getProperty.rejected, (state) => {
        state.state = "error";
      });
  },
});
export default propertySlice.reducer;
export const {} = propertySlice.actions;
