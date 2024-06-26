import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import './FiltersConfig.scss';
import { SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { APPDispatch } from '../../../redux/store/store';
import { addFilters } from '../../../redux/slice/TenantPropertySlice';
import { FormattedMessage } from 'react-intl';

interface Option {
  value: string;
  label: string;
}

export default function FiltersConfig() {
  const availableOptions: Option[] = [
    { value: 'price', label: 'Price' },
    { value: 'roomType', label: 'Room Type' },
    { value: 'beds', label: 'Beds' },
  ];

  const dispatch = useDispatch<APPDispatch>();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    setSelectedOptions(event.target.value as string[]);
    dispatch(addFilters(event.target.value as string[]));
  };

  return (
    <div className="filterconfig">
      <p className="filterconfig-label"> <FormattedMessage id="app.filter" defaultMessage="filter" /></p>
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
                maxHeight: "13rem", 
                overflowY: "auto",
              },
            },
          }}
        >
          {availableOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
