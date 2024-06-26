import React from "react";
import kickdrum from "../../assets/kickdrum.png";
import "./Footer.scss";
import { FormattedMessage } from "react-intl";
export default function Footer() {
  return (
    <div className="footer">
      <div className="left-div">
        <img src={kickdrum} className="kickdrum-img" alt="kickdrum"/>
      </div>
      <div className="right-div">
        <p className="copyright-txt">
          <FormattedMessage
            id="app.copyright"
            defaultMessage="Kickdrum Technology Group LLC"
          />
        </p>
        <p className="reserve-txt">
          <FormattedMessage
            id="app.rightsreserved"
            defaultMessage=" All rights reserved"
          />
        </p>
      </div>
    </div>
  );
}
