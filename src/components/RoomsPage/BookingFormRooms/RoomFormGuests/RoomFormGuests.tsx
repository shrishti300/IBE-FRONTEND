import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../../redux/store/store';
import { setAdultCount, setKidCount, setTeenCount } from '../../../../redux/slice/BookingFormSlice';
import { showSnackbar } from '../../../../redux/slice/SnackbarSlice';
import './RoomFormGuests.scss';
export default function RoomFormGuests() {
    const dispatch = useDispatch<APPDispatch>();
    const { adultCount, teenCount, kidCount, roomCount } = useSelector((state: RootState) => state.bookingFormList);
    const { maxGuests, kids, teens } = useSelector((state: RootState) => state.tenantPropertyList);
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
    <div className='roomguest-main-div'>
      
      <FormControl fullWidth>
      <InputLabel style={{position: 'absolute', top: '20px'}}><FormattedMessage id="app.guest"  defaultMessage="app.search" />
</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="roomguest-select"
          value="hello"
          placeholder='select'
          disabled={propertyName.length === 0}
          onMouseDown={() => {
            if (propertyName.length === 0)
              dispatch(showSnackbar({ type: "fail", message: "Please select the property first" }));
          }}

          renderValue={(value) => {
            let text = "";
            if (value.length !== 0) {
              if (adultCount !== 0) {
                text += `${adultCount} adult`;
              }
              if (teenCount !== 0) {
                if (text !== "") text += ", ";
                text += ` ${teenCount} Senior`;
              }
              if (kidCount !== 0) {
                if (text !== "") text += ", "
                if (kidCount > 1) {
                  text += `${kidCount} children`;
                } else {
                  text += `${kidCount} Kid`;
                }
              }
            }
            return <div style={{position: 'absolute', top: '25px'}}>{text}</div>;
          }}
        >

          <MenuItem value={'adult'}>
            <div className="option-div">
              <div className='option-left'>
                <p className='option-type'><FormattedMessage id="app.adult" defaultMessage="Adults" /></p>
                <p className='option-age'><FormattedMessage id="app.age" defaultMessage="Ages" /> 18+</p>
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
                    <p className='option-age'><FormattedMessage id="app.age" defaultMessage="Ages" />  3-17</p>
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
