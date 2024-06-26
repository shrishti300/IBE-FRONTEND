import React from 'react'
import { FormattedMessage } from 'react-intl'
import Up from "../../assets/up.svg";
import Down from "../../assets/down.svg";
import { Booking } from "../../utils/types/IProperty";

interface  IPaymentSummary{
    reservationData:Booking | null;
    showPaymentSummary:boolean;
    setShowPaymentSummary:(value: boolean) => void;
}

function hideCardNumber(cardNumber: number) {
    // Encrypt all but the last four digits
    const cardNumberString = cardNumber.toString();
    const encryptedDigits = cardNumberString.slice(0, -4).replace(/\d/g, "*");
    const lastFourDigits = cardNumberString.slice(-4);
    return encryptedDigits + lastFourDigits;
  }


export default function PaymentSummary({reservationData, setShowPaymentSummary, showPaymentSummary}:IPaymentSummary) {
  return (
    <div className="reservation_second_section">
    <div
      className="reservation_second_section_head"
      onClick={() => setShowPaymentSummary(!showPaymentSummary)}
    >
      <img
        className="reservation_second_section_arrow"
        src={showPaymentSummary ? Down : Up}
      />
      <p className="reservation_second_section_txt">
      <FormattedMessage id="app.paymentInfo" defaultMessage="payment info"/> 
      </p>
    </div>
    {showPaymentSummary && (
      <div className="reservation_second_section_body">
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">
          <FormattedMessage id="app.cardName" defaultMessage="card name"/> {" "}
          </p>

          <p className="reservation_second_section_price">
            {reservationData?.cardName}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">
          <FormattedMessage id="app.cardNumber" defaultMessage="card"/>  : 
          </p>
          <p className="reservation_second_section_price">
          {hideCardNumber(Number(reservationData?.cardNumber))}
          </p>
        </div>
      </div>
    )}
  </div>
  )
}
