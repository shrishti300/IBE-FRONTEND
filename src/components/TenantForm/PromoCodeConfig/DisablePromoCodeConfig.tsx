import React from 'react'
import './DisablePromoCodeConfig.scss'
import { Select } from '@mui/material'
import PropertyName from '../../BookingForm/PropertyName/PropertyName'
import RoomType from '../RoomType/RoomType'
import PromotionByRoom from '../PromotionByRoom/PromotionByRoom'

export default function DisablePromoCodeConfig() {
  return (
    <div>
        <PropertyName/>
        <RoomType/>
        <PromotionByRoom/>
    </div>
  )
}
