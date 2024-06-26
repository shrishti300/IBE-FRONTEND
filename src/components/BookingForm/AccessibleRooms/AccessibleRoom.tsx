import { useDispatch, useSelector } from "react-redux";
import wheelchair from "../../../assets/wheelchair.svg";
import "./AccessibleRoom.scss";
import { FormattedMessage } from "react-intl";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { useState } from "react";

export default function AccessibleRoom() {
 const {wheelChair} = useSelector((state : RootState) => state.tenantPropertyList);
 const [checked,setChecked] = useState(false);
 const { propertyName } = useSelector(
  (state: RootState) => state.bookingFormList
);
 

 return (
    <>
      {wheelChair === true ? 
        <div className="accessible-main-div">
          <input
            type="checkbox"
            id="acessible-checkbox"
            value="sccessible-checkbox"
            className="accessible-checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            disabled={propertyName.length === 0}
          />
          <div className="info-div">
            <img src={wheelchair} className="info-img" alt="wheelchair" />
            <p className="info-txt">
              <FormattedMessage
                id="app.accessibleRooms"
                defaultMessage="I need an Accessible Room"
              />
            </p>
          </div>
        </div>
        :
        ''
      }
    </>
 );
}
