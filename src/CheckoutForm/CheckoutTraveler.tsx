import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../redux/store/store';
import { setPhoneNo, setTravelerFirstName, setTravelerLastName, setTravellerEmail } from '../redux/slice/CheckoutSlice';
import { isValidEmail, isValidPhoneNumber } from '../utils/Validations/UserDataValidation';

export default function CheckoutTraveler() {
    const dispatch = useDispatch<APPDispatch>();
    const [showBillingClick, setShowBillingClick] = useState(false);
    const [showTravelerInfo, setShowTravelerInfo] = useState(false);
    const [emailError, setEmailError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");


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
    }
  };

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

    const {
      travelerFirstName,
      travelerLastName,
      phoneNo,
      travellerEmail,
    } = useSelector((state: RootState) => state.checkoutList);

  return (
         <div className="checkoutpage_traveler_div">
    <p className="checkoutpage_info_title">1. Traveler Info</p>
    <div className="checkoutpage_traveler_info_dropdown">
      <div className="traveler_info_name_div">
        <div className="traveler_info_name">
          <p className="checkoutpage_info_txt">First Name</p>
          <input
            type="text"
            className="checkoutpage_info_input"
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
          <p className="checkoutpage_info_txt">Last Name</p>
          <input
            type="text"
            className="checkoutpage_info_input"
            value={travelerLastName}
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
        <p className="checkoutpage_info_txt">Phone </p>
        <input
          type="text"
          className="checkoutpage_info_input"
          value={phoneNo}
          onChange={handlePhoneChange}
        />
        {phoneError && <p className="feild_error_msg">{phoneError}</p>}
        {showBillingClick && phoneNo == 0 && (
          <p className="feild_error_msg">Add phone number</p>
        )}
      </div>

      <div className="traveler_info_email_div">
        <p className="checkoutpage_info_txt">Email</p>
        <input
          type="email"
          className="checkoutpage_info_input"
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
          NEXT:BILLING INFO
        </button>
      </div>
    </div>
  </div>
  )
}

