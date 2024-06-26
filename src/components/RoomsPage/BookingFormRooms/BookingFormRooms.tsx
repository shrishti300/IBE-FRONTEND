import "./BookingFormRooms.scss";
import { FormattedMessage } from "react-intl";
import RoomFormCalendar from "./RoomFormCalendar/RoomFormCalendar";
import RoomFormGuests from "./RoomFormGuests/RoomFormGuests";
import RoomFormRoom from "./RoomFormRooms/RoomFormRooms";
import RoomFormBeds from "./RoomFormBeds/RoomFormBeds";
import Down from "../../../assets/down.svg";
import Up from "../../../assets/up.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { createSearchParams, useNavigate } from "react-router-dom";
import { setBtnClick } from "../../../redux/slice/RoomPageSlice";

export default function () {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [iconDirection, setIconDirection] = useState('down');

  const { propertyName, roomCount, adultCount, kidCount, teenCount, beds, stateProgress, startDate, endDate, pageNo } = useSelector(
    (state: RootState) => state.bookingFormList
  );

  const {sortKey, filterKeys} = useSelector((state: RootState) => state.bookingFormList);
  const {kids, teens} = useSelector((state : RootState) => state.tenantPropertyList);


  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
    setIconDirection(prevDirection => prevDirection === 'down' ? 'up' : 'down');
  };

  const dispatch = useDispatch<APPDispatch>();
  const {btnClick} = useSelector((state: RootState) => state.roomPageReducer);
  const navigate = useNavigate();

  const handleClickForm = (e : React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setBtnClick(!btnClick));
  }

  useEffect(() => {

    let params = createSearchParams({
      propertyName: propertyName,
      startDate: startDate,
      endDate: endDate,
      roomCount: roomCount.toString(),
      beds: beds.toString(),
      adultCount: adultCount.toString(),
      filterKeys: filterKeys.join(","),
      sortKey: sortKey,
      pageNo: pageNo.toString()
    });

    if (kids) {
      params.append('kidCount', kidCount.toString());
    }

    if (teens) {
      params.append('teenCount', teenCount.toString());
    }

    navigate(`/roomResults?${params}`);
  },[btnClick,sortKey,filterKeys,pageNo])

  return (
    <div>
      <div className="booking-form-rooms">
        <RoomFormGuests />
        <RoomFormRoom />
        <RoomFormBeds />
        <RoomFormCalendar />
        <div className="booking-btn-div-form">
          <button type="submit" className="booking-search-btn-form" onClick={handleClickForm}>
          <FormattedMessage id="app.search"  defaultMessage="app.search" />  {"   "} {" "} {" "}
                <FormattedMessage id="app.date"  defaultMessage="app.date" />
          </button>
        </div>
      </div>

      <div className="bookingform-dropdown-main">
        <div className="bookingform-dropdown">
          <p className="bookingform-dropdown-txt">Booking Config</p>
          <img src={iconDirection === 'down' ? Down : Up} className='dropdown-img' onClick={toggleDropdown} />
        </div>

        {isDropdownOpen && (
          <div className="boofingform-dropdown-content">
            <div className="bookingform-dropdown-div-top">
              <RoomFormGuests />
              <RoomFormRoom />
              <RoomFormBeds />
            </div>
            <div className="bookingform-dropdown-div-bottom">
              <RoomFormCalendar />
              <div className="booking-btn-div-form">
                <button type="submit" className="booking-search-btn-form" onClick={handleClickForm}>
                <FormattedMessage id="app.search"  defaultMessage="app.search" /> {" "} {" "} {" "}
                <FormattedMessage id="app.date"  defaultMessage="app.date" />

                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
