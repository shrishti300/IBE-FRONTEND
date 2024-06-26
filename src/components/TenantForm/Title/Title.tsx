import { useDispatch, useSelector } from "react-redux";
import "./Title.scss";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { addTitle } from "../../../redux/slice/TenantPersonalSlice";
import { SelectChangeEvent } from "@mui/material";
import { FormattedMessage } from "react-intl";

export default function Title() {
  const {title} = useSelector((state : RootState) => state.tenantPersonalList);
  const dispatch = useDispatch<APPDispatch>();
  const handleChangeTitle = (e : SelectChangeEvent<string>) => {
    dispatch(addTitle(e.target.value));
  }
  return (
    <div className="title">
      <p className="title-txt"><FormattedMessage id="app.title" defaultMessage="title" /></p>
      <input type="text" placeholder="Enter title" className="title-input" onChange={handleChangeTitle} value={title} />
    </div>
  );
}
