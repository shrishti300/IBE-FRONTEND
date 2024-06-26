import React from "react";
import "./SelectPackageCard.scss";
import { APPDispatch, RootState } from "../../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { IRoomTypePrice } from "../../../../utils/types/IProperty";
import {
  addPromotion,
  changeCheckoutStatus,
  setValid,
} from "../../../../redux/slice/ItinerarySlice";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../../../redux/slice/SnackbarSlice";
import {
  checkMinValidDays,
  checkValidLongWeekend,
  checkValidWeekend,
} from "../../../../utils/calculations/Calculations";
import { FormattedMessage } from "react-intl";


interface ICurrencyObj {
  [currency: string]: [string, number];
}

interface IRoomprice {
  roomType: IRoomTypePrice;
  promotionsImages: any[] | null;
}

export default function SelectPackageCard({
  roomType,
  promotionsImages,
}: Readonly<IRoomprice>) {
  const { current, INR, EUR, GBP, USD } = useSelector(
    (state: RootState) => state.currencyList
  );
  const { promotion } = useSelector(
    (state: RootState) => state.itineraryReducer
  );
  const { teenCount, startDate, endDate } = useSelector(
    (state: RootState) => state.bookingFormList
  );
  const dispatch = useDispatch<APPDispatch>();
  const navigate = useNavigate();

  const currencyObjMapper: ICurrencyObj = {
    USD: ["$", USD],
    INR: ["₹", INR],
    EUR: ["€", EUR],
    GBP: ["£", GBP],
  };

  const handlePromoSelect = () => {
    if (promotionsImages && !checkMinValidDays(startDate, endDate, promotionsImages[3])) {
      dispatch(showSnackbar({ type: 'fail', message: `Min days of stay should be ${promotionsImages[3]} for this promotion to apply!` })); return;
    }
    if (promotionsImages && promotionsImages[0] === "SENIOR_CITIZEN_DISCOUNT" && teenCount === 0) {
      dispatch(showSnackbar({ type: "fail", message: "No Senior Citizen Found in the current booking!" })); return;
    }
    if (
      promotionsImages &&
      promotionsImages[0] === "Weekend discount" &&
      checkValidWeekend(startDate, endDate)
    ) {
      dispatch(
        showSnackbar({
          type: "fail",
          message: "This code is valid only on weekends!",
        })
      );
      return;
    }
    if (
      promotionsImages &&
      promotionsImages[0] === "Long weekend discount" &&
      checkValidLongWeekend(startDate, endDate)
    ) {
      dispatch(
        showSnackbar({
          type: "fail",
          message: "This code is applicable only on long weekend!",
        })
      );
      return;
    }
    if (promotionsImages != null)
      dispatch(
        addPromotion(promotionsImages)
      );
    dispatch(changeCheckoutStatus(2));
    dispatch(setValid(true));
    navigate("/checkout");
  };


  return (
    <div className="selectpackagecard">
      <div className="selectpackagecard_left_div">
        <p className="selectpackagecard_txt">
          {promotionsImages !== null ? promotionsImages[0] : "Standard Rate"}
        </p>
        
        <p className="selectpackagecard_description">
          {promotionsImages !== null
            ?  promotionsImages[1]
            : <FormattedMessage
            id="app.DefaultPromoDesc"
            defaultMessage="Standard Rates"
          />}
        </p>

      </div>
      <div className="selectpackagecard_right_div">
        <div className="selectpackagecard_price_div">
          <p className="selectpackagecard_price">

            {currencyObjMapper[current][0]}
            {promotionsImages === null
              ? (roomType.price * currencyObjMapper[current][1]).toFixed(2)
              : (
                roomType.price *
                promotionsImages[2] *
                currencyObjMapper[current][1]
              ).toFixed(2)}
          </p>
          <p className="selectpackagecard_pernight_txt">
            <FormattedMessage
              id="app.perNight"
              defaultMessage="Standard Rates"
            />
          </p>
        </div>
        <div className="selectpackagecard_select_btn_div">
          <button
            className="selectpackagecard_select_btn"
            onClick={handlePromoSelect}
          >
            <FormattedMessage
              id="app.selectPackage"
              defaultMessage="selectPackage"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
