import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import "./SortConfig.scss";
import { useDispatch } from "react-redux";
import { APPDispatch } from "../../../redux/store/store";
import { addSort } from "../../../redux/slice/TenantPropertySlice";
import { FormattedMessage } from "react-intl";

export default function SortConfig() {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(["price"]); 

  const dispatch = useDispatch<APPDispatch>();

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    console.log(selectedOptions)
    setSelectedOptions(event.target.value as string[]);
    dispatch(addSort(event.target.value as string[]));
  };

  return (
    <div className="sortconfig">
      <Typography variant="body1" className="sortconfig-label">
      <FormattedMessage id="app.sort" defaultMessage="Sort" /> 
      </Typography>
      <FormControl>
        <Select
          labelId="select-label"
          value={selectedOptions}
          onChange={handleChange}
          className="sortconfig-select"
          inputProps={{ "aria-label": "Without label" }}
          displayEmpty
          multiple
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
          <MenuItem key="price" value="price" disabled selected > 
          <FormattedMessage id="app.price" defaultMessage="Price" /> 
          </MenuItem>
          <MenuItem key="max-cap" value="max-cap">
          <FormattedMessage id="app.max" defaultMessage="Max" /> {" "}<FormattedMessage id="app.cap" defaultMessage="cap" />
          </MenuItem>
          <MenuItem key="area" value="area">
          <FormattedMessage id="app.area" defaultMessage="Area" /> 
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
