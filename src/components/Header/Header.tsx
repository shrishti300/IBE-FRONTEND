import React, { useEffect, useState } from "react";
import Globe from "../../assets/globe.svg";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import Lang from "../Lang/Lang";
import Currency from "../Currency/Currency";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser, fetchUserAttributes } from "aws-amplify/auth";
import { addUserEmail, changeLoggedIn } from "../../redux/slice/UserSlice";
import { Amplify } from "aws-amplify";
import { awsExportsUser } from "../../../config";
import { showSnackbar } from "../../redux/slice/SnackbarSlice";

export default function Header() {
  Amplify.configure(awsExportsUser);

  const authenticator = useAuthenticator();
  const { user, signOut }: { user: AuthUser; signOut: () => void } = useAuthenticator((context) => [context.user]);
  const dispatch = useDispatch<APPDispatch>();

  const [hamburger, toggleHamburger] = useState(0);
  const { title } = useSelector((state: RootState) => state.tenantPersonalList);
  const navigate = useNavigate();

  useEffect(() => {
  }, [user])

  return (
    <div className="nav">
      <div className="hamburger-icon" onClick={() => toggleHamburger(prev => (prev + 1))}>
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className={`hamburger-items`} style={{ opacity: hamburger === 0 ? 0 : 1, animation: hamburger % 2 == 1 ? 'slideFromLeft 0.75s forwards' : 'slideFromRight 1s backwards' }}>
        {
          <>
            <div className="nav-info-div">
              <p className="mybookings--mobile">
                <FormattedMessage
                  id="app.myBooking"
                  defaultMessage="My Bookings"
                />
              </p>
            </div>
            <div className="nav-info-div language-mobile">
              <img src={Globe} className="nav-lang-img" alt="globe" />
              <Lang />
            </div>
            <div className="nav-info-div currency-mobile">
              <Currency />
            </div>
          </>
        }
      </div>

      <div className="nav-title-div" onClick={() => navigate('/')}>
        <p className="nav-title">{title.length === 0 ? 'Kickdrum' : title}</p>
        <p className="nav-title-desciption">
          <FormattedMessage
            id="app.internetBooking"
            defaultMessage="Internet Booking Engine"
          />
        </p>
      </div>
      <div className="nav-menu-div">
        <div className="nav-info-div" onClick={() => navigate('/my-bookings')}>
          <p className="mybookings-txt">
            <FormattedMessage
              id="app.myBooking"
              defaultMessage="My Bookings"
            />
          </p>
        </div>
        <div className="nav-info-div language">
          <img src={Globe} className="nav-lang-img" alt="globe" />
          <Lang />
        </div>
        <div className="nav-info-div currency">
          <Currency />
        </div>

        <div className="nav-info-div">
          {
            user === undefined ? <button className="login-btn" onClick={() => navigate('/login')}>
              <FormattedMessage id="app.login" defaultMessage="Login" />
            </button> : <button className="logout-btn" onClick={() => {signOut(); dispatch(showSnackbar({type: 'success',message: 'User logged out successfully!'}))}}>
              Logout
            </button>
          }

        </div>
      </div>
    </div>
  );
}
