import React, { useEffect, useRef, useState } from "react";
import "./Itinerary.scss";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../redux/store/store";
import {
  changeCheckoutStatus,
  setConfirmationFields,
} from "../../redux/slice/ItinerarySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import ProgressBar from "../RoomsPage/ProgressBar/ProgressBar";
import {
  calcAvg,
  convertDateFormat,
  countDates,
  countTotalPrice,
} from "../../utils/calculations/Calculations";
import Modal from "react-responsive-modal";
import PromoModal from "./PromoModal/PromoModal";
import TaxModal from "./TaxModal/TaxModal";
import { setTimeLeft } from "../../redux/slice/CheckoutSlice";

interface ICurrencyObj {
  [currency: string]: [string, number];
}

export default function Itinerary() {

  const { current, INR, EUR, GBP, USD } = useSelector(
    (state: RootState) => state.currencyList
  );
  const currencyObjMapper: ICurrencyObj = {
    USD: ["$", USD],
    INR: ["₹", INR],
    EUR: ["€", EUR],
    GBP: ["£", GBP],
  };
  const dispatch = useDispatch<APPDispatch>();

  const {
    promotion,
    resortFee,
    occupancyTax,
    roomType,
    minPriceHmap,
    dueNow,
    valid
  } = useSelector((state: RootState) => state.itineraryReducer);

  if(valid === false) window.location.href = '/'

  const { roomRates } = useSelector((state: RootState) => state.calenderList);
  const { timeLeft } = useSelector((state: RootState) => state.checkoutList);
  const timeLeftRef = useRef<number>(timeLeft);

  const {
    propertyName,
    startDate,
    endDate,
    kidCount,
    adultCount,
    teenCount,
    roomCount,
  } = useSelector((state: RootState) => state.bookingFormList);
  const [promoModal, setPromoModal] = useState(false);
  const [taxModal, setTaxModal] = useState(false);
  const [guestInfo, setGuestInfo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [resortFeeTotal, setResortFeeTotal] = useState(0);
  const [occupancyTaxTotal, setOccupancyTaxTotal] = useState(0);
  const [vatTotal, setVatTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [dueNowTotal, setDueNowTotal] = useState(0);
  const [dueAtResort, setDueAtResort] = useState(0);

  useEffect(() => {
    let tempGuestInfo =
      (adultCount > 0 ? `${adultCount} adults, ` : "") +
      (kidCount > 0 ? `${kidCount} kids, ` : "") +
      (teenCount > 0 ? `${teenCount} senior citizens, ` : "");
    tempGuestInfo = tempGuestInfo.substring(0, tempGuestInfo.length - 2);
    setGuestInfo(tempGuestInfo);
    const tempDisc =
      promotion.length > 0
        ? Number(
            (
              (1 - promotion[2]) *
              countTotalPrice(minPriceHmap[roomType]) *
              currencyObjMapper[current][1] *
              roomCount
            ).toFixed(2)
          )
        : 0;
    setDiscount(tempDisc);
    const tempSubTotal =
      countTotalPrice(minPriceHmap[roomType]) * roomCount - Number(tempDisc);
    setSubtotal(tempSubTotal);
    const tempResortFee = tempSubTotal * (resortFee / 100);
    setResortFeeTotal(tempResortFee);
    const tempOccupancyTax = tempSubTotal * (occupancyTax / 100);
    setOccupancyTaxTotal(tempOccupancyTax);
    const tempVat = tempSubTotal * 0.18;
    setVatTotal(tempVat);
    const tempTotal = tempSubTotal + tempResortFee + tempOccupancyTax + tempVat;
    setTotal(tempTotal);
    const tempDueNow = tempTotal * (dueNow / 100);
    setDueNowTotal(tempDueNow);
    const tempDueAtResort = tempTotal * ((100 - dueNow) / 100);
    setDueAtResort(tempDueAtResort);
    console.log(calcAvg(startDate, endDate, roomRates));
    dispatch(
      setConfirmationFields({
        guestInfo: tempGuestInfo,
        nightlyRate: calcAvg(startDate, endDate, roomRates),
        subtotal: tempSubTotal,
        taxes: tempResortFee + tempOccupancyTax,
        vat: tempVat,
        total: tempTotal,
      })
    );
  }, []);

  useEffect(() => {
    const timerID = setInterval(() => {
      timeLeftRef.current -= 1;
      dispatch(setTimeLeft(timeLeftRef.current));
      if (timeLeftRef.current == 0) {
        clearInterval(timerID);
        window.location.href = "/";
      }
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const handleItiRemove = () => {
    dispatch(changeCheckoutStatus(0));
    navigate("/");
  };

  const navigate = useNavigate();
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  const handleCheckoutBtn = () => {
    if (!isCheckoutPage) {
      navigate("/checkout");
    } else {
      navigate("/roomResults");
    }
  };

  const handlePromoModal = () => {
    setPromoModal((prev) => !prev);
  };
  const handleTaxModel = () => {
    setTaxModal((prev) => !prev);
  };

  return (
    <div className="itinerary-main">
      <div className="itinerary_sub_div">
        <div className="iti-heading">
          <FormattedMessage
            id="app.yourItinerary"
            defaultMessage="your itinerary"
          />
        </div>
        <div className="iti-title">
          <p>  <FormattedMessage
            id={`app.${propertyName}`}
            defaultMessage="your itinerary"
          /></p>
          <button className="iti-remove-btn" onClick={handleItiRemove}>
          <FormattedMessage
              id="app.remove"
              defaultMessage="remove"
            />
          </button>
        </div>
        <div className="date-and-guest-info">
          {startDate.substring(4, 10)} - {endDate.substring(4)} | {guestInfo}
        </div>
        <div className="iti-roomtype">
          <div className="iti-roomtype-name">{roomType}</div>
          <div className="iti-rooms">{roomCount} <FormattedMessage
              id="app.rooms"
              defaultMessage="rooms"
            /></div>
        </div>
        <div className="iti-date-price">
          {Object.keys(minPriceHmap[roomType]).map((date) => (
            <div className="iti-date-price-div" key={date}>
              <div className="iti-date">{convertDateFormat(date)}</div>
              <div className="iti-price">
                {currencyObjMapper[current][0]}
                {(
                  minPriceHmap[roomType][date] *
                  currencyObjMapper[current][1] *
                  roomCount
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        {promotion.length > 0 && (
          <div className="iti-special-promotion">
            <div className="iti-promo-info">
              <p>{promotion[0]}</p>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handlePromoModal}
              >
                <path
                  d="M7.00017 6.33301C6.82336 6.33301 6.65379 6.40325 6.52876 6.52827C6.40374 6.65329 6.3335 6.82286 6.3335 6.99967V9.66634C6.3335 9.84315 6.40374 10.0127 6.52876 10.1377C6.65379 10.2628 6.82336 10.333 7.00017 10.333C7.17698 10.333 7.34655 10.2628 7.47157 10.1377C7.59659 10.0127 7.66683 9.84315 7.66683 9.66634V6.99967C7.66683 6.82286 7.59659 6.65329 7.47157 6.52827C7.34655 6.40325 7.17698 6.33301 7.00017 6.33301ZM7.2535 3.71967C7.09119 3.653 6.90914 3.653 6.74683 3.71967C6.665 3.7514 6.59024 3.79898 6.52683 3.85967C6.46795 3.92448 6.42059 3.99888 6.38683 4.07967C6.34951 4.15879 6.33125 4.24556 6.3335 4.33301C6.33299 4.42075 6.34981 4.50772 6.38299 4.58895C6.41616 4.67017 6.46504 4.74405 6.52683 4.80634C6.59163 4.86523 6.66604 4.91258 6.74683 4.94634C6.84783 4.98783 6.95748 5.00389 7.06613 4.99308C7.17479 4.98228 7.27912 4.94496 7.36997 4.88439C7.46083 4.82382 7.53541 4.74186 7.58717 4.64572C7.63893 4.54958 7.66629 4.4422 7.66683 4.33301C7.66438 4.1565 7.59532 3.98743 7.4735 3.85967C7.4101 3.79898 7.33533 3.7514 7.2535 3.71967ZM7.00017 0.333008C5.68162 0.333008 4.39269 0.724001 3.29636 1.45654C2.20004 2.18909 1.34555 3.23028 0.840969 4.44845C0.336385 5.66663 0.204362 7.00707 0.461597 8.30028C0.718832 9.59348 1.35377 10.7814 2.28612 11.7137C3.21847 12.6461 4.40636 13.281 5.69956 13.5382C6.99277 13.7955 8.33322 13.6635 9.55139 13.1589C10.7696 12.6543 11.8108 11.7998 12.5433 10.7035C13.2758 9.60715 13.6668 8.31822 13.6668 6.99967C13.6668 6.1242 13.4944 5.25729 13.1594 4.44845C12.8243 3.63961 12.3333 2.90469 11.7142 2.28563C11.0952 1.66657 10.3602 1.17551 9.55139 0.840478C8.74255 0.505446 7.87565 0.333008 7.00017 0.333008ZM7.00017 12.333C5.94533 12.333 4.91419 12.0202 4.03712 11.4342C3.16006 10.8481 2.47648 10.0152 2.07281 9.04065C1.66914 8.06611 1.56352 6.99376 1.76931 5.95919C1.9751 4.92463 2.48305 3.97432 3.22893 3.22844C3.97481 2.48256 4.92512 1.97461 5.95968 1.76882C6.99425 1.56303 8.06661 1.66865 9.04114 2.07232C10.0157 2.47598 10.8486 3.15957 11.4347 4.03663C12.0207 4.9137 12.3335 5.94484 12.3335 6.99967C12.3335 8.41416 11.7716 9.77072 10.7714 10.7709C9.77121 11.7711 8.41465 12.333 7.00017 12.333Z"
                  fill="#858685"
                />
              </svg>
              {promoModal && (
                <Modal
                  open={promoModal}
                  onClose={handlePromoModal}
                  classNames={{
                    modal: "custom-promo-modal",
                  }}
                >
                  <PromoModal subtotal={subtotal} />
                </Modal>
              )}
            </div>
            <div className="iti-promo-price">
              - {currencyObjMapper[current][0]}
              {discount.toFixed(2)}
            </div>
          </div>
        )}
        <div className="iti-line"></div>
        <div className="iti-subtotal">
          <p>
            
            <FormattedMessage
              id="app.subtotal"
              defaultMessage="taxesSurchargesFees"
            />
          </p>
          <p>
            {currencyObjMapper[current][0]}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <div className="iti-taxes">
          <p>
            <FormattedMessage
              id="app.taxesSurchargesFees"
              defaultMessage="taxesSurchargesFees"
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleTaxModel}
            >
              <path
                d="M7.00017 6.33301C6.82336 6.33301 6.65379 6.40325 6.52876 6.52827C6.40374 6.65329 6.3335 6.82286 6.3335 6.99967V9.66634C6.3335 9.84315 6.40374 10.0127 6.52876 10.1377C6.65379 10.2628 6.82336 10.333 7.00017 10.333C7.17698 10.333 7.34655 10.2628 7.47157 10.1377C7.59659 10.0127 7.66683 9.84315 7.66683 9.66634V6.99967C7.66683 6.82286 7.59659 6.65329 7.47157 6.52827C7.34655 6.40325 7.17698 6.33301 7.00017 6.33301ZM7.2535 3.71967C7.09119 3.653 6.90914 3.653 6.74683 3.71967C6.665 3.7514 6.59024 3.79898 6.52683 3.85967C6.46795 3.92448 6.42059 3.99888 6.38683 4.07967C6.34951 4.15879 6.33125 4.24556 6.3335 4.33301C6.33299 4.42075 6.34981 4.50772 6.38299 4.58895C6.41616 4.67017 6.46504 4.74405 6.52683 4.80634C6.59163 4.86523 6.66604 4.91258 6.74683 4.94634C6.84783 4.98783 6.95748 5.00389 7.06613 4.99308C7.17479 4.98228 7.27912 4.94496 7.36997 4.88439C7.46083 4.82382 7.53541 4.74186 7.58717 4.64572C7.63893 4.54958 7.66629 4.4422 7.66683 4.33301C7.66438 4.1565 7.59532 3.98743 7.4735 3.85967C7.4101 3.79898 7.33533 3.7514 7.2535 3.71967ZM7.00017 0.333008C5.68162 0.333008 4.39269 0.724001 3.29636 1.45654C2.20004 2.18909 1.34555 3.23028 0.840969 4.44845C0.336385 5.66663 0.204362 7.00707 0.461597 8.30028C0.718832 9.59348 1.35377 10.7814 2.28612 11.7137C3.21847 12.6461 4.40636 13.281 5.69956 13.5382C6.99277 13.7955 8.33322 13.6635 9.55139 13.1589C10.7696 12.6543 11.8108 11.7998 12.5433 10.7035C13.2758 9.60715 13.6668 8.31822 13.6668 6.99967C13.6668 6.1242 13.4944 5.25729 13.1594 4.44845C12.8243 3.63961 12.3333 2.90469 11.7142 2.28563C11.0952 1.66657 10.3602 1.17551 9.55139 0.840478C8.74255 0.505446 7.87565 0.333008 7.00017 0.333008ZM7.00017 12.333C5.94533 12.333 4.91419 12.0202 4.03712 11.4342C3.16006 10.8481 2.47648 10.0152 2.07281 9.04065C1.66914 8.06611 1.56352 6.99376 1.76931 5.95919C1.9751 4.92463 2.48305 3.97432 3.22893 3.22844C3.97481 2.48256 4.92512 1.97461 5.95968 1.76882C6.99425 1.56303 8.06661 1.66865 9.04114 2.07232C10.0157 2.47598 10.8486 3.15957 11.4347 4.03663C12.0207 4.9137 12.3335 5.94484 12.3335 6.99967C12.3335 8.41416 11.7716 9.77072 10.7714 10.7709C9.77121 11.7711 8.41465 12.333 7.00017 12.333Z"
                fill="#858685"
              />
            </svg>
            {taxModal && (
              <Modal
                open={taxModal}
                onClose={handleTaxModel}
                classNames={{
                  modal: "custom-promo-modal",
                }}
              >
                <TaxModal
                  dueNowTotal={dueNowTotal}
                  dueAtResort={dueAtResort}
                  discount={promotion.length > 0 ? Number(promotion[2]) : 0}
                />
              </Modal>
            )}
          </p>
          <p>
            {currencyObjMapper[current][0]}
            {(
              (resortFeeTotal + occupancyTaxTotal) *
              currencyObjMapper[current][1]
            ).toFixed(2)}
          </p>
        </div>
        <div className="iti-vat">
          <p><FormattedMessage
              id="app.vat"
              defaultMessage="VAT"
            /></p>
          <p>
            {currencyObjMapper[current][0]}
            {(vatTotal * currencyObjMapper[current][1]).toFixed(2)}
          </p>
        </div>
        <div className="iti-line"></div>
        <div className="iti-due-now">
          <p>
            <FormattedMessage id="app.dueNow" defaultMessage="your itinerary" />
          </p>
          <p>
            {currencyObjMapper[current][0]}
            {(dueNowTotal * currencyObjMapper[current][1]).toFixed(2)}
          </p>
        </div>
        <div className="iti-due-at-resort">
          <p>
            <FormattedMessage
              id="app.dueResort"
              defaultMessage="your itinerary"
            />
          </p>
          <p>
            {currencyObjMapper[current][0]}
            {(dueAtResort * currencyObjMapper[current][1]).toFixed(2)}
          </p>
        </div>
        <div className="iti-checkout">
          <button className="iti-checkout-btn" onClick={handleCheckoutBtn}>
            {isCheckoutPage ?   <FormattedMessage
              id="app.exploreMore"
              defaultMessage="explore More"
            /> :   <FormattedMessage
            id="app.checkout"
            defaultMessage="checkout"
          />}
          </button>
        </div>
      </div>
    </div>
  );
}
