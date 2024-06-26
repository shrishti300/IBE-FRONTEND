import React, { ChangeEvent, useEffect } from 'react';
import { APPDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { convertCurrency } from '../../redux/thunk/FetchCurrency';
import { changeCurrency } from '../../redux/slice/CurrencySlice';
import { Select, MenuItem } from '@mui/material';

export default function Currency() {
  const NoIcon = () => null;

 const dispatch: APPDispatch = useDispatch();
 const { current } = useSelector((state: RootState) => state.currencyList);

 useEffect(() => {
    dispatch(convertCurrency());
 }, [dispatch]);

 const handleCurrencyChange = (event: any) => {
    dispatch(changeCurrency(event.target.value as string));
 };

 return (
    <Select
      className="currency-select"
      value={current}
      onChange={handleCurrencyChange}
      IconComponent={NoIcon} 
      sx={{
        border: 'none',
        outline: 'none',
        padding: 0,
        background: 'transparent',
        WebkitAppearance: 'none',
        color: '#333',
        fontSize: '22px',
        '.MuiOutlinedInput-notchedOutline': { border: 'none' }, // This removes the border
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Ensures border is removed on hover
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Ensures border is removed when focused
      }}
    >
      <MenuItem value="USD">&#65284; USD</MenuItem>
      <MenuItem value="INR">&#8377; INR</MenuItem>
      <MenuItem value="EUR">&#8364; EUR</MenuItem>
      <MenuItem value="GBP">&#163; GBP</MenuItem>
    </Select>
 );
}
