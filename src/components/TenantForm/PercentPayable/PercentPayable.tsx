import { useDispatch, useSelector } from "react-redux";
import "./PercentPayable.scss"
import { APPDispatch, RootState } from "../../../redux/store/store";
import { addPercentPayable } from "../../../redux/slice/TenantPropertySlice";
import { SelectChangeEvent } from "@mui/material";
import { FormattedMessage } from "react-intl";

export default function PercentPayable() {
  const {percentagePayable} = useSelector((state : RootState) => state.tenantPropertyList);
  const dispatch = useDispatch<APPDispatch>();

  const handleChange = (e : SelectChangeEvent<number>) => {
    dispatch(addPercentPayable(e.target.value))
  }
  return (
    <div className="percent-payable">
      <p className="percent-payable-txt"> <FormattedMessage id="app.dueResort" defaultMessage="due at Resort" /></p>
      <input
        type="number"
        placeholder="enter percentage"
        className="percent-payable-input"
        value={percentagePayable}
        onChange={handleChange}
        required
      />
    </div>
  );
}
