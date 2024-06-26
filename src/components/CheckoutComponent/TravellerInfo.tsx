import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  setPhoneNo,
  setTravelerFirstName,
  setTravelerLastName,
  setTravellerEmail,
} from "../../redux/slice/CheckoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../redux/store/store";
import {
  isValidEmail,
  isValidPhoneNumber,
} from "../../utils/Validations/UserDataValidation";

interface IShowNextBillingInfo {
  showBillingInfo: boolean;
  showBillingClick: boolean;
  setShowBillingClick:(value: boolean) => void;
  setShowBillingInfo:(value: boolean) => void;
}

export default function TravellerInfo({showBillingClick,showBillingInfo,setShowBillingInfo, setShowBillingClick}: IShowNextBillingInfo) {
  
  const dispatch = useDispatch<APPDispatch>();
  const { travelerFirstName, travelerLastName, phoneNo, travellerEmail } =
    useSelector((state: RootState) => state.checkoutList);

  const [phoneError, setPhoneError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value;
    dispatch(setPhoneNo(phoneNumber));

    if (!phoneNumber) {
      setPhoneError("No phone number added");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneError("Enter a valid phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailProvided = event.target.value;
    dispatch(setTravellerEmail(emailProvided));
    if (!travellerEmail) {
      setEmailError("No mail added");
    } else if (!isValidEmail(travellerEmail)) {
      setEmailError("Enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleTravelrInfoBtnClick = () => {
    if (
      travelerFirstName &&
      travelerLastName &&
      phoneNo &&
      travellerEmail &&
      phoneError.length === 0 &&
      showBillingInfo === false
    ) {
      setShowBillingInfo(!showBillingInfo);
    }else if(travelerFirstName || travelerLastName || phoneNo || travellerEmail){
      setShowBillingClick(true);
    }
  };

  return (
    <div className="checkoutpage_traveler_div">
      <p className="checkoutpage_info_title">
        1.
        <FormattedMessage id="app.travelerInfo" defaultMessage="payment Info" />
      </p>
      <div className="checkoutpage_traveler_info_dropdown">
        <div className="traveler_info_name_div">
          <div className="traveler_info_name">
            <p className="checkoutpage_info_txt">
              {" "}
              <FormattedMessage id="app.firstName" defaultMessage="firstName" />
            </p>
            <input
              type="text"
              className="checkoutpage_info_input"
              name="firstName"
              value={travelerFirstName}
              onChange={(event) =>
                dispatch(setTravelerFirstName(event.target.value))
              }
            />
            {showBillingClick && !travelerFirstName && (
              <p className="feild_error_msg">Enter first name</p>
            )}
          </div>
          <div className="traveler_info_name">
            <p className="checkoutpage_info_txt">
              <FormattedMessage id="app.lastName" defaultMessage="last Name" />
            </p>
            <input
              type="text"
              className="checkoutpage_info_input"
              value={travelerLastName}
              name="lasttName"
              onChange={(event) =>
                dispatch(setTravelerLastName(event.target.value))
              }
            />
            {showBillingClick && !travelerLastName && (
              <p className="feild_error_msg">Enter last name</p>
            )}
          </div>
        </div>

        <div className="traveler_info_contact_div">
          <p className="checkoutpage_info_txt">
            <FormattedMessage id="app.phone" defaultMessage="phone" />{" "}
          </p>
          <input
            type="text"
            className="checkoutpage_info_input"
            name="phoneno"
            value={phoneNo}
            onChange={handlePhoneChange}
          />
          {phoneError && <p className="feild_error_msg">{phoneError}</p>}
          {showBillingClick && phoneNo == 0 && (
            <p className="feild_error_msg">Add phone number</p>
          )}
        </div>

        <div className="traveler_info_email_div">
          <p className="checkoutpage_info_txt">
            {" "}
            <FormattedMessage id="app.email" defaultMessage="email" />{" "}
          </p>
          <input
            type="email"
            className="checkoutpage_info_input"
            name="email" 
            value={travellerEmail}
            onChange={handleEmailChange}
          />
          {emailError && <p className="feild_error_msg">{emailError}</p>}
          {showBillingClick && !travellerEmail && (
            <p className="feild_error_msg">Add correct email</p>
          )}
        </div>
        <div className="checkoutpage_info_btn_div">
          <button
            className="checkoutpage_info_btn"
            onClick={handleTravelrInfoBtnClick}
          >
            <FormattedMessage id="app.next" defaultMessage="next" />:
            <FormattedMessage
              id="app.billingInfo"
              defaultMessage="billinginfo"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
