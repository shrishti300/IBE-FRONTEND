import { useNavigate, useSearchParams } from "react-router-dom";
import BookingFormRooms from "../components/RoomsPage/BookingFormRooms/BookingFormRooms";
import Filters from "../components/RoomsPage/Filters/Filters";
import ListRooms from "../components/RoomsPage/ListRooms/ListRooms";
import ProgressBar from "../components/RoomsPage/ProgressBar/ProgressBar";
import PropertyBanner from "../components/RoomsPage/PropertyBanner/PropertyBanner";
import "./RoomsPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../redux/store/store";
import { setAllProp } from "../redux/slice/BookingFormSlice";
import { useEffect, useState } from "react";
import Snackbar from "../components/Snackbar/Snackbar";
import axios from "axios";
import { setFilter, setSort } from "../redux/slice/RoomPageSlice";
import { showSnackbar } from "../redux/slice/SnackbarSlice";
import { validateSearchParams } from "../utils/Validations/Validations";
import {
  addBannerLink,
  addHeaderLink,
  addTitle,
} from "../redux/slice/TenantPersonalSlice";
import React from "react";
import Itinerary from "../components/Checkout/Itinerary";
import RoomPageMenubar from "../components/RoomsPage/ListRooms/RoomCard/RoomPageMenuBar/RoomPageMenubar";
import { changeCheckoutStatus } from "../redux/slice/ItinerarySlice";

export default function RoomsPage() {

  const dispatch = useDispatch<APPDispatch>();
  const navigate = useNavigate();
  const { propertyName,stateProgress } = useSelector(
    (state: RootState) => state.bookingFormList
  );
  const { open } = useSelector((state: RootState) => state.snackbar);
  const [previousSearch, setPreviousSearch] = useState("");
  const { isCheckout } = useSelector((state: RootState) => state.itineraryReducer);
  const [searchParams] = useSearchParams();

  const isValidDateFormat = (dateString: string): boolean => {
    const dateFormatRegex =
      /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(0[1-9]|[12]\d|3[01])\s\d{4}$/;
    return dateFormatRegex.test(dateString);
  };

  useEffect(() => {
    const propertyNameParam = searchParams.get("propertyName");
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const roomCountParam = searchParams.get("roomCount");
    const bedsParam = searchParams.get("beds");
    const adultCountParam = searchParams.get("adultCount");
    const kidCountParam = searchParams.get("kidCount");
    const teenCountParam = searchParams.get("teenCount");
    const sortKeyParam = searchParams.get("sortKey");
    const filterParam = searchParams.get("filterKeys");
    const filterParamNew = filterParam && filterParam.length > 0 ? filterParam?.split(",") : [];
    const pageNoParam = searchParams.get("pageNo");


    if (!propertyNameParam || !startDateParam || !endDateParam || !roomCountParam || !bedsParam || !adultCountParam || !kidCountParam || !teenCountParam || !sortKeyParam || !pageNoParam) {
      const storedPreviousSearch = window.localStorage.getItem("prevSearch");
      if (storedPreviousSearch === null) {
        window.location.href = "/error";
      } else {
        navigate(`/roomResults${storedPreviousSearch}`);
      }
    }
    else{
      const isValid = validateSearchParams(
        propertyNameParam,
        startDateParam,
        endDateParam,
        roomCountParam,
        bedsParam,
        adultCountParam,
        kidCountParam,
        teenCountParam,
        sortKeyParam,
        pageNoParam
      );
      if (!isValid) {
        window.location.href = `/error`;
      } else {
        window.localStorage.setItem("prevSearch", window.location.search);
        dispatch(
          setAllProp({
            propertyName: propertyNameParam,
            startDate: startDateParam,
            endDate: endDateParam,
            roomCount: Number(roomCountParam),
            beds: Number(bedsParam),
            adultCount: Number(adultCountParam),
            kidCount: Number(kidCountParam),
            teenCount: Number(teenCountParam),
            sortKey: sortKeyParam,
            filterKeys: filterParamNew,
            pageNo: pageNoParam,
          })
        );
      }
    }
  }, [stateProgress]);

  useEffect(() => {
    const fetchFiltersSort = async () => {
      const response = await axios.get(import.meta.env.VITE_FILTERS_SORT_API, {
        params: {
          tenantID: 1,
          propertyName: propertyName,
        },
      });
      dispatch(setFilter(response.data.filters));
      dispatch(setSort(response.data.sort));
    };
    if (propertyName.length > 0) fetchFiltersSort();
  }, [propertyName]);

  useEffect(() => {
    if(isCheckout === 2)  dispatch((changeCheckoutStatus(1)));
    const fetchTenantPersonal = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_GET_TENANT_PERSONAL,
          {
            params: {
              tenantId: 1,
            },
          }
        );
        console.log(response.data);
        if (response != null) {
          dispatch(addHeaderLink(response.data.headerlogo));
          dispatch(addBannerLink(response.data.bannerlogo));
          dispatch(addTitle(response.data.title));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTenantPersonal();
  }, []);
  return (
    <>
      {open ? <Snackbar /> : ""}
      <div className="roomspage">
        <PropertyBanner />
        <ProgressBar />
        <div className="roompage_content_div">
          <BookingFormRooms />
          <div className="roompage_room_filter_div">
            <Filters />
            <div className="container-div">
              <RoomPageMenubar />
              <div className="roompage_itinerary_div">
                <ListRooms />
                {
                  isCheckout !== 0 && <div className="roompage_itinerary_sub_div">
                    <Itinerary />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
