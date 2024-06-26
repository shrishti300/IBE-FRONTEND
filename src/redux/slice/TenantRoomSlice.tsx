import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITenantRoom {
  bannerImages: File[];
  promotions: string[];
  roomType: string;
  amenities:string[];
  description: string;
}

const initialState: ITenantRoom = {
  bannerImages: [],
  promotions: [],
  roomType: '',
  amenities:[],
  description: ''
};

const tenantRoomSlice = createSlice({
  name: "tenantFormList",
  initialState,
  reducers: {
    addBannerImages: (state, action: PayloadAction<File[]>) => {
      state.bannerImages = action.payload;
    },
    addPromotions: (state,action) => {
      state.promotions = action.payload;
    },
    addRoomType: (state,action) => {
      state.roomType = action.payload;
    },
    addAmenities:(state,action) => {
      state.amenities=action.payload;
    },
    addDescription: (state,action) => {
      state.description = action.payload;
    }
  },
});

export default tenantRoomSlice.reducer;
export const { addBannerImages,addPromotions,addRoomType, addAmenities,addDescription} = tenantRoomSlice.actions;