import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddOn from "./pages/AddOn";
import Checkout from "./pages/Checkout";
import Reservations from "./pages/Reservations";
import PageNotFound from "./pages/PageNotFound";
import { IntlProvider } from "react-intl";
import Spanish from "./languages/es-MX.json";
import English from "./languages/en-US.json";
import Hindi from "./languages/en-GB.json";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import { LangEnum } from './utils/enums/langenum';
import RoomsPage from "./pages/RoomsPage";
import TenantAuth from "./pages/TenantAuth";
import UrlErrorPage from "./pages/UrlErrorPage";
import RatingPage from "./pages/RatingPage";
import Itinerary from "./components/Checkout/Itinerary";
import Login from "./pages/Login";
import React from "react";
import TenantConfig from "./pages/TenantConfig";
import PrivateRoute from "./pages/PrivateRoute";
import MyBookings from "./pages/MyBookings";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {

  const languageName = useSelector((state: RootState) => state.languageList.languageName);
  const local = navigator.language;
  let lang;

  switch (languageName) {
    case LangEnum.en_US:
      lang = English;
      break;
    case LangEnum.en_GB:
      lang = Hindi;
      break;
    default:
      lang = Spanish;
  }

  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== '/tenantConfig' && location.pathname !== '/tenantconfig' && location.pathname !== '/tenantAuth';

  return (
    <Authenticator.Provider>
      <IntlProvider locale={local} messages={lang}>
        <div className="main">
          {showHeaderAndFooter && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roomResults" element={<RoomsPage />} />
            <Route path="/addon" element={<AddOn />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/tenantConfig" element={
              <PrivateRoute>
                <TenantConfig />
              </PrivateRoute>
            } />
            <Route path="/tenantAuth" element={<TenantAuth />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/rating/:id" element={<RatingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<UrlErrorPage />} />
            <Route path="/reservation/:id" element={<Reservations />} />
          </Routes>
          {showHeaderAndFooter && <Footer />}
        </div>

      </IntlProvider>
    </Authenticator.Provider>

  );
}

export default App;
