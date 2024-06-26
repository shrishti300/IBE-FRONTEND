import React from 'react'
import PropertyName from '../../BookingForm/PropertyName/PropertyName'
import './PromoCodeConfig.scss'
import { useDispatch, useSelector } from 'react-redux'
import { APPDispatch, RootState } from '../../../redux/store/store'
import { addPromoDescription, addPromoMinDays, addPromoPriceFactor, addPromoTitle, setShowInModal } from '../../../redux/slice/TenantPersonalSlice'
import RoomType from '../RoomType/RoomType'
import { FormattedMessage } from 'react-intl'

export default function () {
    const {promoMinDays,promoTitle,promoDescription,promoPriceFactor,showInModal} = useSelector((state: RootState) => state.tenantPersonalList);
    const dispatch = useDispatch<APPDispatch>();

  return (
    <div className='promocode-config'>
        <PropertyName/>
        <RoomType/>
        <label htmlFor="title" style={{marginTop: '0.7rem'}}><FormattedMessage id="app.enterTitle" defaultMessage="enter title" /></label>
        <input type="text" name="" id="promo-title" value={promoTitle} onChange={(e) => dispatch(addPromoTitle(e.target.value))}/>

        <label htmlFor="description"><FormattedMessage id="app.enterDescription" defaultMessage="enter Description" /></label>
        <input type="text" name="" id="promo-description" value={promoDescription} onChange={(e) => dispatch(addPromoDescription(e.target.value))}/>

        <label htmlFor="min_days"><FormattedMessage id="app.enterMinimumdaysofstay" defaultMessage="enter Minimumdays of stay" /></label>
        <input type="number" name="" id="promo-min-days" value={promoMinDays} onChange={(e) => dispatch(addPromoMinDays(e.target.value))}/>

        <label htmlFor="price_factor"><FormattedMessage id="app.enterpricefactor" defaultMessage="enter price factor" /></label>
        <input type="number" name="" id="promo-price-factor" min={0} max={1} step={0.01} value={promoPriceFactor} onChange={(e) => dispatch(addPromoPriceFactor(e.target.value))}/>

        <div className="checkbox-model">
          <input type="checkbox" checked={showInModal} onClick={() => dispatch(setShowInModal(!showInModal))} /> 
          <p><FormattedMessage id="app.showInModal" defaultMessage="show In Modal" /></p>
        </div>


    </div>
  )
}
