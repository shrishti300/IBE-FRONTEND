import React, { useEffect, useRef, useState } from "react";
import Itinerary from "../components/Checkout/Itinerary";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../redux/store/store";
import Snackbar from "../components/Snackbar/Snackbar";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/RoomsPage/ProgressBar/ProgressBar";
import { changeCheckoutStatus } from "../redux/slice/ItinerarySlice";
import Modal from "react-responsive-modal";
import Timer from "../components/Checkout/TImer/Timer";
import Loader from "../components/Loader/Loader";
import { AuthUser } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { FormattedMessage } from "react-intl";
import BillingInfo from "../components/CheckoutComponent/BillingInfo";
import PaymentInfoComponent from "../components/CheckoutComponent/PaymentInfoComponent";
import TravellerInfo from "../components/CheckoutComponent/TravellerInfo";

export default function Checkout() {

  window.addEventListener('popstate', function (event) {
    console.log(this.window.location.pathname)
    if (window.location.pathname.startsWith('/checkout')) {
      window.location.href = "/";
    }
  });

  const { user }: { user: AuthUser; signOut: () => void } = useAuthenticator((context) => [context.user]);


  const { open } = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch<APPDispatch>();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const [showBillingClick, setShowBillingClick] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showPaymentClick, setShowPaymentClick] = useState(false);
  const [purchaseClick, setPurchaseClick] = useState(false);

  useEffect(() => {

    dispatch(changeCheckoutStatus(2));
  }, []);


  const [showItenaryModal, setshowItenaryModa] = useState(false);

  const openItiModalClick = () => { };

  const [openIti, setOpenIti] = React.useState(false);
  const handleOpenIti = () => {
    setOpenIti(true);
    setshowItenaryModa(true);
  };
  const handleCloseIti = () => setOpenIti(false);


  return (
    <>
      {
        loader && <Loader />
      }
      <div>
        <div>
          <ProgressBar />
          <Timer />
        </div>
        <div className="checkoutpage_itenarary_modal_div">
          <p className="checkoutpage_itenarary_modal_txt" onClick={handleOpenIti}>Check Itinerary</p>
        </div>
        {showItenaryModal && (
          <div>
            <Modal
              open={openIti}
              onClose={handleCloseIti}
              center>
              <Itinerary />
            </Modal>
          </div>
        )}
        <div className="checkoutpage_main_div">
          <div className="checkoutpage_left_div">
            <p className="checkoutpage_heading"><FormattedMessage
              id="app.paymentInfo"
              defaultMessage="payment Info"
            /></p>

            <TravellerInfo showBillingClick={showBillingClick} showBillingInfo={showBillingInfo} setShowBillingInfo={setShowBillingInfo} setShowBillingClick={setShowBillingClick} />

            <BillingInfo showPaymentInfo={showPaymentInfo} showBillingInfo={showBillingInfo} showPaymentClick={showPaymentClick} setShowPaymentInfo={setShowPaymentInfo} setShowPaymentClick={setShowPaymentClick} />

            <PaymentInfoComponent user={user} loader={loader} setLoader={setLoader} showPaymentInfo={showPaymentInfo} purchaseClick={purchaseClick} />

          </div>
          <div className="checkout-page">
            {open && <Snackbar />}
            <Itinerary />

            <div className="needhelp_div">
              <p className="needhelp_title"><FormattedMessage id="app.needHelp" defaultMessage="need help" /></p>
              <p className="needhelp_call"><FormattedMessage id="app.call" defaultMessage="need help" />   123456789</p>
              <p className="needhelp_time"> <FormattedMessage id="app.monFri" defaultMessage="need help" /> 8a-5p EST</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
