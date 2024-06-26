import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../slice/CurrencySlice";
import languageReducer from "../slice/LanguageSlice";
import bookingFormReducer from "../slice/BookingFormSlice";
import calenderReducer from "../slice/CalenderSlice";
import propertyReducer from "../slice/PropertySlice";
import SnackbarReducer from '../slice/SnackbarSlice'
import tenantFormReducer from "../slice/TenantConfigslice";
import tenantPropertyReducer from "../slice/TenantPropertySlice"
import tenantPersonalReducer from "../slice/TenantPersonalSlice"
import tenantRoomReducer from "../slice/TenantRoomSlice";
import roomPageReducer from "../slice/RoomPageSlice";
import tenantAuthReducer from "../slice/TenantAuthSlice";
import itineraryReducer from "../slice/ItinerarySlice";
import countryReducer from "../slice/CountrySlice";
import userReducer from '../slice/UserSlice';
import checkoutReducer from "../slice/CheckoutSlice";

export const store = configureStore({
    reducer: {
        currencyList: currencyReducer,
        languageList: languageReducer,
        bookingFormList: bookingFormReducer,
        calenderList: calenderReducer,
        propertyList: propertyReducer,
        snackbar: SnackbarReducer,
        tenantFormList: tenantFormReducer,
        tenantPropertyList: tenantPropertyReducer,
        tenantPersonalList: tenantPersonalReducer,
        tenantRoomList:tenantRoomReducer,
        roomPageReducer: roomPageReducer,
        tenantAuthReducer: tenantAuthReducer,
        itineraryReducer: itineraryReducer,
        countryList: countryReducer,
        userDetail: userReducer,
        checkoutList:checkoutReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

export type RootState = ReturnType<typeof store.getState>;
export type APPDispatch = typeof store.dispatch;

