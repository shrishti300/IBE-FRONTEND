import { Autocomplete, Container, TextField, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { setState } from "../../../redux/slice/CheckoutSlice";
import { setCities } from "../../../redux/slice/CountrySlice";

export default function StateDropDown() {
  const dispatch = useDispatch<APPDispatch>();

  const { countryData, subCountry } = useSelector(
    (state: RootState) => state.countryList
  );

  const handleStateChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    // Dispatch action to save selected state to Redux

    dispatch(setState(value));
    
    let city = countryData.filter((city) => city.subcountry === value);
    city = [...new Set(city.map((item) => item.name))];
    city.sort();

    dispatch(setCities(city));
  };

  const isSmallScreen = useMediaQuery('(max-width:1269px)'); 

  return (
    <Container style={{padding:"0px"}}>
      <Autocomplete
            size="small"
        id="state"
        onChange={handleStateChange} // Call handleStateChange on option selection
        style={{ width: isSmallScreen ? "350px" : "300px" }} 
        getOptionLabel={(getState) => `${getState}`}
        options={subCountry}
        isOptionEqualToValue={(option, value) => option === value}
        noOptionsText={"No Available User"}
        renderOption={(props, subCountry) => (
          <Box component="li" {...props} key={subCountry}>
            {subCountry}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} />}
      />
    </Container>
  );useDispatch
}
