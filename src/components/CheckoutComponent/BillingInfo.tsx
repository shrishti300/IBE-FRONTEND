import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../redux/store/store";
import { FormattedMessage } from "react-intl";
import {
  setBillingFirstName,
  setBillingLastName,
  setMailAddress1,
  setMailAddress2,
  setZip,
} from "../../redux/slice/CheckoutSlice";
import CountryDropDown from "../Checkout/CountryDropDown/CountryDropDown";
import StateDropDown from "../Checkout/StateDropDown/StateDropDown";
import CityDropDown from "../Checkout/CityDropDown/CityDropDown";


interface IshowNextTravellerinfo{
    showPaymentInfo:boolean;
    showBillingInfo:boolean;
    showPaymentClick:boolean;
    setShowPaymentClick:(value:boolean) => void;
    setShowPaymentInfo: (value: boolean) => void;
}

export default function BillingInfo({ showPaymentInfo,showBillingInfo,showPaymentClick, setShowPaymentInfo, setShowPaymentClick}:IshowNextTravellerinfo) {
  const dispatch = useDispatch<APPDispatch>();
  const [zipError, setZipError] = useState("");

  const {
    billingFirstName,
    billingLastName,
    mailAddress1,
    mailAddress2,
    country,
    city,
    state,
    zip,
  } = useSelector((state: RootState) => state.checkoutList);


  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zipProvided = event.target.value;
    console.log(zipProvided);
    dispatch(setZip(zipProvided));  
  };

  useEffect(() =>{
    if (!zip) {
      setZipError("No zip added");
    } else if(!/^\d+$/.test(zip)){
      setZipError("enter valid zip");
    }
    else {
      setZipError("");
    }
  }, [zip])

  const handleBillingInfoBtnClick = () => {
    if (
      billingFirstName &&
      billingLastName &&
      mailAddress1 &&
      country &&
      city &&
      state &&
      zip &&
      showPaymentInfo === false
    ) {
      setShowPaymentInfo(!showPaymentInfo);
    }
    else if(!billingFirstName || !billingLastName || !mailAddress1 || !country || !city || !state ){
      setShowPaymentClick(true);
    }
  }; 

  return (
    <div className="billing_info_div">
      <p className="checkoutpage_info_title">
        2.{" "}
        <FormattedMessage id="app.billingInfo" defaultMessage="billinginfo" />
      </p>
      <div
        className="checkoutpage_billing_info_dropdown"
        style={{ display: showBillingInfo ? "block" : "none" }}
      >
        <div className="billing_info_name_div">
          <div className="billing_info_fname_div">
            <p className="checkoutpage_info_txt">
              {" "}
              <FormattedMessage
                id="app.firstName"
                defaultMessage="first name"
              />
            </p>
            <input
              type="text"
              className="checkoutpage_info_input"
              value={billingFirstName}
              name="firstname" autoComplete="given-name"

              onChange={(event) =>
                dispatch(setBillingFirstName(event.target.value))
              }
            />
            {showPaymentClick && !billingFirstName && (
              <p className="feild_error_msg">Enter first name</p>
            )}
          </div>
          <div className="billing_info_lname_div">
            <p className="checkoutpage_info_txt">
              {" "}
              <FormattedMessage id="app.lastName" defaultMessage="last name" />
            </p>
            <input
              type="text"
              className="checkoutpage_info_input"
              value={billingLastName}
              name="lastname" autoComplete="given-name"
              onChange={(event) =>
                dispatch(setBillingLastName(event.target.value))
              }
            />
            {showPaymentClick && !billingLastName && (
              <p className="feild_error_msg">Enter last name</p>
            )}
          </div>
        </div>
        <div className="billing_info_address_main_div">
          <div className="billing_info_address_div">
            <p className="checkoutpage_info_txt">
              <FormattedMessage
                id="app.mailingAddress"
                defaultMessage="Mailing Address"
              /> {" "}
              1
            </p>
            <input
              type="text"
              className="checkoutpage_info_input"
              name="address" autoComplete="given-name"
              value={mailAddress1}
              onChange={(event) =>
                dispatch(setMailAddress1(event.target.value))
              }
            />
            {showPaymentClick && !mailAddress1 && (
              <p className="feild_error_msg">Enter valid mail address</p>
            )}
          </div>
          <div className="billing_info_address_div">
            <p className="checkoutpage_info_txt">
              {" "}
              <FormattedMessage
                id="app.mailingAddress"
                defaultMessage="Mailing Address"
              />{" "}
              2
            </p>
            <input
              type="text"
              className="checkoutpage_info_input"
              value={mailAddress2}
              name="address" autoComplete="given-name"
              onChange={(event) =>
                dispatch(setMailAddress2(event.target.value))
              }
            />
          </div>
        </div>
        <div className="billing_info_country_div">
          <p className="checkoutpage_info_txt">
            {" "}
            <FormattedMessage id="app.country" defaultMessage="country" />
          </p>
          <p>
            <CountryDropDown />
          </p>
          {showPaymentClick && !country && (
            <p className="feild_error_msg">Select country</p>
          )}
        </div>
        <div className="billing_info_city_div">
          <div className="billing_info_state_div">
            <p className="checkoutpage_info_txt">
              {" "}
              <FormattedMessage id="app.state" defaultMessage="state" />
            </p>
            <p className="checkoutpage_state_info_input">
              <StateDropDown />
            </p>
            {showPaymentClick && !state && (
              <p className="feild_error_msg">Select a state</p>
            )}
          </div>
          <div className="billing_info_city_info_div">
            <p className="checkoutpage_info_txt">
              {" "}
              <FormattedMessage id="app.city" defaultMessage="city" />
            </p>
            <CityDropDown />
            {showPaymentClick && !city && (
              <p className="feild_error_msg">Enter city</p>
            )}
          </div>
          <div className="billing_info_zip_div">
            <p className="checkoutpage_info_txt">
              {" "}
              <FormattedMessage id="app.zip" defaultMessage="payment Info" />
            </p>
            <input
              type="text"
              className="checkoutpage_city_info_input checkout_zip_input"
              value={zip}
              onChange={handleZipChange}
            />
            {showPaymentClick && !zip && (
              <p className="feild_error_msg">Enter Zip code</p>
            )}
            {zipError && <p className="feild_error_msg">{zipError}</p>}
          </div>
        </div>
        <div className="checkoutpage_info_btn_div">
          <button
            className="checkoutpage_info_btn"
            onClick={handleBillingInfoBtnClick}
          >
            <FormattedMessage id="app.next" defaultMessage="next" />:{" "}
            <FormattedMessage
              id="app.paymentInfo"
              defaultMessage="Payment info"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
