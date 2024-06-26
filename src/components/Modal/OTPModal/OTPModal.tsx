import React, { useState } from 'react'
import './OTPModal.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { APPDispatch } from '../../../redux/store/store';
import { showSnackbar } from '../../../redux/slice/SnackbarSlice';
import { Booking } from '../../../utils/types/IProperty';
import Loader from '../../Loader/Loader';

interface IOtpModal{
  handleCancel: () => void;
  handleOTPClose: () => void;
  email: string;
  bookingId: string;
  handleChanges: () => void;
  bookingId2: number;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
  loader: boolean

}

export default function OTPModal({handleCancel,handleOTPClose,email,bookingId,handleChanges,bookingId2,setLoader,loader} : IOtpModal) {
  
  const [otp,setOtp] = useState<string>("");
  const dispatch = useDispatch<APPDispatch>();
    
  const handleOTPConfirm = async () => {
    setLoader(true);
    try{
      const response = await axios.get(import.meta.env.VITE_CHECK_OTP,{
        params: {
          otp: otp,
          bookingId: bookingId,
          bookingId2: bookingId2
        }
      })
      if(response.data === true){
        dispatch(showSnackbar({ type: "fail", message: "Booking cancelled successfully!" }));
        handleChanges();
        handleOTPClose();
      }
      else{
        dispatch({type: 'fail',message: 'Invalid OTP!'});
      }
    }catch(error){
      console.log(error);
    }
    setLoader(false);
  } 
  return (
    <>
    {
      loader && <Loader/>
    }
    <div className='otp_div'>
     <p className='otp_txt'> Enter OTP for cancelling the room booking</p>
     <input type='text' className='otp_input' placeholder='Enter the OTP' value={otp} onChange={(e) => setOtp(e.target.value)}/>
     <div className='otp_btn_div'> 
        <button className='otp_btn' onClick={handleOTPConfirm}> CONFIRM OTP </button>
     </div>
    </div>
    </>
  )
}
