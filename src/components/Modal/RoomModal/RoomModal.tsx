import React, { useEffect, useState } from "react";
import SelectPackageCard from "./SelectPackageCard/SelectPackageCard";
import User from "../../../assets/user.svg";
import Doublebed from "../../../assets/doublebed.svg";
import Verified from "../../../assets/verified.svg";
import Carousel from "../../RoomsPage/ListRooms/RoomCard/Carousel/CarouselCard";
import "./RoomModal.scss";
import {
  IPropertyDetailDTO,
  IRoomTypePrice,
} from "../../../utils/types/IProperty";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { FormattedMessage } from "react-intl";
import axios, { AxiosError } from "axios";
import LoaderDate from "../../Loader/LoaderDate";
import { showSnackbar } from "../../../redux/slice/SnackbarSlice";
import { addRoomType } from "../../../redux/slice/ItinerarySlice";
interface IRoomType2 {
  roomType: IRoomTypePrice;
  roomDetail: IPropertyDetailDTO;
  promotionsImages: any;
}

export default function RoomModal({
  roomType,
  roomDetail,
  promotionsImages,
}: IRoomType2) {
  const { open } = useSelector((state: RootState) => state.snackbar);
  const [newPromo, setNewPromo] = useState("");
  const [newPromotion, setNewPromotion] = useState<string[][]>([]);
  const [promotionsArr, setPromotionsArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch<APPDispatch>();

  const handlePromoChange = async () => {
    setLoader(true);
    try {
      const response = await axios.get(import.meta.env.VITE_CHECK_PROMO, {
        params: {
          promoCode: newPromo,
          roomType: roomType.roomTypeName,
        },
      });
      const {
        promotionTitle,
        promotionDescription,
        priceFactor,
        minDays,
        deactivated,
      } = response.data;
      const promotionTemp = [
        promotionTitle,
        promotionDescription,
        priceFactor,
        minDays,
        deactivated,
      ];
      let promoExists = false;

      newPromotion.map((promotion) => {
        if (promotion[0] === promotionTitle) {
          dispatch(
            showSnackbar({ type: "fail", message: "Promotion already added!" })
          );
          promoExists = true;
        }
      });

      if (!promoExists) {
        setNewPromotion([...newPromotion, promotionTemp]);
        setNewPromo("");
        dispatch(
          showSnackbar({
            type: "success",
            message: "Promotion added successfully!",
          })
        );
      }
    } catch (error: any) {
      console.log(error);
      dispatch(
        showSnackbar({ type: "fail", message: error.response.data.message })
      );
    }
    setLoader(false);
  };

  useEffect(() => {
    const promotions = promotionsImages.promotions;
    const temp = promotions.map((promotion: string) => {
      return promotion.split(",");
    });
    setPromotionsArr(temp);
    dispatch(addRoomType(roomType.roomTypeName));
  }, []);

  useEffect(() => {
    console.log(newPromotion);
  }, [newPromotion]);

  return (
    <div className="roomModal_main">
      <div className="roomModal">
        <div className="roomModal_carousel">
          <div className="roomModal_carousel_div">
            <Carousel
              promotionsImages={promotionsImages}
              carouselStyle="style2"
            />
          </div>
          <p className="roomModal_title">{roomType.roomTypeName}</p>
        </div>
        <div className="roomModal_div">
          <div className="roomModal_left_div">
            <div className="roomModal-amenitites-main-div">
              <div className="roomModal-amenities-left-div">
                <div className="roomModal_menubar">
                  <p className="roomModal_icon">
                    <img
                      src={User}
                      alt="SVG Icon"
                      style={{ marginRight: "2px", marginBottom: "2px" }}
                    />
                    <p className="roomModal_icon_p">
                      {
                        roomDetail.propertyRoomDTOList[roomType.roomTypeName]
                          .maxCapacity
                      }
                    </p>
                  </p>
                  <p className="roomModal_icon">
                    <img
                      src={Doublebed}
                      alt="SVG Icon"
                      style={{ marginRight: "2px", marginBottom: "2px" }}
                    />
                    <p className="roomModal_icon_p">
                      {
                        roomDetail.propertyRoomDTOList[roomType.roomTypeName]
                          .singleBed
                      }
                      <FormattedMessage
                        id="app.singleOr"
                        defaultMessage="Single or"
                      />
                      {
                        roomDetail.propertyRoomDTOList[roomType.roomTypeName]
                          .doubleBed
                      }
                      <FormattedMessage
                        id="app.double"
                        defaultMessage="Double"
                      />
                    </p>
                  </p>
                  <p className="roomModal_icon" style={{ marginRight: "3px" }}>
                    {
                      roomDetail.propertyRoomDTOList[roomType.roomTypeName]
                        .areaInSquareFeet
                    }
                    ft
                  </p>
                </div>
                <div className="roomModal_desc_div">
                  <p className="roomModal_desc">
                    <FormattedMessage
                    id={`app.${promotionsImages.description.split(' ').slice(0,2).join(" ")}`}
                    defaultMessage="amenities"
                  />


                  </p>
                </div>
              </div>
              <div className="roomModal_right_div">
                <p className="roomModal_amenities">
                  <FormattedMessage
                    id="app.amenities"
                    defaultMessage="amenities"
                  />
                </p>
                <div className="roomModal_amenities_div">
                  {promotionsImages.amenities.map((amenity: string) => {
                    return (
                      <p key={amenity} className="roomModal_amenity">
                        <img
                          src={Verified}
                          alt="SVG Icon"
                          className="verified_img"
                        />
                        <FormattedMessage
                          id={`app.${amenity}`}
                          defaultMessage="amenities"
                        />
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="roomModal_rate_div">
              <p className="roomModal_rate_txt">
                <FormattedMessage
                  id="app.standardRates"
                  defaultMessage="standard Rates"
                />
              </p>
              <div>
                <SelectPackageCard
                  roomType={roomType}
                  promotionsImages={null}
                />
              </div>
            </div>
            <div className="roomModal_deals_div">
              <p className="roomModal_deals_txt">
                <FormattedMessage
                  id="app.dealsPackages"
                  defaultMessage="Deals & Packages"
                />
              </p>
              <div className="roomModal_dealscard_div">
                {promotionsArr.map((promotions: any[]) => {
                  return (
                    promotions[4] === "false" && (
                      <SelectPackageCard
                        key={promotions[0]}
                        roomType={roomType}
                        promotionsImages={promotions}
                      />
                    )
                  );
                })}
                {newPromotion.map((promotions: any[]) => {
                  return (
                    promotions[4] === false && (
                      <SelectPackageCard
                        key={promotions[0]}
                        roomType={roomType}
                        promotionsImages={promotions}
                      />
                    )
                  );
                })}
              </div>
            </div>
            <div className="roomModal_promo_div">
              <p className="roomModal_promo_title">
                <FormattedMessage
                  id="app.enterPromoCode"
                  defaultMessage="Deals & Packages"
                />
              </p>
              <div className="roomModal_deals_input_div">
                <input
                  type="text"
                  className="roomModal_deals_input"
                  value={newPromo}
                  onChange={(e) => setNewPromo(e.target.value)}
                />
                <button
                  className="roomModal_deals_btn"
                  disabled={newPromo.length === 0}
                  onClick={handlePromoChange}
                >
                  {loader ? <LoaderDate /> :  <FormattedMessage
                  id="app.apply"
                  defaultMessage="APPLY"
                />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      div.
    </div>
  );
}
