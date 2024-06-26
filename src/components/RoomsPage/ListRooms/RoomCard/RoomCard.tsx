import React, { useEffect, useState } from "react";
import location from "../../../../assets/location.svg";
import User from "../../../../assets/user.svg";
import Doublebed from "../../../../assets/doublebed.svg";
import "./RoomCard.scss";
import SpecialDeal from "./SpecialDeal/SpecialDeal";
import NewProperty from "./NewProperty/NewProperty";
import Carousel from "./Carousel/CarouselCard.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormattedMessage } from "react-intl";
import {
  IPropertyDetailDTO,
  IRoomTypePrice,
} from "../../../../utils/types/IProperty.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store.tsx";
import axios from "axios";
import RoomModal from "../../../Modal/RoomModal/RoomModal.tsx";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import LocationModal from "../../../Modal/LocationModal/LocationModal.tsx";
import ReactCardFlip from "react-card-flip";


interface IRoomType2 {
  roomType: IRoomTypePrice ;
  roomDetail: IPropertyDetailDTO;
  promotionsImages: any;
}

interface ICurrencyObj {
  [currency: string]: [string, number];
}

export default function RoomCard({
  roomType,
  roomDetail,
  promotionsImages,
}: IRoomType2) {

  const [modalStyles, setModalStyles] = useState({
    modal: {
      width: '80.375rem',
      maxWidth: '1286px',
      padding: '0px',
      border: 'none',
    }
  });


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1380 && window.innerWidth > 1000) {
        setModalStyles({
          modal: {
            width: "60rem",
            maxWidth: "100%",
            padding: "0px",
            border: "none",
          },
        });
      }
      else if (window.innerWidth < 1000 && window.innerWidth > 722) {
        setModalStyles({
          modal: {
            width: "40rem",
            maxWidth: "100%",
            padding: "0px",
            border: "none",
          },
        });
      }
      else if (window.innerWidth < 723 && window.innerWidth >= 502) {
        setModalStyles({
          modal: {
            width: "30rem",
            maxWidth: "100%",
            padding: "0px",
            border: "none",
          },
        });
      }
      else if (window.innerWidth < 502 && window.innerWidth >= 429) {
        setModalStyles({
          modal: {
            width: "25rem",
            maxWidth: "100%",
            padding: "0px",
            border: "none",
          },
        });
      }
      else if (window.innerWidth < 429 && window.innerWidth > 380) {
        setModalStyles({
          modal: {
            width: "23rem",
            maxWidth: "100%", // Adjust maxWidth if needed
            padding: "0px",
            border: "none",
          },
        });
      }
      else {
        setModalStyles({
          modal: {
            width: "80.375rem",
            maxWidth: "1286px",
            padding: "0px",
            border: "none",
          },
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { current, INR, EUR, GBP, USD } = useSelector(
    (state: RootState) => state.currencyList
  );

  const currencyObjMapper: ICurrencyObj = {
    USD: ["$", USD],
    INR: ["₹", INR],
    EUR: ["€", EUR],
    GBP: ["£", GBP],
  };

  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const openModalClick = () => { };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setShowModal(true);
  };
  const handleClose = () => setOpen(false);

  const handleLocationClick = () => {
    setLocationOpen(true);
    setShowLocationModal(true);
  }

  const handleLocationClose = () => setLocationOpen(false);
  const [feedbacks,setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try{
      const response = await axios.get(import.meta.env.VITE_GET_FEEDBACKS,{
        params: {
          propertyName: "Team 4 Hotel",
          roomType: roomDetail.propertyRoomDTOList[roomType.roomTypeName].roomTypeName
        }
      })
      console.log(response.data)
      setFeedbacks(response.data);
    }catch(error){
      console.log(error);
    }
  }


  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}
    >
      <div className="room_card" style={{ display: isFlipped === true ? "none" : "block" }}>
        <div>
          <Carousel promotionsImages={promotionsImages} carouselStyle="style1" />
        </div>
        <div className="room_content">
          <div className="room_content_heading">
            <div className="room_name_div">
              <p className="room_name_txt">{roomType.roomTypeName}</p>
            </div>
            <div className="room_rating_div">
              <p className="room_rating_txt" onClick={() => {setIsFlipped(!isFlipped); fetchFeedbacks();}}>
                <NewProperty ratings={promotionsImages?.ratings} usersRated={promotionsImages?.usersRated} />
              </p>
            </div>
          </div>
          <div className="room_address_div" onClick={handleLocationClick}>
            <div className="room_address_symbol">
              <img src={location} alt="SVG Icon" />
            </div>
            <p className="room_address_txt">{roomDetail.propertyAddress}</p>
          </div>

          {showLocationModal && (
            <div className="roompage_roomModal customstyle">
              <Modal
                open={locationOpen}
                onClose={handleLocationClose}
                center
                classNames={{ modal: "customstyle" }}
                styles={modalStyles}
              >
                <LocationModal />
              </Modal>
            </div>
          )}

          <div className="room_inclusive_div">
            <p className="room_inclusive_txt">
              <FormattedMessage id="app.inclusive" defaultMessage="Login" />
            </p>
            <p className="room_area_txt">
              {
                roomDetail.propertyRoomDTOList[roomType.roomTypeName]
                  .areaInSquareFeet
              }
              ft
            </p>
          </div>
          <div className="room_occupancy_div">
            <div className="room_user_symbol">
              <img src={User} alt="SVG Icon" />
            </div>
            <p className="room_user_txt">
              {roomDetail.propertyRoomDTOList[roomType.roomTypeName].maxCapacity}
            </p>
          </div>
          <div className="room_bed_div">
            <div className="room_bed_symbol">
              <img src={Doublebed} alt="SVG Icon" />
            </div>
            <p className="room_bed_txt">
              {roomDetail.propertyRoomDTOList[roomType.roomTypeName].singleBed}{" "}
              <FormattedMessage id="app.singleOr" defaultMessage="Single + " />{" "}
              {roomDetail.propertyRoomDTOList[roomType.roomTypeName].doubleBed}{" "}
              <FormattedMessage id="app.double" defaultMessage="Double" />
            </p>
          </div>
        </div>

        <SpecialDeal promotionsImages={promotionsImages} />

        <div className="room_deal_div">
          <div className="room_price_div">
            <p className="room_price">
              {currencyObjMapper[current][0]}
              {(roomType.price * currencyObjMapper[current][1]).toFixed(2)}
            </p>
            <p className="room_price_txt">
              <FormattedMessage id="app.perNight" defaultMessage="per Night" />
            </p>
          </div>
          <button className="room_select_button" onClick={handleOpen}>
            <FormattedMessage id="app.selectRoom" defaultMessage="Select Room" />
          </button>
        </div>

        {showModal && (
          <div className="roompage_roomModal customstyle">
            <Modal
              open={open}
              onClose={handleClose}
              center
              classNames={{ modal: "customstyle" }}
              styles={modalStyles}
            >
              <RoomModal
                roomType={roomType}
                roomDetail={roomDetail}
                promotionsImages={promotionsImages}
              />
            </Modal>
          </div>
        )}
      </div>
      <div className="room_card" style={{ display: isFlipped === true ? "block" : "none" }}>
        <div className="roomType-feedback-heading">{roomDetail.propertyRoomDTOList[roomType.roomTypeName].roomTypeName}</div>
        <div className="feedback-card">
          <div className="feedback-card-heading">RATINGS</div>
          <div className="feedback-card-rating">
            <p style={{display: 'flex', alignItems: 'center'}}>
              <svg width="18" height="18" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.01629 3.47706L5.60002 0.333008L7.18375 3.47706L10.8791 4.00106L8.23957 6.62111L8.76748 10.2892L5.60002 8.71714C4.72017 9.24115 2.85489 9.86995 2.43256 10.2892C2.01023 10.7084 2.60853 8.01846 2.96047 6.62111L0.320923 4.00106L4.01629 3.47706Z" fill="#26266D" />
              </svg>
              <span style={{ marginLeft: '5px', color: promotionsImages?.ratings > 3 ? 'green' : 'red', fontWeight: 'bold'  }}>{promotionsImages?.ratings.toFixed(2)}</span>
            </p>
            <p>
              <span style={{fontWeight: 'bold'}}>{promotionsImages?.usersRated}</span> <span>reviews</span>
            </p>
          </div>
          <div className="feedback-card-feedbacks">
            <div className="feedback-heading">FEEDBACKS</div>
            <div className="feedbacks-list">
              {
                feedbacks.length === 0 ? <ul style={{display: 'flex', justifyContent: 'center'}}>No Feedbacks Available!</ul> : feedbacks.map((feedback,idx) => {
                  return <p key={idx} className="feedback-item">{feedback}</p>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
}