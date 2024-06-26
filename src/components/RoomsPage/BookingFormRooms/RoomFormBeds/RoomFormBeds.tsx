import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import './RoomFormBeds.scss';
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../../redux/store/store";
import { setBedsCount } from "../../../../redux/slice/BookingFormSlice";
import { FormattedMessage } from "react-intl";

export default function RoomFormBeds() {
  const {beds} = useSelector((state : RootState) => state.bookingFormList);
  const dispatch = useDispatch<APPDispatch>();

  const handleBedsCountChange = (e: SelectChangeEvent<number>) => {
    dispatch(setBedsCount(e.target.value));
  }
  return (
    <div className="roomsform-bed-main-div">
      <FormControl>
      <InputLabel style={{position: 'absolute', top: '20px'}}><FormattedMessage id="app.bed"  defaultMessage="beds" />
</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="roomform-bed-select"
          value={beds}
          onChange={handleBedsCountChange}
          MenuProps={{    
            PaperProps: {
              style: {
                maxHeight: 150,
              },
            },
          }}
          sx={{ '& .MuiSelect-select': { position: 'absolute', top: '10px' } }} 
        >
            {[...Array(14).keys()].map((index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
