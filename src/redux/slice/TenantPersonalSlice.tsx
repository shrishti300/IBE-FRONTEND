import { createSlice } from "@reduxjs/toolkit";

interface ITenantProperty {
    title: string;
    bannerlogo?: File;
    headerlogo?: File;
    headerLink: '',
    bannerLink: '',
    promoTitle: string,
    promoDescription: string,
    promoMinDays: number,
    promoPriceFactor: number,
    selectPromotion: string,
    promotionsStr: string[],
    showInModal: boolean
}
const initialState: ITenantProperty = {
    title: '',
    bannerlogo: undefined,
    headerlogo: undefined,
    headerLink: '',
    bannerLink: '',
    promoTitle: '',
    promoDescription: '',
    promoMinDays: 0,
    promoPriceFactor: 0,
    selectPromotion: '',
    promotionsStr: [],
    showInModal: true
}
const tenantPersonalSlice = createSlice({
    name: "tenantFormList",
    initialState,
    reducers: {
        addTitle: (state, action) => {
            state.title = action.payload;
        },
        addBannerlogo: (state, action) => {
            state.bannerlogo = action.payload;
        },
        addHeaderlogo: (state, action) => {
            state.headerlogo = action.payload;
        },
        addBannerLink: (state,action) => {
            state.bannerLink = action.payload;
        },
        addHeaderLink: (state,action) => {
            state.headerLink = action.payload;
        },
        addPromoTitle: (state,action) => {
            state.promoTitle = action.payload;
        },
        addPromoDescription: (state,action) => {
            state.promoDescription = action.payload;
        },
        addPromoMinDays: (state,action) => {
            state.promoMinDays = action.payload;
        },
        addPromoPriceFactor: (state,action) => {
            state.promoPriceFactor = action.payload;
        },
        setPromotionsStr: (state,action) => {
            state.promotionsStr = action.payload;
        },
        setShowInModal: (state,action) => {
            state.showInModal = action.payload;
        }
    },
});
export default tenantPersonalSlice.reducer;
export const { addTitle, addBannerlogo, addHeaderlogo, addHeaderLink, addBannerLink,addPromoDescription,addPromoMinDays,addPromoPriceFactor,addPromoTitle, setPromotionsStr,setShowInModal } = tenantPersonalSlice.actions;