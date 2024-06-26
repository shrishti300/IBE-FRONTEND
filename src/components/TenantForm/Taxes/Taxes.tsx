import "./Taxes.scss";
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { addResortFee, addTaxPercent } from '../../../redux/slice/TenantPropertySlice';
import { SelectChangeEvent } from "@mui/material";
import { FormattedMessage } from "react-intl";

export default function Taxes() {
  const { taxPercent, resortFee } = useSelector((state: RootState) => state.tenantPropertyList);
  const dispatch = useDispatch<APPDispatch>();

  const handleChange = (e: SelectChangeEvent<number>) => {
    dispatch(addTaxPercent(e.target.value))
  }
  return (
    <div className="taxes">
      <div>
        <p className="taxes-txt"><FormattedMessage id="app.occupancyTax" defaultMessage="occupancy Tax" /></p>
        <input type="number" placeholder="enter percentage tax" className="taxes-input" value={taxPercent} onChange={handleChange} />
      </div>
      <div style={{marginLeft: '10px'}}>
        <p className="taxes-txt"><FormattedMessage id="app.resortFee" defaultMessage="resort Fee" /></p>
        <input type="number" placeholder="enter percentage tax" className="fee-input" value={resortFee} onChange={(e) => dispatch(addResortFee(e.target.value))} />
      </div>

    </div>
  )
}
