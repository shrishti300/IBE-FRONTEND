import { useDispatch, useSelector } from "react-redux";
import "./MaximumGuests.scss";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { addMaxGuests } from "../../../redux/slice/TenantPropertySlice";
import { SelectChangeEvent } from "@mui/material";
import { FormattedMessage } from "react-intl";

export default function MaximumGuests() {
  const {maxGuests} = useSelector((state : RootState) => state.tenantPropertyList);
  const dispatch = useDispatch<APPDispatch>();

  const handleChange = (e: SelectChangeEvent<number>) => {
    dispatch(addMaxGuests(e.target.value))
  }
  return (
    <div className="maxguests">
      <p className="maxguests-txt"> <FormattedMessage id="app.max" defaultMessage="max" /> <FormattedMessage id="app.guests" defaultMessage="guests" /></p>
      <input type="text" placeholder="enter max guest" className="maxguests-input" value={maxGuests} onChange={handleChange} required/>
    </div>
  );
}
