import React, { useEffect, useState } from 'react'
import TermsAndCondition from '../Checkout/TermsAndConditions/TermsAndCondition'
import Modal from 'react-responsive-modal'
import { FormattedMessage } from 'react-intl'
import { setAgreeToTerms, setCardName, setCardNumber, setCvvCode, setExpMM, setExpYY, setSpecialOffer } from '../../redux/slice/CheckoutSlice'
import { useDispatch, useSelector } from 'react-redux'
import { APPDispatch, RootState } from '../../redux/store/store'
import { isValidCVV, isValidCardNumber, isValidExpiryDate } from '../../utils/Validations/CardValidations'
import axios from 'axios'
import { showSnackbar } from '../../redux/slice/SnackbarSlice'
import { isValidEmail, isValidPhoneNumber } from '../../utils/Validations/UserDataValidation'
import { AuthUser } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'


interface IshowNextTravellerinfo{
  user:AuthUser;
  loader:boolean;
  setLoader:(value: boolean) => void;
  showPaymentInfo:boolean;
  purchaseClick : boolean;


}



export default function PaymentInfoComponent({user, loader, setLoader, showPaymentInfo, purchaseClick}:IshowNextTravellerinfo) {
    const navigate = useNavigate();
    const dispatch = useDispatch<APPDispatch>();
    const [cvvError, setCvvError] = useState("");
    const [expiryError, setExpiryError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {
        travelerFirstName,
        travelerLastName,
        phoneNo,
        travellerEmail,
        billingFirstName,
        billingLastName,
        mailAddress1,
        mailAddress2,
        country,
        city,
        state,
        zip,
        cardNumber,
        cardName,
        expMM,
        expYY,
        cvvCode,
        specialOffer,
        agreeToTerms,
        image
      } = useSelector((state: RootState) => state.checkoutList);
      

  
      const { promotion, roomType, dueNow, guestInfo, nightlyRate, subtotal, taxes, vat, total } = useSelector(
        (state: RootState) => state.itineraryReducer
      );
    
      const { startDate, endDate, kidCount, adultCount, roomCount } = useSelector((state: RootState) => state.bookingFormList);

  const handlePurchaseInfoBtnClick = async() => {

    if (cardName && expMM && expYY && cvvCode && agreeToTerms && cardNumber && phoneNo && billingFirstName && billingLastName  && country && city && state && zip && isValidCVV(cvvCode) && isValidExpiryDate(expMM, expYY) && isValidCVV(cvvCode) && isValidCardNumber(cardNumber) && isValidPhoneNumber(phoneNo.toString()) && isValidEmail(travellerEmail)) {
      setLoader(true);
      try{
        console.log(nightlyRate)
        await axios.post(import.meta.env.VITE_TRANSACTION_API, {
          roomType, image, startDate, endDate, promotion, guestInfo,roomCount, nightlyRate, subtotal, taxes,
          vat, total, firstName: travelerFirstName, lastName: travelerLastName, phoneNumber: phoneNo, email: travellerEmail, mailAddress1, mailAddress2, country, state, city, zip, cardName, cardNumber, isCancelled: false, specialOffer, bookedBy: user !== undefined ? user.signInDetails?.loginId : travellerEmail,
          adultCount: adultCount,kidCount: kidCount,dueAtResort: total - dueNow
        }).then((response) => {
          navigate(`/reservation/${response.data}`);
        })
      }catch(error) {
        if (axios.isAxiosError(error)) {
          console.log(error)
          dispatch(showSnackbar({ type: 'fail', message: error.message }));
       }
      }
      setLoader(false);
    }
  };



      const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cvvProvided = event.target.value;
        dispatch(setCvvCode(cvvProvided));
      };
    
    
      useEffect(() => {
        if (!cvvCode) {
          setCvvError("No cvv code added");
        } else if (!isValidCVV(cvvCode)) {
          setCvvError("Enter a valid cvv code");
        } else {
          setCvvError("");
        }
      }, [cvvCode])
    
      const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const expiryProvided = event.target.value;
        dispatch(setExpYY(expiryProvided));
    
      };
    
      useEffect(() => {
        if (!expYY) {
          setExpiryError("No expiry added");
        } else if (!isValidExpiryDate(expMM, expYY)) {
          setExpiryError("Enter valid expiry date");
        } else {
          setExpiryError("");
        }
      },[expYY])
    
      const handleCreditNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        const creditcardNum = event.target.value;
        dispatch(setCardNumber(creditcardNum));
    
      }
      useEffect(() => {
        if (!cardNumber) {
          setErrorMessage("No card number added");
        } else if (!isValidCardNumber(cardNumber)) {
          setErrorMessage("Enter a valid card number");
        } else {
          setErrorMessage("");
        }
      }, [cardNumber]);

      const [showModal, setShowModal] = useState(false);
    
      const [openModal, setOpenModal] = React.useState(false);
      const handleOpen = () => {
        setOpenModal(true);
        setShowModal(true);
      };
      const handleClose = () => setOpenModal(false);
    
  return (
    
    <div className="payment_info_main_div">
    <p className="checkoutpage_info_title">3.<FormattedMessage id="app.paymentInfo" defaultMessage="Payment info" /></p>
    <div
      className="checkoutpage_payment_info_dropdown"
      style={{ display: showPaymentInfo ? "block" : "none" }}
    >
      <div className="checkoutpage_payment_div">
        <div>
          <p className="checkoutpage_info_txt"><FormattedMessage
                id="app.cardName"
                defaultMessage="card name"
              /></p>
          <input
            type="text"
            className="checkoutpage_payment_info_input"
            value={cardName}
            name="card name" autoComplete="given-name"
            onChange={(event) =>
              dispatch(setCardName(event.target.value))
            }
          />
          {purchaseClick && !cardName && (
            <p className="feild_error_msg">Enter valid card Name</p>
          )}
        </div>

        <div>
          <p className="checkoutpage_info_txt">  <FormattedMessage
                id="app.cardNumber"
                defaultMessage="payment Info"
              /></p>
          <input
            type="text"
            className="checkoutpage_payment_info_input"
            value={cardNumber}
            onChange={handleCreditNumber}
          />
          {errorMessage && <p className="feild_error_msg">{errorMessage}</p>}
          {purchaseClick && !cardNumber && (
            <p className="feild_error_msg">Enter valid card Name</p>
          )}
        </div>

        <div className="month_div">
          <p className="checkoutpage_info_txt"><FormattedMessage
                id="app.expMM"
                defaultMessage="payment Info"
              /></p>
          <input
            type="text"
            className="checkoutpage_payment_info_input"
            value={expMM}
            name="expMM" autoComplete="exp-month"
            onChange={(event) => dispatch(setExpMM(event.target.value))}
          />
          {purchaseClick && !expMM && (
            <p className="feild_error_msg">Enter valid expiry Month</p>
          )}
        </div>
        <div className="checkoutpage_info_exp_div">
          <p className="checkoutpage_info_txt"><FormattedMessage
                id="app.expYY"
                defaultMessage="payment Info"
              /></p>
          <input
            type="text"
            className="checkoutpage_payment_info_input"
            value={expYY}
            name="expYY" autoComplete="exp-year"

            onChange={handleExpiryChange}
          />
          {expiryError && <p className="feild_error_msg">{expiryError}</p>}


          {purchaseClick && !expYY && (
            <p className="feild_error_msg">Enter valid expiry year</p>
          )}
        </div>
      </div>
      <div className="checkoutpage_info_cvv_div">
        <p className="checkoutpage_info_txt"> <FormattedMessage
              id="app.cvvCode"
              defaultMessage="payment Info"
            /></p>
        <input
          type="text"
          className="checkoutpage_payment_info_input"
          value={cvvCode}
          onChange={handleCvvChange}
        />
        {cvvError && <p className="feild_error_msg">{cvvError}</p>}
        {purchaseClick && !cvvCode && (
          <p className="feild_error_msg">Enter valid CVV</p>
        )}
      </div>
      <div className="checkoutpage_info_checkbox_div">
        <input
          type="checkbox"
          checked={specialOffer}
          onChange={(event) =>
            dispatch(setSpecialOffer(event.target.checked))
          } // Use event.target.checked to get the checked state
        />
        <p className="checkoutpage_info_checkbox_txt">
        <FormattedMessage
              id="app.specialOffers"
              defaultMessage="special offers"
            />
        </p>
      </div>
      <div className="checkoutpage_info_checkbox_div">
        <input
          type="checkbox"
          checked={agreeToTerms}
          onChange={(event) =>
            dispatch(setAgreeToTerms(event.target.checked))
          }
        />

        <p
          className="checkoutpage_info_checkbox_txt terms_condition_txt"
          onClick={handleOpen}
        >
          <FormattedMessage
              id="app.termsAndPolicies"
              defaultMessage="Terms and policy"
            />
        </p>

        {purchaseClick && !agreeToTerms && (
          <p className="feild_error_msg">
            Please agree to terms and conditions
          </p>
        )}
        {showModal && (
          <Modal
            open={openModal}
            onClose={handleClose}
            center
            classNames={{ modal: "customstyle" }}
          >
            <TermsAndCondition />
          </Modal>
        )}
      </div>
      <div className="checkoutpage_info_price_div">
        <p className="checkout_page_price_txt"> <FormattedMessage
              id="app.totalDue"
              defaultMessage="Purchase"
            /> ${total.toFixed(2)}</p>
        <div className="checkout_info_purchase_div">
          <p className="checkout_info_purchase_txt">
          <FormattedMessage
                id="app.editBillingInfo"
                defaultMessage="Terms and policy"
              />
          </p>
          <button
            className="checkout_info_purchase_btn"
            onClick={handlePurchaseInfoBtnClick}
            disabled={loader}
          >
           <FormattedMessage
                id="app.purchase"
                defaultMessage="Purchase"
              />
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
