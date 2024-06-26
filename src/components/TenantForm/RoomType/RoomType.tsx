import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import "./RoomType.scss";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { addRoomType } from '../../../redux/slice/TenantRoomSlice';
import { FormattedMessage } from 'react-intl';

export default function RoomType() {
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const {propertyName} = useSelector((state: RootState) => state.bookingFormList);
  const dispatch = useDispatch<APPDispatch>();

  useEffect(() => {
    async function fetchRoomTypes() {
      try {
        const response = await axios.get(import.meta.env.VITE_ROOM_TYPES_NAME_API);
        setRoomTypes(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    }
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (event: SelectChangeEvent<string>) => {
    dispatch(addRoomType(event.target.value));
  };

  return (
    <div className="roomtype-div">
      <p className="property-label">
        <p><FormattedMessage id="app.room" defaultMessage="room" /> {"   "} {" "}<FormattedMessage id="app.type" defaultMessage="type" /></p>
      </p>
      <FormControl>
        <Select
          labelId="select-label"
          className="property-select"
          inputProps={{ "aria-label": "Without label" }}
          displayEmpty
          onChange={handleRoomTypeChange}
          renderValue={(selected) => {
            return selected || "Select Room Type";
          }}
          disabled={propertyName.length === 0}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              style: {
                maxHeight: "13rem", 
                overflowY: "auto",
              },
            },
          }}
        >
          {roomTypes.map((roomType,index) => (
            <MenuItem key={index} value={roomType}>
              {roomType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
