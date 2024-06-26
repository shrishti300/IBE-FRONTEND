import React, { ChangeEvent } from 'react'
import './PropertyDescription.scss'
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { addDescription } from '../../../redux/slice/TenantRoomSlice';
import { FormattedMessage } from 'react-intl';
export default function PropertyDescription() {

    const {description} = useSelector((state: RootState) => state.tenantRoomList);
    const dispatch = useDispatch<APPDispatch>();

    const handleDescriptionChange = (e : ChangeEvent<HTMLInputElement>) => {
      dispatch(addDescription(e.target.value));
    }
  
    return (
      <div className="propertydescription">
        <p className="title-txt"><FormattedMessage id="app.roomDescription" defaultMessage="Room Description" /></p>
        <input type="text" placeholder="Enter Room Description" className="title-input" value={description} required onChange={handleDescriptionChange} />
      </div>
    );
  }