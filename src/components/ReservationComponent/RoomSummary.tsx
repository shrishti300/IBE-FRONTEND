import React from 'react'
import { FormattedMessage } from 'react-intl'
import Up from "../../assets/up.svg";
import Down from "../../assets/down.svg";
import { Booking } from "../../utils/types/IProperty";

interface  IRoomSummary{
    reservationData:Booking | null;
    showRoomSummary:boolean;
    setShowRoomSummary:(value: boolean) => void;
}
export default function RoomSummary({reservationData, showRoomSummary, setShowRoomSummary}:IRoomSummary) {
  return (
  
    <div className="reservation_second_section">
    <div
      className="reservation_second_section_head"
      onClick={() => setShowRoomSummary(!showRoomSummary)}
    >
      <img
        className="reservation_second_section_arrow"
        src={showRoomSummary ? Down : Up}
        alt="Arrow Icon"
      />
      <p className="reservation_second_section_txt">
      <FormattedMessage id="app.roomTotalSummary" defaultMessage="room total summary"/> 

      </p>
    </div>
    {showRoomSummary && (
      <div className="reservation_second_section_body">
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">
            {" "}
            <FormattedMessage id="app.nightlyRate" defaultMessage="Nightly Rate"/> 

          </p>
          <p className="reservation_second_section_price">
            ${reservationData?.nightlyRate.toFixed(2)}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">  <FormattedMessage id="app.subtotal" defaultMessage="room"/> </p>
          <p className="reservation_second_section_price">
            ${reservationData?.subtotal.toFixed(2)}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc">
          <FormattedMessage id="app.taxesSurchargesFees" defaultMessage=".taxes Surcharges Fees"/> 

          </p>
          <p className="reservation_second_section_price">
            ${reservationData?.taxes.toFixed(2)}
          </p>
        </div>
        <div className="reservation_second_section_div">
          <p className="reservation_second_section_desc"> <FormattedMessage id="app.vat" defaultMessage="vat"/> </p>
          <p className="reservation_second_section_price">
            ${reservationData?.vat.toFixed(2)}
          </p>
        </div>
        <div className="reservation_second_section_div total_stay_div">
          <p className="reservation_second_section_desc">
          <FormattedMessage id="app.totalForStay" defaultMessage="total For Stay"/> 
          </p>
          <p className="reservation_second_section_price">
            {" "}
            ${reservationData?.total.toFixed(2)}
          </p>
        </div>
      </div>
    )}
  </div>
  )
}
