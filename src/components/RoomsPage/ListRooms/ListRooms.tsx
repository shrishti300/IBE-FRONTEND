import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard/RoomCard";
import "./ListRooms.scss";

import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import axios from "axios";
import { IRoomData } from "../../../utils/types/IProperty";
import Loader from "../../Loader/Loader";
import { addSelectedSort, setPageNumber, setTotalPages } from "../../../redux/slice/BookingFormSlice";
import { setBtnClick } from "../../../redux/slice/RoomPageSlice";
import Itinerary from "../../Checkout/Itinerary";
import { fetchPromotionImages } from "../../../redux/thunk/FetchPromotionsImages";
import { setMinPriceHmap } from "../../../redux/slice/ItinerarySlice";

export default function ListRooms() {

  const {  roomCount, adultCount, kidCount, teenCount, beds, stateProgress, startDate, endDate,pageNo,totalPages } = useSelector(
    (state: RootState) => state.bookingFormList
  );
  const [promotionsImages,setPromotionsImages] = useState(null);

  const {sortKey, filterKeys} = useSelector((state: RootState) => state.bookingFormList);
  const {btnClick} = useSelector((state: RootState) => state.roomPageReducer);


  const [roomTypes, setRoomTypes] = useState<IRoomData | null>(null);
  const [loader, setLoader] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [load,setLoad] = useState(true);


  const dispatch = useDispatch<APPDispatch>();

  useEffect(() => {

    const fetchRoomTypes = async () => {
      const startDateObj = new Date(startDate);
      startDateObj.setUTCHours(0, 0, 0, 0);
      startDateObj.setDate(startDateObj.getDate() + 1);

      const endDateObj = new Date(endDate);
      endDateObj.setUTCHours(0, 0, 0, 0);
      endDateObj.setDate(endDateObj.getDate() + 1);

      const filterKeysStr = filterKeys.join(",");
      try {
        setLoader(true);
        const response = await axios.get(import.meta.env.VITE_ROOM_TYPES_API, {
          params: {
            startDate: startDateObj.toISOString(),
            endDate: endDateObj.toISOString(),
            guests: adultCount + kidCount + teenCount,
            rooms: roomCount,
            sortKey: sortKey,
            filterKeys: filterKeysStr,
            pageNo: pageNo,
            beds: beds
          }
        });
        setRoomTypes(response.data);
        dispatch(setMinPriceHmap(response.data.minPriceHmap))
        dispatch(setTotalPages(response.data.size))
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
      setLoader(false);
      setLoad(false);
    }

    if (startDate.length !== 0) fetchRoomTypes();
  }, [stateProgress, filterKeys, sortKey,pageNo,btnClick])


  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setImageLoader(true);
        const response = await dispatch(fetchPromotionImages());
        setPromotionsImages(response.payload); 
      } catch (error) {
        console.error("Error fetching promotions images:", error);
      } finally {
        setImageLoader(false);
      }
    };
    fetchPromotions();
  }, [dispatch]);


  return (
    <div className="listrooms">
      <div className="listrooms_div">
        {
          loader || imageLoader ? <Loader /> : ''
        }
        {
          roomTypes && roomTypes.roomTypePrices.length > 0 ? roomTypes && roomTypes.roomTypePrices.map((roomType, index) => {
            return <RoomCard key={index} roomType={roomType} roomDetail={roomTypes.propertyDetailDTO} promotionsImages={promotionsImages?.[roomType.roomTypeName]}/>
          }) : !load && <h1 style={{fontSize: '25px',width: '100%', display:'flex',justifyContent:'center', margin: '0 auto'}}><p style={{flex: '1'}}>NO ROOMS FOUND!</p></h1>
        }

      </div>
    </div>
  );
}
