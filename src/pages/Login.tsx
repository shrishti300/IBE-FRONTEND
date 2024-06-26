import React, { useEffect } from 'react'
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes, fetchAuthSession } from '@aws-amplify/auth';
import "@aws-amplify/ui-react/styles.css";
import { awsExportsUser } from "../../config";
import "./Login.scss"
import Home from './Home';
import { AuthUser } from "aws-amplify/auth";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  Amplify.configure(awsExportsUser);

  const { user, signOut }: { user: AuthUser; signOut: () => void } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  useEffect(() => {
    if(user !== undefined)  navigate('/');
  },[user])

  return (
    <div className='login-div'>
      <Authenticator signUpAttributes={['name']}>
        {({ signOut }) => (
          <p></p>
        )}
      </Authenticator>
    </div>
  )
}
