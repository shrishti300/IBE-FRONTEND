import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./RatingPage.scss";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../redux/store/store";
import axios from "axios";
import { showSnackbar } from "../redux/slice/SnackbarSlice";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "../components/Snackbar/Snackbar";

import RoomType from "../components/TenantForm/RoomType/RoomType";
import Loader from "../components/Loader/Loader";

interface IRatingInfo{
  id: string;
  propertyName: string;
  roomType: string;
  filled: boolean
}

export default function RatingPage() {
  const [value, setValue] = React.useState<number | null>(0);
  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setValue(newValue);
  };
  const { open } = useSelector((state: RootState) => state.snackbar);
  const [valid, isValid] = React.useState(false);
  const [ratingInfo, setRatingInfo] = React.useState<IRatingInfo | null>(null);
  let { id } = useParams();
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_RATING_TRACKER, {
          params: {
            id: id
          }
        })
        console.log(response.data);
        if(response.data.filled === true){
          dispatch(showSnackbar({type: 'fail', message: 'This rating form has already been filled!'}));
        }
        else{
          isValid(true);
          setRatingInfo(response.data);
        }
      } catch {
          dispatch(showSnackbar({type: 'fail', message: 'Invalid link!'}));
      }
    }

    fetchRating();
  }, [])

  const dispatch = useDispatch<APPDispatch>();

  const handleSubmit = () => {
    setLoader(true);
    if(ratingInfo != null){
      axios.post(import.meta.env.VITE_POST_RATING, {propertyName: ratingInfo.propertyName,roomType: ratingInfo.roomType,rating: value,id: ratingInfo.id})
      .then(()=> {
        dispatch(showSnackbar({type: 'success',message: 'Ratings Posted Successfully'}))
        
      }).catch(() => {
        dispatch(showSnackbar({type: 'fail', message: 'Error posting ratings'}));
      })
    }
    setLoader(false);
  };
  return (
    <>
    {
      loader && <Loader/>
    }
      {
        open && <Snackbar />
      }
      { valid && 
        <div className="ratingpage_main">
        <div className="ratingpage">
          <p className="ratingpage_title">Rate your stay with us!</p>

          <div className="rating_div">
            <p className="ratingpage_feedback_txt">
              Have Feedback for us? Write below.
            </p>
            <input type="text" className="ratingpage_input" style={{ padding: '10px' }} />
          </div>
          <div className="ratingpage_button-container">
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend" fontWeight={"bold"} className="ratingpage_feedback_txt">Rate here: </Typography>
              <Rating
                name="simple-controlled"
                value={value}
                size="large"
                precision={0.5}
                onChange={handleRatingChange}
              />
            </Box>
          </div>
          <button className={`submit-btn ${!value ? 'disabled' : ''}`} onClick={handleSubmit} disabled={!value}>
            Submit
          </button>
        </div>
      </div>
      }
    </>
  );
}
