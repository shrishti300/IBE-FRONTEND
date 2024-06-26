import React, { useEffect, useRef, useState } from "react";
import "./Reservations.scss";
import Up from "../assets/up.svg";
import Down from "../assets/down.svg";
import { useReactToPrint } from "react-to-print";
import Modal from "react-responsive-modal";
import OTPModal from "../components/Modal/OTPModal/OTPModal";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../redux/store/store";
import { AuthUser } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import CancelConfirmModal from "../components/Modal/CancelConfirmModal/CancelConfirmModal";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Booking } from "../utils/types/IProperty";
import Loader from "../components/Loader/Loader";
import User from "./../assets/user.svg";
import { showSnackbar } from "../redux/slice/SnackbarSlice";
import Snackbar from "../components/Snackbar/Snackbar";
import { error } from "console";
import { FormattedMessage } from "react-intl";
import RoomSummary from "../components/ReservationComponent/RoomSummary";
import GuestSummary from "../components/ReservationComponent/GuestSummary";
import BillingSummary from "../components/ReservationComponent/BillingSummary";
import PaymentSummary from "../components/ReservationComponent/PaymentSummary";

export default function Reservations() {
  const navigate = useNavigate();

  window.onpopstate = () => {
    window.location.href = "/";
  };

  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [reservationData, setReservationData] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      setLoader(true);
      const response = await axios.get(import.meta.env.VITE_FETCH_TRANSACTION, {
        params: {
          bookingId: id,
        },
      });
      console.log(response.data);
      setReservationData(response.data);
      setLoader(false);
    };

    fetchReservation();
  }, []);
  const [showRoomSummary, setShowRoomSummary] = useState(false);
  const [showGuestSummary, setShowGuestSummary] = useState(false);
  const [showBillingSummary, setShowBillingSUmmary] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const { user }: { user: AuthUser; signOut: () => void } = useAuthenticator(
    (context) => [context.user]
  );
  const dispatch = useDispatch<APPDispatch>();
  const { open } = useSelector((state: RootState) => state.snackbar);

  const downloadPDF = async () => {
    setShowBillingSUmmary(true);
    setShowGuestSummary(true);
    setShowPaymentSummary(true);
    setShowRoomSummary(true);

    await new Promise((resolve) => setTimeout(resolve, 100));
    handlePrint();
  };

  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [openM, setOpenM] = React.useState(false);
  const [openOTP, setOpenOtp] = useState(false);
  const [count, setCount] = useState(0);

  const handleClose = () => setOpenM(false);
  const handleOTPClose = () => setOpenOtp(false);
  const handleShowModal = () => {
    setOpenM(true);
    setShowModal(true);
  };
  const handleShowOTPModal = () => {
    setOpenOtp(true);
    setShowOtpModal(true);
  };
  const [modalStyles, setModalStyles] = useState({
    modal: {
      maxWidth: "32rem",
      padding: "2rem",
      border: "none",
    },
  });

  const formatPromotion = (priceFactor: number) => {
    return (1 - priceFactor) * 100;
  };

  const formatDate = (date: string | undefined, no: number) => {
    if (date === undefined) return "";
    const dateobj = new Date(date);
    const formattedDate = dateobj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const dateArr = formattedDate.split(" ");
    if (dateArr.length === 0) return "";
    else if (no === 1) return dateArr[0] + " " + dateArr[2];
    else return dateArr[1].substring(0, dateArr[2].length - 2);
  };

  

  interface ICurrencyObj {
    [currency: string]: [string, number];
  }

  const { current, INR, EUR, GBP, USD } = useSelector(
    (state: RootState) => state.currencyList
  );
  const currencyObjMapper: ICurrencyObj = {
    USD: ["$", USD],
    INR: ["₹", INR],
    EUR: ["€", EUR],
    GBP: ["£", GBP],
  };

  const handleChanges = () => {
    if (reservationData) {
      setReservationData({ ...reservationData, cancelled: true });
    }
  };

  const handleCancel = async () => {
    setLoader(true);
    try {
      axios
        .post(import.meta.env.VITE_CANCEL_BOOKING, {
          bookingId: reservationData?.bookingId,
          bookingId2: reservationData?.bookingId2,
          roomType: reservationData?.roomType,
          email: reservationData?.email,
          firstName: reservationData?.firstName,
          id: reservationData?.bookingId,
          startDate: reservationData?.startDate,
          endDate: reservationData?.endDate,
          price: reservationData?.total,
        })
        .then((response) => {
          dispatch(
            showSnackbar({
              type: "success",
              message: "Booking cancelled successfully!",
            })
          );
          handleChanges();
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            showSnackbar({ type: "fail", message: "Error cancelling booking" })
          );
        });
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const handleConfirmEmail = () => {
    setLoader(true);
    axios
      .post(import.meta.env.VITE_SEND_CONFIRMATION_MAIL, {
        roomType: reservationData?.roomType,
        email: reservationData?.email,
        firstName: reservationData?.firstName,
        id: id,
        startDate: reservationData?.startDate,
        endDate: reservationData?.endDate,
        price: reservationData?.total,
      })
      .then(() => {
        dispatch(
          showSnackbar({ type: "success", message: "Mail sent successfully" })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(showSnackbar({ type: "fail", message: "Error sending mail" }));
      });
    setLoader(false);
  };

  useEffect(() => {
    if(reservationData !== null && count === 0){
      handleConfirmEmail();
      setCount(1);
    }
  },[reservationData])
  return (
    <>
      {loader && <Loader />}
      {open && <Snackbar />}
      <div className="reservation_main" ref={pdfRef}>
        <p className="reservation_kdu_title"> Kickdrum</p>

        <div className="reservation_head">
          <p className="reservation_head_txt">
            {" "}
            {reservationData?.cancelled === true ? (
              <span style={{ color: "red" }}>
                <FormattedMessage
                  id="app.cancelledBooking"
                  defaultMessage="cancelled booking"
                />{" "}
              </span>
            ) : (
              <span style={{ color: "green" }}>
                <FormattedMessage
                  id="app.upcomingReservation"
                  defaultMessage="upcoming Booking"
                />{" "}
              </span>
            )}{" "}
            #{reservationData?.bookingId}{" "}
          </p>
          <div className="reservation_head_share">
            <p className="reservation_head_share_txt" onClick={downloadPDF}>
              <FormattedMessage id="app.print" defaultMessage="print" />
            </p>
            <p
              className="reservation_head_share_txt   reservation_email_txt"
              onClick={handleConfirmEmail}
            >
              <FormattedMessage id="app.email" defaultMessage="email" />
            </p>
          </div>
        </div>

        <div className="reservation_main_div">
          <div className="reservation_first_section_div">
            <div className="reservation_first_section_title">
              <div className="reservation_first_section_menu">
                <p className="reservation_first_section_head">
                  <FormattedMessage id="app.room" defaultMessage="room" />{" "}
                  {reservationData?.roomCount}:{reservationData?.roomType}
                </p>
                <p className="reservation_first_section_adult_txt">
                  <img src={User} alt="user" /> {reservationData?.guestInfo}
                </p>
              </div>
              <div>
                {reservationData?.cancelled === false && (
                  <p
                    className="reservation_first_section_cancel_txt"
                    onClick={handleShowModal}
                  >
                    <FormattedMessage id="app.cancel" defaultMessage="cancel" />{" "}
                    <FormattedMessage id="app.room" defaultMessage="room" />
                  </p>
                )}
              </div>
            </div>
            <div className="reservation_first_section_data">
              <img
                src={reservationData?.image}
                className="reservation_room_img"
                alt="room-type-image"
              />
              <div className="reservation_first_section_right">
                <div className="reservation_first_section_date_container">
                  <div className="reservation_first_section_date_div">
                    <p className="reservation_first_section_checkin_txt">
                      <FormattedMessage
                        id="app.checkin"
                        defaultMessage="check in"
                      />
                    </p>
                    <p className="reservation_first_section_date_txt">
                      {formatDate(reservationData?.startDate, 0)}{" "}
                    </p>
                    <p className="reservation_first_section_date_txt">
                      {formatDate(reservationData?.startDate, 1)}
                    </p>
                  </div>
                  <div className="reservation_first_section_date_div">
                    <p className="reservation_first_section_checkin_txt">
                      <FormattedMessage
                        id="app.checkout"
                        defaultMessage="room"
                      />
                    </p>
                    <p className="reservation_first_section_date_txt">
                      {formatDate(reservationData?.endDate, 0)}
                    </p>
                    <p className="reservation_first_section_date_txt">
                      {formatDate(reservationData?.endDate, 1)}
                    </p>
                  </div>
                </div>
                <p className="reservation_first_section_pack_txt">
                  {reservationData?.promotion.length > 0
                    ? `${formatPromotion(
                        Number(reservationData?.promotion[2])
                      ).toFixed(2)}% Discount using ${
                        reservationData?.promotion[0]
                      }`
                    : "Standard Rate"}
                </p>
                <p className="reservation_first_section_pack_detail_txt">
                  {reservationData?.promotion.length > 0
                    ? reservationData?.promotion[1]
                    : "Enjoy Your Stay!"}
                </p>
                <p className="reservation_first_section_pricepernight_txt">
                  ${reservationData?.nightlyRate.toFixed(2)}/
                  <FormattedMessage
                    id="app.nightTotal"
                    defaultMessage="night Total"
                  />
                </p>
              </div>
            </div>
            <div className="reservation_first_section_total_price_div"></div>
          </div>

          <RoomSummary
            reservationData={reservationData}
            showRoomSummary={showRoomSummary}
            setShowRoomSummary={setShowRoomSummary}
          />
          <GuestSummary
            reservationData={reservationData}
            showGuestSummary={showGuestSummary}
            setShowGuestSummary={setShowGuestSummary}
          />
          <BillingSummary
            reservationData={reservationData}
            showBillingSummary={showBillingSummary}
            setShowBillingSUmmary={setShowBillingSUmmary}
          />
          <PaymentSummary
            reservationData={reservationData}
            showPaymentSummary={showPaymentSummary}
            setShowPaymentSummary={setShowPaymentSummary}
          />
        </div>
        {showModal && (
          <div className="roompage_roomModal customstyle">
            <Modal
              open={openM}
              onClose={handleClose}
              center
              classNames={{ modal: "customstyle" }}
              styles={modalStyles}
            >
              <CancelConfirmModal
                handleClose={handleClose}
                handleShowOTPModal={handleShowOTPModal}
                user={user}
                handleCancel={handleCancel}
                email={reservationData.email}
                bookingId={reservationData.bookingId}
                loader={loader}
              />
            </Modal>
          </div>
        )}
        {showOtpModal && (
          <div className="roompage_roomModal customstyle">
            <Modal
              open={openOTP}
              onClose={handleOTPClose}
              center
              classNames={{ modal: "customstyle" }}
              styles={modalStyles}
            >
              <OTPModal
                handleCancel={handleCancel}
                handleOTPClose={handleOTPClose}
                email={reservationData.email!}
                bookingId={reservationData.bookingId}
                handleChanges={handleChanges}
                bookingId2={reservationData.bookingId2}
                setLoader={setLoader}
                loader={loader}
              />
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}
