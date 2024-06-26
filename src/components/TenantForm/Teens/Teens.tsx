import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { teensAllowed } from '../../../redux/slice/TenantPropertySlice';
import { FormattedMessage } from 'react-intl';

export default function Teens() {
    const {teens} = useSelector((state: RootState) => state.tenantPropertyList);
    const dispatch = useDispatch<APPDispatch>();
    return (
        <div className="accessible-main-div">
            <input
                type="checkbox"
                id="acessible-checkbox-teens"
                value="accessible-checkbox"
                className="accessible-checkbox"
                checked={teens}
                onChange={() => dispatch(teensAllowed(!teens))}
            />
            <div className="info-div">
                <p className="info-txt" style={{paddingTop: '2px', fontSize: '15px', paddingLeft: '2px'}}>
                <FormattedMessage id="app.senior" defaultMessage="Senior" /> 
                </p>
            </div>
        </div>
    )
}
