import React from 'react'
import './TaxModal.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store/store'
import { convertDateFormat, countTotalPrice } from '../../../utils/calculations/Calculations';

interface ICurrencyObj{
    [currency : string] : [string, number];
}

interface ITaxModal{
    dueNowTotal: number;
    dueAtResort: number;
    discount: number
}

export default function TaxModal({dueNowTotal, dueAtResort,discount} : ITaxModal) {

    const {roomType, minPriceHmap,promotion, resortFee, occupancyTax} = useSelector((state: RootState) => state.itineraryReducer);
    const total = countTotalPrice(minPriceHmap[roomType]);
    const discountTotal = discount === 0 ? 0 : (1 - discount)*total;
    const { current, INR, EUR, GBP, USD } = useSelector((state: RootState) => state.currencyList);
    const currencyObjMapper : ICurrencyObj = {
      "USD": ["$", USD],
      "INR": ["₹", INR],
      "EUR": ["€", EUR],
      "GBP": ["£", GBP]
  }

  return (
    <div className='tax-modal'>
        <div className="tax-modal-heading">Rate Breakdown</div>
        <div className="tax-modal-roomType">{roomType}</div>
        <div className="tax-modal-nightly-rate">Nightly rate (per room)</div>
        <div className="tax-modal-promotion">
            {
                discount > 0 &&  <><p>{promotion[0]}</p>
                <p>-{currencyObjMapper[current][0]}{(discountTotal*currencyObjMapper[current][1]).toFixed(2)}</p></>
            }
           
        </div>

        <div className="tax-modal-each-date-price">
        {
            Object.keys(minPriceHmap[roomType]).map((date) => (
              <div className="iti-date-price-div" key={date}>
                <div className="iti-date">{convertDateFormat(date)}</div>
                <div className="iti-price">{currencyObjMapper[current][0]}{(minPriceHmap[roomType][date] * currencyObjMapper[current][1]).toFixed(2)}</div>
              </div>
            ))
        }
        </div>
        <div className="tax-modal-room-total">
            <p>Room Total : </p>
            <p>{currencyObjMapper[current][0]}{(total * currencyObjMapper[current][1]).toFixed(2)}</p>
        </div>

        <div className="tax-modal-separator"></div>

        <div className="tax-modal-tax-heading">
            Taxes and fees (per room)
        </div>
        <div className="tax-modal-taxes-info">
            <div className="tax-modal-resort-fee">
                <p>Resort Fee : </p>
                <p>{currencyObjMapper[current][0]}{((total - discountTotal) * currencyObjMapper[current][1] * (resortFee/100)).toFixed(2)}</p>
            </div>
            <div className="tax-modal-occupancy-tax">
                <p>Occupancy Tax : </p>
                <p>{currencyObjMapper[current][0]}{((total - discountTotal) * currencyObjMapper[current][1] * (occupancyTax/100)).toFixed(2)}</p>
            </div>
        </div>

        <div className="tax-modal-separator"></div>

        <div className="tax-modal-dues">
            <div className="tax-modal-due-now">
                <p>Due Now : </p>
                <p>{currencyObjMapper[current][0]}{dueNowTotal.toFixed(2)}</p>
            </div>
            <div className="tax-modal-due-atresort">
                <p>Due At Resort : </p>
                <p>{currencyObjMapper[current][0]}{dueAtResort.toFixed(2)}</p>
            </div>
        </div>

    </div>
  )
}
