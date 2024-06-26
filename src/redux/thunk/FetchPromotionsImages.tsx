import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPromotionImages = createAsyncThunk(
  "promotions/fetchPromotionsImages",
  async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_PROMOTIONS_IMAGES_API);
      return response.data.propertyImageListDTOHashMap; // Return the data instead of the entire response
    } catch (error) {
      console.error("Error fetching promotions images:", error);
      throw error; // Let the calling code handle the error
    }
  }
);
