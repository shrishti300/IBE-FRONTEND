import React from 'react'
import { FormattedMessage } from 'react-intl'
import Up from "../../assets/up.svg";
import Down from "../../assets/down.svg";
import { Booking } from "../../utils/types/IProperty";

interface  IBillingSummary{
    reservationData:Booking | null;
    showBillingSummary:boolean;
    setShowBillingSUmmary:(value: boolean) => void;
}


export default function BillingSummary({reservationData, showBillingSummary, setShowBillingSUmmary}:IBillingSummary) {
  return (

    <div className="reservation_second_section billing_div">
    <div
      className="reservation_second_section_head"
      onClick={() => setShowBillingSUmmary(!showBillingSummary)}
    >
      <img
        className="reservation_second_section_arrow"
        src={showBillingSummary ? Down : Up}
        alt="Arrow Icon"
      />
      <p className="reservation_second_section_txt"><FormattedMessage id="app.billingAddress" defaultMessage="billing Address"/> </p>
    </div>

    {showBillingSummary && (
      <div className="reservation_second_section_body">
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">
          <FormattedMessage id="app.mailingAddress" defaultMessage="mailing Address"/>   1
          </p>
          <p className="reservation_second_section_price">
            {reservationData?.mailAddress1}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">
          <FormattedMessage id="app.mailingAddress" defaultMessage="mailing Address"/>   2
          </p>
          <p className="reservation_second_section_price">
            {reservationData?.mailAddress2}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc"><FormattedMessage id="app.country" defaultMessage="country"/></p>
          <p className="reservation_second_section_price">
            {reservationData?.country}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc"> <FormattedMessage id="app.state" defaultMessage="state"/></p>
          <p className="reservation_second_section_price">
            {reservationData?.state}
          </p>
        </div>
        <div className="reservation_second_section_div total_stay_div">
          <p className="reservation_second_section_desc">  <FormattedMessage id="app.city" defaultMessage="city"/> </p>
          <p className="reservation_second_section_price">
            {reservationData?.city}
          </p>
        </div>
        <div className="reservation_second_section_div total_stay_div">
          <p className="reservation_second_section_desc"><FormattedMessage id="app.zip" defaultMessage="Zip"/></p>
          <p className="reservation_second_section_price">
            {" "}
            {reservationData?.zip}
          </p>
        </div>
      </div>
    )}
  </div>
  )
}
