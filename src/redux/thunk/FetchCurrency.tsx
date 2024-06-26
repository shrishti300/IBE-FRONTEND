import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const convertCurrency = createAsyncThunk(
  'currency/convert',
  async () => {
    const host = import.meta.env.VITE_FRANKFURTUR_API;
    try {
      const response = await axios.get(`https://${host}/latest?from=USD&to=INR,EUR,GBP`);
      return response.data.rates;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
);
