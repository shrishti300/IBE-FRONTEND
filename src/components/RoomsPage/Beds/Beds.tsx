import { useDispatch, useSelector } from "react-redux";
import "./Beds.scss"
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { APPDispatch, RootState } from "../../../redux/store/store";
import { showSnackbar } from "../../../redux/slice/SnackbarSlice";
import { setBedsCount } from "../../../redux/slice/BookingFormSlice";

export default function Beds() {

    const { beds, propertyName } = useSelector((state: RootState) => state.bookingFormList);
    const dispatch = useDispatch<APPDispatch>();

    const handleBedsChange = (e: SelectChangeEvent<number>) => {
        dispatch(setBedsCount(e.target.value));
    }
    return (
        <div className='rooms-main-div'>
            <p className="rooms-txt">
                Beds
            </p>
            <FormControl>
                <Select
                    labelId="demo-simple-select-label-beds"
                    id="demo-simple-select-beds"
                    className="beds-select"
                    value={beds}
                    onChange={handleBedsChange}
                    disabled={propertyName.length === 0}
                    onMouseDown={() => {
                        if (propertyName.length === 0)
                            dispatch(showSnackbar({ type: "fail", message: "Please select the property first" }));
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 150,
                            },
                        },
                    }}
                >
                    {[...Array(14).keys()].map((index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
