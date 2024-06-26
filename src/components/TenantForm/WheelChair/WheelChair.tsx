import { FormattedMessage } from 'react-intl'
import '../../BookingForm/AccessibleRooms/AccessibleRoom.scss'
import { useDispatch, useSelector } from 'react-redux'
import { APPDispatch, RootState } from '../../../redux/store/store'
import { isWheelChair } from '../../../redux/slice/TenantPropertySlice'

export default function WheelChair() {
    const {wheelChair} = useSelector((state: RootState) => state.tenantPropertyList);
    const dispatch = useDispatch<APPDispatch>();
    return (
        <div className="accessible-main-div">
            <input
                type="checkbox"
                id="acessible-checkbox"
                value="sccessible-checkbox"
                className="accessible-checkbox"
                checked={wheelChair}
                onChange={() => dispatch(isWheelChair(!wheelChair))}
            />
            <div className="info-div">
                <p className="info-txt" style={{paddingTop: '2px', fontSize: '15px', paddingLeft: '2px'}}>
                    <FormattedMessage
                        id="app.accessibleRooms"
                        defaultMessage="Accessible Rooms"
                    />
                </p>
            </div>
        </div>
    )
}
