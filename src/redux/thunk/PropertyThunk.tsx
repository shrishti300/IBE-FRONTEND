import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProperty = createAsyncThunk(
  'property/get',
  async () => {
    const host = import.meta.env.VITE_PROPERTIES_API;
    try {
      const response = await axios.get(host);
      console.log(response.data);
      return response.data
      
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
);
