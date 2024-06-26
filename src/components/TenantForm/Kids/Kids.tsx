import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { kidsAllowed } from '../../../redux/slice/TenantPropertySlice';
import { FormattedMessage } from 'react-intl';

export default function Kids() {
    const {kids} = useSelector((state: RootState) => state.tenantPropertyList);
    const dispatch = useDispatch<APPDispatch>();
    return (
        <div className="accessible-main-div">
            <input
                type="checkbox"
                id="acessible-checkbox-kids"
                value="accessible-checkbox"
                className="accessible-checkbox"
                checked={kids}
                onChange={() => dispatch(kidsAllowed(!kids))}
            />
            <div className="info-div">
                <p className="info-txt" style={{paddingTop: '2px', fontSize: '15px', paddingLeft: '2px'}}>
                <FormattedMessage id="app.kid" defaultMessage="Kids" /> 
                </p>
            </div>
        </div>
    )
}
