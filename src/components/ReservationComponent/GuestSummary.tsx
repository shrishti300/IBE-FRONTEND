import React from 'react'
import Up from "../../assets/up.svg";
import Down from "../../assets/down.svg";
import { FormattedMessage } from 'react-intl';
import { Booking } from '../../utils/types/IProperty';



interface  IGuestSummary{
    reservationData:Booking | null;
    showGuestSummary:boolean;
    setShowGuestSummary:(value: boolean) => void;
}
export default function GuestSummary({reservationData, showGuestSummary, setShowGuestSummary}:IGuestSummary) {
  return (
    <div className="reservation_second_section">
    <div
      className="reservation_second_section_head"
      onClick={() => setShowGuestSummary(!showGuestSummary)}
    >
      <img
        className="reservation_second_section_arrow"
        src={showGuestSummary ? Down : Up}
        alt="Arrow Icon"
      />
      <p className="reservation_second_section_txt">
      <FormattedMessage id="app.guestInformation" defaultMessage=".guestInformation"/> 
      </p>
    </div>

    {showGuestSummary && (
      <div className="reservation_second_section_body">
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc"> <FormattedMessage id="app.firstName" defaultMessage="first name"/> </p>
          <p className="reservation_second_section_price">
            {reservationData?.firstName}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">  <FormattedMessage id="app.lastName" defaultMessage="last name"/> </p>
          <p className="reservation_second_section_price">
            {reservationData?.lastName}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">
          <FormattedMessage id="app.phone" defaultMessage="phone"/> 
          </p>
          <p className="reservation_second_section_price">
            {reservationData?.phoneNumber}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc"> <FormattedMessage id="app.email" defaultMessage="Email"/> </p>
          <p className="reservation_second_section_price">
            {reservationData?.email}
          </p>
        </div>
      </div>
    )}
  </div>
  )
}
