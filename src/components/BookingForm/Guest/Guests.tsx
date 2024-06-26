import React, { useState } from 'react'
import './Guest.scss';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { setAdultCount, setKidCount, setTeenCount } from '../../../redux/slice/BookingFormSlice';
import { FormattedMessage } from 'react-intl';
import { showSnackbar } from '../../../redux/slice/SnackbarSlice';

export default function Guests() {
  const dispatch = useDispatch<APPDispatch>();
  const { adultCount, teenCount, kidCount, roomCount } = useSelector((state: RootState) => state.bookingFormList);
  const { maxGuests, kids, teens } = useSelector((state: RootState) => state.tenantPropertyList);
  console.log(maxGuests, kids,teens)
  const { propertyName } = useSelector(
    (state: RootState) => state.bookingFormList
  );


  const handleDecrementAdultCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (adultCount > roomCount) {
      dispatch(setAdultCount(adultCount - 1));
    } else {
      dispatch(showSnackbar({ type: "fail", message: "Adult Count Should be greater than or equals Room Count!" }));
    }
  };

  const handleIncrementAdultCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (roomCount * 2 < adultCount + 1) {
      dispatch(showSnackbar({ type: "fail", message: "Maximum occupancy in a single room should be 2!" }));
    }
    else if (adultCount < maxGuests) {
      dispatch(setAdultCount(adultCount + 1));
    }
    else {
      dispatch(showSnackbar({ type: 'fail', message: `Adult count can't be greater than ${maxGuests}` }))
    }
  };

  const handleDecrementTeenCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (teenCount > 0) {
      dispatch(setTeenCount(teenCount - 1));
    }
  };

  const handleIncrementTeenCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (teenCount + adultCount + kidCount >= roomCount * 3) {
      dispatch(showSnackbar({ type: "fail", message: "One room should have maximum of 3 guests!" }));
      return;
    }
    dispatch(setTeenCount(teenCount + 1));
  };

  const handleDecrementKidCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (kidCount > 0 && adultCount > 0) {
      dispatch(setKidCount(kidCount - 1));
    }
  };

  const handleIncrementKidCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (teenCount + adultCount + kidCount >= roomCount * 3) {
      dispatch(showSnackbar({ type: "fail", message: "One room should have maximum of 3 guests!" }));
      return;
    }
    dispatch(setKidCount(kidCount + 1));
  };

  return (
    <div className='guest-main-div'>
      <p className='guest-label'>
        <FormattedMessage
          id="app.guests"
          defaultMessage="Guests"
        />
      </p>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="guest-select"
          value="hello"
          placeholder='select'
          disabled={propertyName.length === 0}
          onMouseDown={() => {
            if (propertyName.length === 0)
              dispatch(showSnackbar({ type: "fail", message: "Please select the property first" }));
          }} 
          MenuProps={{
            keepMounted: true, // Keeps the dropdown menu mounted in the DOM
            disablePortal: true, // Prevents the dropdown menu from being portaled to the body
            PaperProps: {
              style: {
                maxWidth: '300px', // Set the maximum width of the dropdown menu
                maxHeight: '200px', // Set the maximum height of the dropdown menu
                overflowX: 'scroll', // Enable horizontal scrolling
                overflowY: 'auto', // Enable vertical scrolling
              },
            },
         }}
          renderValue={(value) => {
            let text = "";
            if (value.length !== 0) {
              if (adultCount !== 0) {
                text += `Adult: ${adultCount}`;
              }
              if (teenCount !== 0) {
                if (text !== "") text += ", ";
                text += `Senior Citizen: ${teenCount}`;
              }
              if (kidCount !== 0) {
                if (text !== "") text += ", "
                if (kidCount > 1) {
                  text += `Children: ${kidCount}`;
                } else {
                  text += `Kid: ${kidCount}`;
                }
              }
            }
            return text;
          }}
        >
          

          <MenuItem value={'adult'}>
            <div className="option-div">
              <div className='option-left'>
                <p className='option-type'><FormattedMessage id="app.adult" defaultMessage="Adults" /></p>
                <p className='option-age'><FormattedMessage id="app.age" defaultMessage="Ages" /> 18-60</p>
              </div>
              <div className='option-right'>
                <button className='option-dec' onClick={handleDecrementAdultCount}>-</button>
                <p className='option-count'>{adultCount}</p>
                <button className='option-inc' onClick={handleIncrementAdultCount}>+</button>
              </div>
            </div>
          </MenuItem>
          {
            teens === true ?
              <MenuItem value={'teen'}>
                <div className="option-div">
                  <div className='option-left'>
                    <p className='option-type'><FormattedMessage id="app.senior" defaultMessage="Senior Citizen" /></p>
                    <p className='option-age'><FormattedMessage id="app.age" defaultMessage="Ages" />  60+</p>
                  </div>
                  <div className='option-right'>
                    <button className='option-dec' onClick={handleDecrementTeenCount}>-</button>
                    <p className='option-count'>{teenCount}</p>
                    <button className='option-inc' onClick={handleIncrementTeenCount}>+</button>
                  </div>
                </div>
              </MenuItem>
              :
              ''
          }

          {
            kids === true ?
              <MenuItem value={'kid'}>
                <div className="option-div">
                  <div className='option-left'>
                    <p className='option-type'><FormattedMessage id="app.kid" defaultMessage="Kids" /></p>
                    <p className='option-age'><FormattedMessage id="app.age" defaultMessage="Ages" /> 0-12</p>
                  </div>
                  <div className='option-right'>
                    <button className='option-dec' onClick={handleDecrementKidCount}>-</button>
                    <p className='option-count'>{kidCount}</p>
                    <button className='option-inc' onClick={handleIncrementKidCount}>+</button>
                  </div>
                </div>
              </MenuItem>
              :
              ''
          }
        </Select>
      </FormControl>

    </div >
  )
}
