import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
 import { 
  addMaxDays, 
  addMaxGuests, 
  addPercentPayable, 
  addTaxPercent, 
  isWheelChair, 
  kidsAllowed, 
  teensAllowed, 
  addFilters, 
  addSort 
} from "../slice/TenantPropertySlice";
import { addTaxes, setDueNow } from "../slice/ItinerarySlice";

export const fetchTenantProperty = createAsyncThunk(
  "bookingForm/fetchTenantProperty",
  async (propertyName: string, { dispatch }) => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_TENANT_PROPERTY, {
        params: {
          tenantId: 1,
          propertyName: propertyName
        }
      });
      console.log(response.data);
      if (response.data != null) {
        dispatch(addMaxDays(response.data.maxDays));
        dispatch(addMaxGuests(response.data.maxGuests));
        dispatch(addPercentPayable(response.data.percentagePayable));
        dispatch(addTaxPercent(response.data.taxPercent));
        dispatch(isWheelChair(response.data.wheelChair));
        dispatch(kidsAllowed(response.data.kids));
        dispatch(teensAllowed(response.data.teens));
        dispatch(addFilters(response.data.filters));
        dispatch(addSort(response.data.sort));
        dispatch(addTaxes({resortFee: response.data.resortFee,occupancyTax: response.data.taxPercent}))
        dispatch(setDueNow(response.data.percentagePayable));
      }
    } catch (error) {
      console.error("Error fetching tenant property:", error);
      throw error;
    }
  }
);
