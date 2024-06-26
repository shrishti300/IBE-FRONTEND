import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import MaximumDays from "./Days/MaximumDays";
import MaximumGuests from "./Guests/MaximumGuests";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import PercentPayable from "./PercentPayable/PercentPayable";
import Taxes from "./Taxes/Taxes";
import Title from "./Title/Title";
import "./TenantForm.scss";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../redux/store/store";
import PropertyName from "../BookingForm/PropertyName/PropertyName";
import axios from "axios";
import { showSnackbar } from "../../redux/slice/SnackbarSlice";
import Snackbar from "../Snackbar/Snackbar";
import Loader from "../Loader/Loader";
import WheelChair from "./WheelChair/WheelChair";
import Kids from "./Kids/Kids";
import Teens from "./Teens/Teens";
import RoomType from "./RoomType/RoomType";
import PromotionsConfig from "./PromotionsConfig/PromotionsConfig";
import CarouselConfig from "./CarouselConfig/CarouselConfig";
import FiltersConfig from "./FiltersConfig/FiltersConfig";
import SortConfig from "./SortConfig/SortConfig";
import PromoCodeConfig from "./PromoCodeConfig/PromoCodeConfig";
import DisablePromoCodeConfig from "./PromoCodeConfig/DisablePromoCodeConfig";
import Down from "../../assets/down.svg";
import Up from "../../assets/up.svg";
import AmenitiesConfig from "./AmenitiesConfig/AmenitiesConfig";
import PropertyDescription from "./PropertyDescription/PropertyDescription";

interface TenantFormProps { }

const TenantForm: React.FC<TenantFormProps> = () => {
  const formState = useSelector((state: RootState) => state.tenantFormList.formState);
  const { propertyName } = useSelector((state: RootState) => state.bookingFormList);
  const { maxDays, maxGuests, percentagePayable, taxPercent, wheelChair, kids, teens, filters, sort, resortFee } = useSelector((state: RootState) => state.tenantPropertyList);
  const { title, headerlogo, bannerlogo, promoMinDays, promoTitle, promoDescription, promoPriceFactor, promotionsStr, showInModal } = useSelector((state: RootState) => state.tenantPersonalList)
  const dispatch = useDispatch<APPDispatch>();
  const { open } = useSelector((state: RootState) => state.snackbar);
  const { bannerImages, promotions, roomType, amenities, description } = useSelector((state: RootState) => state.tenantRoomList);
  const tenantID = 1;
  const [loader, setLoader] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<boolean[]>(Array(3).fill(false));
  const [iconDirections, setIconDirections] = useState<string[]>(Array(3).fill("down"));

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
    setIconDirections((prevDirections) =>
      prevDirections.map((direction, i) =>
        i === index ? (direction === "down" ? "up" : "down") : direction
      )
    );
  };

  const handleSubmit = () => {
    if (formState === "personal-info") {
      setLoader(true);
      axios.post(import.meta.env.VITE_UPDATE_TENANT_PROPERTY_API, { propertyName, maxDays, maxGuests, percentagePayable, taxPercent, resortFee, wheelChair, kids, teens, tenantId: 1, filters, sort })
        .then(() => {
          dispatch(showSnackbar({ type: "success", message: "Configurations updated successfully!" }));
        })
        .catch(() => {
          dispatch(showSnackbar({ type: "fail", message: "Error posting configurations!" }));
        }).finally(() => {
          setLoader(false);
        })
    }
    else if (formState === "roomtype-config") {
      const formData = new FormData();
      formData.append('tenantID', tenantID.toString());
      formData.append('propertyName', propertyName);
      bannerImages.forEach((file) => {
        formData.append('bannerImages', file);
      });
      formData.append('promotions', JSON.stringify(promotions));
      formData.append('roomType', roomType);
      formData.append('amenities', JSON.stringify(amenities));
      formData.append('description', description);

      setLoader(true);

      axios.post(import.meta.env.VITE_UPDATE_TENANT_ROOMS_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          dispatch(showSnackbar({ type: "success", message: "Configurations updated successfully!" }));
        })
        .catch((error) => {
          console.log(error);
          dispatch(showSnackbar({ type: "fail", message: "Error posting configurations!" }));
        }).finally(() => {
          setLoader(false);
        })
    }
    else {
      if (dropdownStates[0]) {
        if (headerlogo && bannerlogo) {
          const formData = new FormData();
          formData.append('tenantID', tenantID.toString());
          formData.append('title', title);
          formData.append('headerlogo', headerlogo);
          formData.append('bannerlogo', bannerlogo);

          setLoader(true);

          axios.post(import.meta.env.VITE_UPDATE_TENANT_PERSONAL_API, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(() => {
              dispatch(showSnackbar({ type: "success", message: "Configurations updated successfully!" }));
            })
            .catch(() => {
              dispatch(showSnackbar({ type: "fail", message: "Error posting configurations!" }));
            }).finally(() => {
              setLoader(false);
            })
        }
      }

      else if (dropdownStates[1]) {
        setLoader(true);
        axios.post(import.meta.env.VITE_ADD_PROMO_API, { promotionTitle: promoTitle, promotionID: 1, priceFactor: promoPriceFactor, promotionDescription: promoDescription, minDays: promoMinDays, isDeactivated: false }, {
          params: {
            propertyName: propertyName,
            roomType: roomType,
            showInModal: showInModal
          }
        }).then(() => {
          dispatch(showSnackbar({ type: 'success', message: 'Promotion added successfully!' }));
        }).catch((error) => {
          console.log(error);
          dispatch(showSnackbar({ type: 'fail', message: 'Error adding promotion!' }));
        }).finally(() => {
          setLoader(false);
        })
      }

      else {
        setLoader(true);
        axios.post(import.meta.env.VITE_UPDATE_PROMOTIONS, { propertyName, roomType, promotionsStr }, {
        }).then(() => {
          dispatch(showSnackbar({ type: 'success', message: 'Updated Promotions Successfully!' }));
        }).catch((error) => {
          console.log(error);
          dispatch(showSnackbar({ type: 'fail', message: 'Error updating promotions' }));
        });
        setLoader(false);
      }
    }
  }

  return (
    <>
      {
        loader === true ? <Loader /> : ''
      }
      <div className="tenant-div">
        {formState === "property-info" && (
          <>
            {open ? <Snackbar /> : ''}
            <div className="property-info">
              <div className="personal-dropdown-config" onClick={() => toggleDropdown(0)} >
                <span style={{ fontWeight: "bold", fontSize: '18px', paddingRight: '8px' }}>   <FormattedMessage id="app.updatePersonalDetails" defaultMessage="Submit" /></span>
                <img
                  src={iconDirections[0] === "down" ? Down : Up}
                  className="dropdown-img"
                />
              </div>
              {
                dropdownStates[0] === true &&
                <div className="personal-dropdown-option">
                  <Title />
                  <HeaderLogo />
                  <Banner />
                  <div className="tenant-btn-div">
                    <button type="submit" className="tenant-submit-btn" disabled={title.length === 0 || headerlogo === undefined || bannerlogo === undefined} onClick={handleSubmit}>
                      <FormattedMessage id="app.submit" defaultMessage="Submit" />
                    </button>
                  </div>
                </div>
              }
              <div className="personal-dropdown-config" onClick={() => toggleDropdown(1)}>
                <span style={{ fontWeight: "bold", fontSize: '18px', paddingRight: '8px' }}><FormattedMessage id="app.addPromoCode" defaultMessage="configPromoCodes" /> </span>
                <img
                  src={iconDirections[1] === "down" ? Down : Up}
                  className="dropdown-img"
                />
              </div>
              {
                dropdownStates[1] === true &&
                <div className="personal-dropdown-option">
                  <PromoCodeConfig />
                  <div className="tenant-btn-div">
                    <button type="submit" className="tenant-submit-btn" disabled={promoTitle.length === 0 || promoDescription.length === 0 || propertyName.length === 0} onClick={handleSubmit}>
                    <FormattedMessage id="app.submit" defaultMessage="submit" />
                    </button>
                  </div>
                </div>
              }
              <div className="personal-dropdown-config" onClick={() => toggleDropdown(2)}>
                <span style={{ fontWeight: "bold", fontSize: '18px', paddingRight: '8px' }}><FormattedMessage id="app.configPromoCodes" defaultMessage="configPromoCodes" /></span>
                <img
                  src={iconDirections[2] === "down" ? Down : Up}
                  className="dropdown-img"
                />
              </div>
              {
                dropdownStates[2] === true &&
                <div className="personal-dropdown-option">
                  <DisablePromoCodeConfig />
                  <div className="tenant-btn-div">
                    <button type="submit" className="tenant-submit-btn" disabled={propertyName.length === 0 || roomType.length === 0} onClick={handleSubmit}>
                      <FormattedMessage id="app.submit" defaultMessage="Submit" />
                    </button>
                  </div>
                </div>
              }

            </div>
          </>
        )}

        {formState === "personal-info" && (
          <>
            {open ? <Snackbar /> : ''}
            <div className="personal-info">
              <PropertyName />
              <div className="days-guest-div">
                <MaximumDays />
                <MaximumGuests />
              </div>
              <div className="days-guest-div">
                <PercentPayable />
                <Taxes />
              </div>
              <FiltersConfig />
              <SortConfig />

              <WheelChair />
              <Kids />
              <Teens />

            </div>
            <div className="tenant-btn-div">
              <button type="submit" className="tenant-submit-btn" disabled={propertyName.length === 0} onClick={handleSubmit}>
                <FormattedMessage id="app.submit" defaultMessage="Submit" />
              </button>
            </div>
          </>
        )}
        {formState === "roomtype-config" && (
          <>
            {open ? <Snackbar /> : ''}
            <div className="personal-info">
              <PropertyName />
              <div className="days-guest-div">
                <RoomType />
              </div>
              <AmenitiesConfig />
              <PropertyDescription />
              <PromotionsConfig />
              <CarouselConfig />

            </div>
            <div className="tenant-btn-div">
              <button type="submit" className="tenant-submit-btn" disabled={propertyName.length === 0 || roomType.length === 0} onClick={handleSubmit}>
                <FormattedMessage id="app.submit" defaultMessage="Submit" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TenantForm;
