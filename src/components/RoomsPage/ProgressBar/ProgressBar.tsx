import { FormattedMessage } from 'react-intl';
import './ProgressBar.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

export default function ProgressBar() {

  const {isCheckout} = useSelector((state: RootState) => state.itineraryReducer);

  return (
    <div className='progressbar_main'>
    <div className='progress-bar'>
      <div className="progress-bar-top">
        <div className="progress-circle">
          <p className="circle-tick" style={{backgroundColor: isCheckout === 0 ? 'rgb(208,24,43)' : 'rgb(38,38,109)'}}><i className="fi fi-br-check"></i></p>
        </div> 
        <div className="line">
        </div>
        <div className="progress-circle">
          <p className="circle-tick" style={{backgroundColor: isCheckout === 0 ? 'gray' : isCheckout === 1 ? 'rgb(208,24,43)' : 'rgb(38,38,109)'}}><i className="fi fi-br-check"></i></p>
        </div>
        <div className="line">
        </div>
        <div className="progress-circle">
          <p className="circle-tick" style={{backgroundColor: isCheckout === 2 ? 'rgb(208,24,43)' : 'gray'}}><i className="fi fi-br-check"></i></p>
        </div>
      </div>
      <div className="progress-bar-bottom" style={{color: 'gray'}}>
        <p style={{marginTop: '5px', position:'relative', right:'20px', color: isCheckout === 0 ? 'rgb(38,38,109)' : 'gray'}} className='progressbar_txt'>1:  <FormattedMessage id="app.chooseRooms"  defaultMessage="choose ROoms" /> </p>
        <p style={{marginTop: '5px', position:'relative', right:'25px', color: isCheckout === 1 ? 'rgb(38,38,109)' : 'gray'}}className='progressbar_txt'>2:   <FormattedMessage id="app.chooseAddOns"  defaultMessage="choose add ons" /></p>
        <p style={{marginTop: '5px', color: isCheckout === 2 ? 'rgb(38,38,109)' : 'gray'}} className='progressbar_txt'>3:   <FormattedMessage id="app.checkout"  defaultMessage="checkout" /></p>
      </div>
    </div>
    </div>
  );
}
