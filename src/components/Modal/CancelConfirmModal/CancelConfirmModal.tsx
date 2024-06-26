import React from 'react'
import './CancelConfirmModal.scss'
import { AuthUser } from 'aws-amplify/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { APPDispatch } from '../../../redux/store/store';
import { showSnackbar } from '../../../redux/slice/SnackbarSlice';
import Loader from '../../Loader/Loader';

interface ICancelModel{
    handleClose: () => void;
    handleShowOTPModal: () => void;
    handleCancel: () => void;
    user: AuthUser;
    email: string | undefined;
    bookingId: string;
    loader: boolean;
 }

export default function CancelConfirmModal({handleClose,handleShowOTPModal,handleCancel,user,email,bookingId,loader} : Readonly<ICancelModel>) {

    const dispatch = useDispatch<APPDispatch>();

    const generateOTP = async () => {
        if(email !== undefined){
            try{
                await axios.post(import.meta.env.VITE_GENERATE_OTP,{email,bookingId})
                .then(() => {
                    dispatch(showSnackbar({type: "success", message: "OTP Sent Successfully"}));
                })
            }catch(error){
                console.log(error);
                dispatch(showSnackbar({type: "fail", message: "Error sending OTP"}));
            }
        }
    }

    const handleYesBtn = () => {   
        if(user === undefined){
            handleClose();
            generateOTP();
            handleShowOTPModal();
        }
        else{
            handleCancel();
            handleClose();
        }
    }
    const handleNoBtn = () => {
        handleClose();
    }

  return (
    <>
    {loader && <Loader/>}
    <div className='cancel-confirm-modal'>
        <p className='cancel-modal-heading'>Do you really want to cancel the booking</p>
        <div className="cancel-yes-no">
            <button className='yes-btn' onClick={handleYesBtn}>YES</button>
            <button className='no-btn' onClick={handleNoBtn}>NO</button>
        </div>
    </div>
    </>
  )
}
