import { useSelector } from 'react-redux'
import './Timer.scss'
import { RootState } from '../../../redux/store/store'
import { FormattedMessage } from 'react-intl';

export default function Timer() {
    const {timeLeft} = useSelector((state: RootState) => state.checkoutList);
  return (
    <div className='timer'>
         <FormattedMessage
            id="app.timeleft"
            defaultMessage="your itinerary"
          /> : {Math.floor(timeLeft/60)} min {timeLeft % 60} sec
    </div>
  )
}
