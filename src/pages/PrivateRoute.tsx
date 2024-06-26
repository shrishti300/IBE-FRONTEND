import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
   }

export default function ({children} : PrivateRouteProps) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access-token");
  const exp = new Date(Number(localStorage.getItem("tenant-token-expiry"))*1000);

  useEffect(() => {
    if(accessToken == null){
      navigate('/tenantAuth');
    }
    if(exp < new Date()){
      navigate('/tenantAuth');
    }
  },[])
  return(
    children
  )
}
