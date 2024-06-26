import React, { ChangeEvent } from "react";
import { APPDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slice/LanguageSlice";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function Lang() {
  const NoIcon = () => null;

 const dispatch: APPDispatch = useDispatch();

 const languageName = useSelector(
    (state: RootState) => state.languageList.languageName
 );

 const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    dispatch(setLanguage(event.target.value));
 };

 return (
    <div>
      <Select
        className="lang-select"
        value={languageName}
        onChange={handleLanguageChange}
        IconComponent={NoIcon} 
        sx={{
          border: 'none',
          outline: 'none',
          paddingTop: '2px',
          background: 'transparent',
          WebkitAppearance: 'none',
          color: '#333',
          fontSize: '22px',
          '.MuiOutlinedInput-notchedOutline': { border: 'none' }, // This removes the border
          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Ensures border is removed on hover
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Ensures border is removed when focused
        }}
      >
        <MenuItem value="en-US">EN</MenuItem>
        <MenuItem value="es-MX">SPA</MenuItem>
        <MenuItem value="en-GB">Hindi</MenuItem>
      </Select>
    </div>
 );
}
