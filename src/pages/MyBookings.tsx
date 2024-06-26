import { useAuthenticator } from '@aws-amplify/ui-react';
import { AuthUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import MyBookingCard from '../components/MyBookingCard/MyBookingCard';
import './MyBookings.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Booking } from '../utils/types/IProperty';
import Loader from '../components/Loader/Loader';
export default function MyBookings() {
  const { user, signOut }: { user: AuthUser; signOut: () => void } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  if(user === undefined || user.signInDetails?.loginId === undefined)  navigate('/login');

  const [myBookings,setMyBookings] = useState<Booking[] | null>(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try{
        console.log(user)
        const response = await axios.get(import.meta.env.VITE_GET_BOOKINGS, {
          params: {
            email: user.signInDetails?.loginId
          }
        })
        console.log(response.data)
        setMyBookings(response.data);
      }catch(error){
        console.log(error);
      }
      setLoading(false);
    }
    if(user !== undefined) fetchBookings();
  },[user])

  return (
    <>
    {
      loading && <Loader/>
    }
    <div className='mybooking'>
      <p className='mybookign_txt'> My Bookings</p>
      <div className='mybooking_main_div'>
        
      {
          myBookings?.map((myBooking) => (
            <MyBookingCard key={myBooking.bookingId} myBookings={myBooking}/> 
          ))
        }

      </div>
    </div>
    </>
  )
}
