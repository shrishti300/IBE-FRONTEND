import React from 'react'
import { APPDispatch } from '../redux/store/store';
import { useDispatch } from 'react-redux';
import { setBillingFirstName, setBillingLastName, setMailAddress1, setMailAddress2 } from '../redux/slice/CheckoutSlice';
import CountryDropDown from '../components/Checkout/CountryDropDown/CountryDropDown';
import StateDropDown from '../components/Checkout/StateDropDown/StateDropDown';

export default function CheckoutBilling() {
    const dispatch = useDispatch<APPDispatch>();

  return (
    <div className="billing_info_div">
    <p className="checkoutpage_info_title">2. Billing Info</p>
    <div
      className="checkoutpage_billing_info_dropdown"
      style={{ display: showBillingInfo ? "block" : "none" }}
    >
      <div className="billing_info_name_div">
        <div className="billing_info_fname_div">
          <p className="checkoutpage_info_txt">First Name</p>
          <input
            type="text"
            className="checkoutpage_info_input"
            value={billingFirstName}
            onChange={(event) =>
              dispatch(setBillingFirstName(event.target.value))
            }
          />
          {showPaymentClick && !billingFirstName && (
            <p className="feild_error_msg">Enter first name</p>
          )}
        </div>
        <div className="billing_info_lname_div">
          <p className="checkoutpage_info_txt">Last Name</p>
          <input
            type="text"
            className="checkoutpage_info_input"
            value={billingLastName}
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
          <p className="checkoutpage_info_txt">Mailing Address 1</p>
          <input
            type="text"
            className="checkoutpage_info_input"
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
          <p className="checkoutpage_info_txt">Mailing Address 2</p>
          <input
            type="text"
            className="checkoutpage_info_input"
            value={mailAddress2}
            onChange={(event) =>
              dispatch(setMailAddress2(event.target.value))
            }
          />
        </div>
      </div>
      <div className="billing_info_country_div">
        <p className="checkoutpage_info_txt"> Country</p>
        <p>
          <CountryDropDown />
        </p>
        {showPaymentClick && !country && (
          <p className="feild_error_msg">Select country</p>
        )}
      </div>
      <div className="billing_info_city_div">
      
        <div className="billing_info_state_div">
          <p className="checkoutpage_info_txt"> State</p>
          <p className="checkoutpage_state_info_input">
            <StateDropDown />
          </p>
          {showPaymentClick && !state && (
            <p className="feild_error_msg">Select a state</p>
          )}
        </div>
        <div className="billing_info_city_info_div">
          <p className="checkoutpage_info_txt"> City</p>
          <CityDropDown />
          {showPaymentClick && !city && (
            <p className="feild_error_msg">Enter city</p>
          )}
        </div>
        <div className="billing_info_zip_div">
          <p className="checkoutpage_info_txt"> Zip</p>
          <input
            type="text"
            className="checkoutpage_city_info_input"
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
          NEXT:PAYMENT INFO
        </button>
      </div>
    </div>
  </div>
    )
}
