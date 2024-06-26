import React from "react";
import "./Rooms.scss";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { setAdultCount, setRoomCount } from "../../../redux/slice/BookingFormSlice";
import { FormattedMessage } from "react-intl";
import { showSnackbar } from "../../../redux/slice/SnackbarSlice";




export default function Rooms() {
  const dispatch = useDispatch();
  const roomCount = useSelector((state: RootState) => state.bookingFormList.roomCount);
  const adultCount = useSelector((state: RootState) => state.bookingFormList.adultCount);
  const {kidCount, teenCount} = useSelector((state: RootState) => state.bookingFormList);

  const {maxDays} = useSelector((state: RootState) => state.tenantPropertyList);
  const { propertyName } = useSelector(
    (state: RootState) => state.bookingFormList
  );


  const handleRoomCountChange = (event: SelectChangeEvent<number>) => {
    const newRoomCount = event.target.value as number;
    if(newRoomCount * 4 <= adultCount + kidCount + teenCount){
      dispatch(showSnackbar({type: "fail", message: "A single room should have maximum of 4 guests!"}));
      return;
    }
    if (newRoomCount > adultCount) {
      dispatch(setAdultCount(newRoomCount));
    }
    dispatch(setRoomCount(newRoomCount));
  };



  return (
    <div className="rooms-main-div">
      <p className="rooms-txt">
      <FormattedMessage
            id="app.rooms"
            defaultMessage="Rooms"
          />
        
      </p>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="rooms-select"
          value={roomCount}
          onChange={handleRoomCountChange}
          disabled={propertyName.length === 0}
          onMouseDown={() => {
            if (propertyName.length === 0)
              dispatch(showSnackbar({ type: "fail", message: "Please select the property first" }));
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 150,
              },
            },
          }}
        >
            {[...Array(maxDays).keys()].map((index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
