import React from 'react'
import './MyBookingCard.scss';
import SuccessLabel from './SuccessStatus/SuccessLabel';
import CancelLabel from './CancelStatus/CancelLabel';
import { Booking } from '../../utils/types/IProperty';
import ConfirmLabel from './ConfirmStatus/ConfirmLabel';
import { useNavigate } from 'react-router-dom';

interface MyBookingCard{
    myBookings: Booking | null
}

export default function MyBookingCard({myBookings} : MyBookingCard) {
    const navigate = useNavigate();
  return (
    <div className='mybookingcard_main'>
        <div className='mybookingcard_left'>
            <div className='mybookingcard_status_div'>
                {
                    myBookings?.cancelled ? <CancelLabel/> : <ConfirmLabel/>
                }
            </div>
        <div className="mybookingcard_id_div">
            <p className="mybookingcard_id_txt">Booking ID: {myBookings?.bookingId} </p>
        </div>
        <div className="mybookingcard_name_div">
            <p className="mybookingcard_name_txt">Room Type : {myBookings?.roomType}</p>
        </div>

        <div className="mybookingcard_checkin_div_main">
            <div className="mybookingcard_checkin__div">
                <p className="mybookingcard_checkin_txt">FROM : </p>
                <p className="mybookingcard_checkin_date"> {myBookings?.startDate}</p>
            </div>

            <div className="mybookingcard_checkin__div">
                <p className="mybookingcard_checkin_txt">TO:</p>
                <p className="mybookingcard_checkin_date"> {myBookings?.endDate}</p>
            
            </div>

        </div>
        </div>

        <div className='mybookingcard_right'>
            <p className='mybookingcard_right_price'>Total : ${myBookings?.total.toFixed(2)}</p>
            <button className='mybookingcard_right_viewmore_txt' onClick={() => navigate(`/reservation/${myBookings?.bookingId}`)}>View More</button>
        </div>
    </div>
  )
}
