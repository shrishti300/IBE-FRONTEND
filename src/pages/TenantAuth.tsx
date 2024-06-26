import React, { useEffect, useState } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import './TenantAuth.scss'
import LoaderDate from '../components/Loader/LoaderDate';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();
 const [error, setError] = useState("");
 const [loader,setLoader] = useState(false);

 const userPool = new CognitoUserPool({
    UserPoolId: "ap-northeast-2_qp2lwa3a8",
    ClientId: "hqhcjil010lrit79rcuj41in7",
 });

 useEffect(() => {
  const accessToken = localStorage.getItem("access-token");
  const exp = new Date(Number(localStorage.getItem("tenant-token-expiry"))*1000);

  if(accessToken !== null && exp >= new Date()){
    navigate('/tenantConfig');
  }
 },[])

 const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        localStorage.setItem("access-token",accessToken);
        localStorage.setItem("tenant-name",result.getIdToken().payload["name"]);
        localStorage.setItem("tenant-email",result.getIdToken().payload["email"]);
        localStorage.setItem("tenant-token-expiry",result.getIdToken().payload["exp"]);

        navigate('/tenantConfig');
        setLoader(false);
      },
      onFailure: (err) => {
        setError(err.message);
        setLoader(false);
      },
    });
 };

 return (
  <div className="login-container">
  <form className="login-form" onSubmit={handleSubmit}>
    <h2 style={{fontWeight: 'bold', fontSize: '18px'}}>TENANT LOGIN</h2>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <p style={{color: 'red', marginBottom: '5px'}}>{error}</p>
    <button type="submit" style={{backgroundColor: 'black',display:'flex',justifyContent:'center'}} disabled={loader}>{loader ? <LoaderDate/> : `Login`}</button>
  </form>
</div>
 );
};

export default Login;
