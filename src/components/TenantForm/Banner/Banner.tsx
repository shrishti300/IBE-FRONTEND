import { Fab } from "@mui/material";
import "./Banner.scss";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { addBannerlogo } from "../../../redux/slice/TenantPersonalSlice";
import { ChangeEvent } from "react";
import { FormattedMessage } from "react-intl";

export default function Banner() {
  const {bannerlogo} = useSelector((state : RootState) => state.tenantPersonalList);
  const dispatch = useDispatch<APPDispatch>();
  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    if(e.target.files)
      dispatch(addBannerlogo(e.target.files[0]));
  }

  return (
    <div className="banner" data-testid="banner">
      <p className="banner-txt"><FormattedMessage id="app.BannerImg" defaultMessage="Submit" /></p>
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo-banner"
          type="file"
          className="banner-input"
          data-testid="banner-input"
          onChange={handleChange}
        />
        <Fab
        style={{
            backgroundColor: "#26266d",
            color:"white", // Set background color to yellow
            width: "10rem", // Set width to 2rem
            borderRadius: "4px", // Set border radius to 0 for a square shape
          }}
         size="small"
          component="span"
          aria-label="add"
          variant="extended"
          className="input-fab"
        >
          <i className="fi fi-br-plus" style={{marginRight: '2px'}}></i><FormattedMessage id="app.uploadPhoto" defaultMessage="upload photo" />
        </Fab>
      </label>
      {bannerlogo ? <p>Image Uploaded!</p> : ''}

    </div>
  );
}
