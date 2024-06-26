import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store/store'
import './PromoModal.scss'

interface IPromoModal{
  subtotal: number
}
interface ICurrencyObj {
  [currency: string]: [string, number];
}
export default function ({subtotal} : IPromoModal) {
  const { current, INR, EUR, GBP, USD } = useSelector((state: RootState) => state.currencyList);
  const currencyObjMapper: ICurrencyObj = {
    "USD": ["$", USD],
    "INR": ["₹", INR],
    "EUR": ["€", EUR],
    "GBP": ["£", GBP]
  }
    const {promotion} = useSelector((state: RootState) => state.itineraryReducer);
  return (
    <div className='promo-modal'>
        <p className='promo-modal-title'>{promotion[0]}</p>
        <p className='promo-modal-description'>{promotion[1]}</p>
        <p className='promo-modal-minDays'>Min Days of stay: {promotion[3]}</p>
        <p className='promo-modal-packageTotal'>
            <p>Package Total : </p>
            <p>{currencyObjMapper[current][0]}{(subtotal * currencyObjMapper[current][1]).toFixed(2)}</p>
        </p>
    </div>
  )
}
