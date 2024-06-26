import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import "./MaximumDays.scss";
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { addMaxDays } from '../../../redux/slice/TenantPropertySlice';
import { ChangeEvent } from 'react';
import { FormattedMessage } from 'react-intl';

export default function MaximumDays() {
  const {maxDays} = useSelector((state : RootState) => state.tenantPropertyList);
  const dispatch = useDispatch<APPDispatch>();

  const handleChange = (e : SelectChangeEvent<number>) => {
    dispatch(addMaxDays(e.target.value))
  }
  return (
    <div className='maxdays'>
      <p className='maxdays-txt'> <FormattedMessage id="app.max" defaultMessage="max" /> <FormattedMessage id="app.rooms" defaultMessage="rooms" /></p>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="maxdays-select"
          onChange={handleChange}
          value={maxDays}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 150, 
              },
            },
          }}
        >
          {[...Array(14).keys()].map((index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
