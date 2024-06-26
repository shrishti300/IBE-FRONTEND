import React, { useEffect, useState } from "react";
import PropertyName from "./PropertyName/PropertyName";
import SelectDate from "./SelectDate/SelectDate";
import Guests from "./Guest/Guests";
import Rooms from "./Rooms/Rooms";
import "./BookingForm.scss";
import AccessibleRoom from "./AccessibleRooms/AccessibleRoom";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../redux/store/store";
import { FormattedMessage } from "react-intl";
import { showSnackbar } from "../../redux/slice/SnackbarSlice";
import Snackbar from "../Snackbar/Snackbar";
import axios from "axios";
import { addFilters, addMaxDays, addMaxGuests, addPercentPayable, addSort, addTaxPercent, isWheelChair, kidsAllowed, teensAllowed } from "../../redux/slice/TenantPropertySlice";
import { addBannerLink, addHeaderLink, addTitle } from "../../redux/slice/TenantPersonalSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchTenantProperty } from "../../redux/thunk/FetchTenantProperty";
import { fetchTenantPersonal } from "../../redux/thunk/FetchTenantPersonal";

export default function BookingForm() {
  const { propertyName, roomCount, adultCount, kidCount, teenCount, stateProgress } = useSelector(
    (state: RootState) => state.bookingFormList
  );
  const { kids, teens} = useSelector((state : RootState) => state.tenantPropertyList);
  const { daterange } = useSelector((state: RootState) => state.calenderList);
  const { open } = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch<APPDispatch>();
  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);

  const isPropertySelected = propertyName.length > 0;

  const handleSubmit = () => {
    if (!isPropertySelected) {
      dispatch(showSnackbar({ type: "fail", message: "Please select the property!" }));
      return;
    }
    if (daterange[0].startDate === "Check In" || daterange[0].endDate === "Check out") {
      dispatch(showSnackbar({ type: "fail", message: "Please select start date and end date!" }));
      return;
    }

    if (roomCount === 0) {
      dispatch(showSnackbar({ type: "fail", message: "Please select the rooms!" }));
      return;
    }

    let params = createSearchParams({
      propertyName: propertyName,
      startDate: daterange[0].startDate,
      endDate: daterange[0].endDate,
      roomCount: roomCount.toString(),
      beds: "1",
      adultCount: adultCount.toString(),
      sortKey: "default",
      filtersKeys: "",
      pageNo: "1"
    });

    if (kids) {
      params.append('kidCount', kidCount.toString());
    }

    if (teens) {
      params.append('teenCount', teenCount.toString());
    }

    navigate(`/roomResults?${params}`);
  };



  const handleFormValidation = () => {
    if (isPropertySelected && daterange[0].startDate !== "Check In" && daterange[0].endDate !== "Check Out" && roomCount !== 0 && roomCount * 2 >= adultCount) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };




  React.useEffect(() => {
    handleFormValidation();
  }, [propertyName, daterange, roomCount]);




  useEffect(() => {
    if (propertyName.length > 0) {
      dispatch(fetchTenantProperty(propertyName)); 
    }
  }, [dispatch, propertyName]);




  useEffect(() => {
    dispatch(fetchTenantPersonal()); // Dispatch the fetchTenantPersonal thunk
  }, [dispatch]);



  return (
    <>
      {open ? <Snackbar /> : ''}
      <div className="booking-div">
        <PropertyName />
        <SelectDate />
        <div className="guest-room-div">
          <Guests />
          <Rooms />
        </div>
        <AccessibleRoom />
        <div className="booking-btn-div">
          <button
            type="submit"
            className="booking-submit-btn"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            <FormattedMessage
              id="app.search"
              defaultMessage="SEARCH"
            />
          </button>
        </div>
      </div>
    </>
  );
}
