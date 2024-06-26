import React from 'react'
import './PropertyBanner.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

export default function () {
  const { bannerLink } = useSelector((state : RootState) => state.tenantPersonalList);

  return (
    <div className='property-banner' style={{backgroundImage: bannerLink.length > 0 ? `url(${bannerLink})` : '', backgroundSize: 'cover'}}>

    </div>
  )
}
