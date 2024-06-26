import { Fab } from "@mui/material";
import "./HeaderLogo.scss";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { addHeaderlogo } from "../../../redux/slice/TenantPersonalSlice";
import { ChangeEvent } from "react";
import { FormattedMessage } from "react-intl";

export default function HeaderLogo() {
  const { headerlogo } = useSelector((state: RootState) => state.tenantPersonalList);
  const dispatch = useDispatch<APPDispatch>();
  const handleChangeHeader = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      dispatch(addHeaderlogo(e.target.files[0]));
  }
  return (
    <div className="headerlogo">
      <p className="headerlogo-txt">
      <FormattedMessage id="app.headerLogo" defaultMessage="headerLogo" />
      </p>
      <label htmlFor="upload-photo-header">
        <input
          style={{ display: "none" }}
          id="upload-photo-header"
          name="upload-photo-header"
          type="file"
          className="banner-input"
          onChange={handleChangeHeader}
        />
        <Fab
          style={{
            backgroundColor: "#26266d",
            color: "white", // Set background color to yellow
            width: "10rem", // Set width to 2rem
            borderRadius: "4px", // Set border radius to 0 for a square shape
          }}
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
          className="input-fab"
        >
          <i className="fi fi-br-plus" style={{ marginRight: '2px' }}></i> <FormattedMessage id="app.uploadPhoto" defaultMessage="upload photo" />
        </Fab>
      </label>
      {headerlogo ? <p>Image uploaded!!</p> : ''}

    </div>
  )
}
