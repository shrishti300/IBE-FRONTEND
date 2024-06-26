import { Autocomplete, Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import {
  setCountryData,
  setSubCountry,
} from "../../../redux/slice/CountrySlice";
import "./CountryDropDown.scss";
import { setCountry } from "../../../redux/slice/CheckoutSlice";
interface CityData {
  country: string;
  subcountry: string;
}

function CountryDropDown() {
  const dispatch = useDispatch<APPDispatch>();

  const { countryData } = useSelector((state: RootState) => state.countryList);

  useEffect(() => {
    axios
      .get<CityData[]>(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        console.log(response.data);
        dispatch(setCountryData(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const country = [...new Set(countryData.map((item) => item.country))];

  const handleCountry = (event: any, value: string) => {
    dispatch(setCountry(value));
    let states = countryData.filter((state) => state.country === value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();

    dispatch(setSubCountry(states));
  };

  return (
    <Container style={{ padding: "0px" }}>
      <Autocomplete
        size="small"
        style={{ width: "350px" }}
        onChange={(event, value) => handleCountry(event, value)}
        id="country"
        getOptionLabel={(country) => `${country}`}
        options={country}
        isOptionEqualToValue={(option, value) => option === value}
        noOptionsText={"No Available Data"}
        renderOption={(props, country) => (
          <div {...props} key={country}>
            {country}
          </div>
        )}
        renderInput={(params) => <TextField {...params} />}
      />
    </Container>
  );
}

export default CountryDropDown;
