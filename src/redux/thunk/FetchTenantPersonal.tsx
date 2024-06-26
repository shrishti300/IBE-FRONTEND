import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBannerLink, addHeaderLink, addTitle } from "../slice/TenantPersonalSlice";

export const fetchTenantPersonal = createAsyncThunk(
  "bookingForm/fetchTenantPersonal",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_TENANT_PERSONAL, {
        params: {
          tenantId: 1,
        }
      });
      console.log(response.data)
      if (response != null) {
        dispatch(addHeaderLink(response.data.headerlogo));
        dispatch(addBannerLink(response.data.bannerlogo));
        dispatch(addTitle(response.data.title));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
