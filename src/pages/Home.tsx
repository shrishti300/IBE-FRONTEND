import { useSelector } from "react-redux";
import BookingForm from "../components/BookingForm/BookingForm";
import "./Home.scss";
import { RootState } from "../redux/store/store";

export default function Home() {
  const { bannerLink } = useSelector((state : RootState) => state.tenantPersonalList);

  return (
    <div className="home" style={{backgroundImage: bannerLink.length > 0 ? `url(${bannerLink})` : '', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <div>
          <BookingForm />
        </div>
        <div className="white-section">

        </div>
    </div>
  );
}
