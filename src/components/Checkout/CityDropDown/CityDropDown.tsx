import { Autocomplete, Container, TextField ,useMediaQuery} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { setCities } from '../../../redux/slice/CountrySlice';
import { setCity } from '../../../redux/slice/CheckoutSlice';


export default function CityDropDown() {

    const dispatch = useDispatch<APPDispatch>();

    const {  cities} = useSelector((state: RootState) => state.countryList);


    const handleCity = (event: any, value: string) => {
      
        dispatch(setCity(value));
    };


    const isSmallScreen = useMediaQuery('(max-width:1269px)'); 


    return (
        <Container style={{ padding: "0px" }}>
            <Autocomplete
                size="small"
                style={{ width: isSmallScreen ? "350px" : "300px" }} 
                onChange={(event, value) => handleCity(event, value)}
                id="city"
                getOptionLabel={(getCity) => `${getCity}`}
                options={cities}
                isOptionEqualToValue={(option, value) => option === value}
                noOptionsText={"No Available Data"}
                renderOption={(props, cities) => (
                    <div {...props} key={cities}>
                        {cities}
                    </div>
                )}
                renderInput={(params) => <TextField {...params} />}
            />
        </Container>
    )
}
