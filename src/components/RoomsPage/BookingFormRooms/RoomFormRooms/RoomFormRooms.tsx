import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react'
import { showSnackbar } from '../../../../redux/slice/SnackbarSlice';
import { setAdultCount, setRoomCount } from '../../../../redux/slice/BookingFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import './RoomFormRooms.scss';
import { FormattedMessage } from 'react-intl';

export default function RoomFormRoom() {
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
    if(newRoomCount * 3 <= adultCount + kidCount + teenCount){
      dispatch(showSnackbar({type: "fail", message: "A single room should have maximum of 3 guests!"}));
      return;
    }
    if(newRoomCount * 2 < adultCount){
      dispatch(showSnackbar({type: "fail", message: "Maximum occupancy in a single room should be 2!"}));
      return;
    }
    if (newRoomCount > adultCount) {
      dispatch(setAdultCount(newRoomCount));
    }
    dispatch(setRoomCount(newRoomCount));
  };



  return (
    <div className="roomsform-rooms-main-div">
   
      <FormControl>
      <InputLabel style={{position: 'absolute', top: '20px'}}><FormattedMessage id="app.room"  defaultMessage="rooms" /></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="roomform-rooms-select"
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
          sx={{ '& .MuiSelect-select': { position: 'absolute', top: '10px' } }} 
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
