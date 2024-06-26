import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import "./AmenitiesConfig.scss";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { SelectChangeEvent } from "@mui/material";
import { addAmenities } from "../../../redux/slice/TenantRoomSlice";
import axios from "axios";
import { amenitiesList } from "../../../utils/data/Amenities";
import { FormattedMessage } from "react-intl";

const filter = createFilterOptions<string>();

export default function AmenitiesConfig() {
  const [value, setValue] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState<string>("");

  const dispatch = useDispatch<APPDispatch>();
  const handleClose = () => {
    setOpen(false);
    setDialogValue("");
  };

  const handleSubmit = () => {
    handleClose();
  };
  const handleOnChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    const addedValues = newValue.filter((val) => !value.includes(val));

    const nonExistingValues = addedValues.filter(
      (val) => !amenitiesList.includes(val)
    );

    if (nonExistingValues.length > 0) {
      setOpen(true);
      setDialogValue(nonExistingValues[0]);
    }
    dispatch(addAmenities(newValue));
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <p className="amenities_config_txt">
          {" "}
          <FormattedMessage id="app.amenities" defaultMessage="Amenities" />
        </p>
      </div>
      <div className="amenities_config_div">
        <Autocomplete
          multiple
          value={value}
          onChange={handleOnChange}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== "") {
              filtered.push(params.inputValue);
            }
            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={amenitiesList}
          renderInput={(params) => <TextField {...params} />}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <FormattedMessage id="app.addNewAmenit" defaultMessage="Add New Amenit" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
         
            <FormattedMessage id="app.missedAmenity" defaultMessage="Add New Amenit" />

            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue}
              onChange={(event) => setDialogValue(event.target.value)}
              label="Amenity Name"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
