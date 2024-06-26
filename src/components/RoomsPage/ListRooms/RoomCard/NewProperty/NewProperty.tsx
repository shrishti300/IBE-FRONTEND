import React from "react";
import "./NewProperty.scss";
import { FormattedMessage } from "react-intl";

interface IRating {
  ratings: number;
  usersRated: number
}
export default function NewProperty({ ratings, usersRated }: Readonly<IRating>) {
  return (
    <div className="newproperty">
      {
        ratings === undefined || ratings === -1 ?
          <p className="newproperty_txt">
            <FormattedMessage id="app.newProperty" defaultMessage="new property" />
          </p>
          :
          <div className="rating-div">
            <p style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '16px', fontWeight: 'bold' }}><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.01629 3.47706L5.60002 0.333008L7.18375 3.47706L10.8791 4.00106L8.23957 6.62111L8.76748 10.2892L5.60002 8.71714C4.72017 9.24115 2.85489 9.86995 2.43256 10.2892C2.01023 10.7084 2.60853 8.01846 2.96047 6.62111L0.320923 4.00106L4.01629 3.47706Z" fill="#26266D" />
            </svg>
              <span style={{ marginLeft: '5px' }}>{ratings.toFixed(2)}</span></p>
            <p style={{ color: 'gray' }}>{usersRated}   <FormattedMessage id="app.reviews" defaultMessage="Reviews" /></p>
          </div>
      }
    </div>
  );
}
