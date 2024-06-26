import React, { useEffect } from "react";
import "./PropertyName.scss";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { getProperty } from "../../../redux/thunk/PropertyThunk";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { setPropertyName } from "../../../redux/slice/BookingFormSlice";

export default function PropertyName() {

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setPropertyName(event.target.value));
  };

  const dispatch: APPDispatch = useDispatch();

  const propertyName = useSelector(
    (state: RootState) => state.bookingFormList.propertyName
  );

  const { propertyList } = useSelector(
    (state: RootState) => state.propertyList
  );

  useEffect(() => {
    dispatch(getProperty());
  }, []);

  return (
    <div className="propertyname-div">
      <p className="property-label">
        <FormattedMessage id="app.property" defaultMessage="Property name *" />
      </p>
      <FormControl>
        <Select
          labelId="select-label"
          value={propertyName}
          onChange={handleChange}
          className="property-select"
          inputProps={{ "aria-label": "Without label" }}
          displayEmpty
          renderValue={(selected) => {
            return selected || "Select property";
          }}
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
                maxHeight: "13rem", // Set the height to 6rem
                overflowY: "auto",
              },
            },
          }}
        >
            {propertyList.map((property) => (
              <MenuItem key={property.propertyId} value={property.propertyName}  disabled={property.propertyName !== "Team 4 Hotel"}>
                {property.propertyName}
              </MenuItem>
            ))}
        
        </Select>
      </FormControl>
    </div>
  );
}
