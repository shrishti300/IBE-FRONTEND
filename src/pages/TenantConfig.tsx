import { useDispatch, useSelector } from "react-redux";
import TenantForm from "../components/TenantForm/TenantForm";
import "./TenantConfig.scss";
import { changeFormState } from "../redux/slice/TenantConfigslice";
import { RootState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";
import Lang from "../components/Lang/Lang";
import Globe from "../assets/globe.svg";

export default function TenantConfig() {

  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.tenantFormList.formState);
  const navigate = useNavigate();
  const name = localStorage.getItem("tenant-name");

  const handlePropertyInfoClick = () => {
    dispatch(changeFormState("property-info"));
  };

  const handlePersonalInfoClick = () => {
    dispatch(changeFormState("personal-info"));
  };

  const handleRoomTypeConfigClick = () => {
    dispatch(changeFormState("roomtype-config"))
  }

  const handleSignout = () => {
    localStorage.removeItem("access-token");
    navigate('/tenantAuth');
  }


  return (
    <div className="tenant">
      <div className="tenant-heading">
        <p className="tenant-heading-txt"> Tenant Configuration ({name})</p>
        <div className="tenant-heading-navbar">
          <div className="nav-info-div language">
          <img src={Globe} className="nav-lang-img" alt="globe" />
          <Lang />
        </div>
        <button className="tenant-signout-btn" onClick={handleSignout}>Log Out</button>
        </div>
      </div>
      <div className="parent-div">
        <div className="child-div">
          <p className={`property-info-btn ${formState === "property-info" ? "selected" : ""}`} onClick={handlePropertyInfoClick}> Personal Config</p>
          <p className={`personal-info-btn ${formState === "personal-info" ? "selected" : ""}`} onClick={handlePersonalInfoClick}> Property Config</p>
          <p className={`roomtype-config-btn ${formState === "roomtype-config" ? "selected" : ""}`} onClick={handleRoomTypeConfigClick}> Room Config</p>
        </div>
        <TenantForm />
      </div>
      <div className="white-section">
        
      </div>

    </div>
  );
}
