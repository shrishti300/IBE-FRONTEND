import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { useDispatch, useSelector } from 'react-redux';
import { APPDispatch, RootState } from '../../../redux/store/store';
import { fetchRates } from '../../../redux/thunk/CalenderThunk';
import { addDates, calcAvgRate, changeState } from '../../../redux/slice/CalenderSlice';
import { calcAvg } from '../../../utils/calculations/Calculations';
import LoaderDate from '../../Loader/LoaderDate';
import { setEndDate, setStartDate } from '../../../redux/slice/BookingFormSlice';
import { IStyling } from './SelectDate';

interface Calender {
    toggleVisibility: () => void,
    styling: IStyling
}

interface ICurrencyObj{
    [currency : string] : [string, number];
}

export default function Calender({ toggleVisibility, styling }: Readonly<Calender>) {

    const [months, setMonths] = useState(2);
    const [footerMsg, setFooterMsg] = useState("");
    const [applyBtnShow, setApplyBtnShow] = useState(true);

    const dispatch = useDispatch<APPDispatch>();
    const { current, INR, EUR, GBP, USD } = useSelector((state: RootState) => state.currencyList);
    const { averageRate } = useSelector((state: RootState) => state.calenderList);

    const currencyObjMapper : ICurrencyObj = {
        "USD": ["$", USD],
        "INR": ["₹", INR],
        "EUR": ["€", EUR],
        "GBP": ["£", GBP]
    }
    const [dateRangeState, setDateRangeState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + 86400000 * 2),
            key: 'selection'
        }
    ]);
    const { state } = useSelector((state: RootState) => state.calenderList);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1130) {
                setMonths(1);
            } else {
                setMonths(2);
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchRates()).then(() => dispatch(changeState("fulfilled")));
    }, [])
    
    const { roomRates } = useSelector((state: RootState) => state.calenderList);
    useEffect(() => {
        let avgPrice = calcAvg(dateRangeState[0].startDate.toISOString(),dateRangeState[0].endDate.toISOString(), roomRates)
        dispatch(calcAvgRate(avgPrice));
        if(dateRangeState[0].startDate.toISOString() === dateRangeState[0].endDate.toISOString()){
            setFooterMsg("Please select end date. Max Length of stay : 14 days!");
            setApplyBtnShow(false);
        }
        else{
            setFooterMsg("");
            setApplyBtnShow(true);
        }
    },[dateRangeState, roomRates])



    const handleDateChange = (ranges : any) => {
        setDateRangeState([ranges.selection]);
    };

    const getMaxEndDate = () => {
        if(dateRangeState[0].startDate.getTime() === dateRangeState[0].endDate.getTime()){
            const maxEndDate = new Date(dateRangeState[0].startDate);
            maxEndDate.setDate(dateRangeState[0].startDate.getDate() + 13);

            const maxEndDate1 = new Date();
            maxEndDate1.setDate(1);
            maxEndDate1.setMonth(6);
            maxEndDate1.setFullYear(2024);

            if(maxEndDate.getTime() < maxEndDate1.getTime()){
                return maxEndDate;
            }
            else{
                return maxEndDate1;
            }
        }
        else{
            const maxEndDate = new Date();
            maxEndDate.setDate(1);
            maxEndDate.setMonth(6);
            maxEndDate.setFullYear(2024);

            return maxEndDate;
        }
    };

    const handleClick = () => {
        dispatch(addDates([{startDate: dateRangeState[0].startDate.toDateString(), endDate: dateRangeState[0].endDate.toDateString(),key: dateRangeState[0].key}]));
        dispatch(setStartDate(dateRangeState[0].startDate.toDateString()));
        dispatch(setEndDate(dateRangeState[0].endDate.toDateString()));
        toggleVisibility();
    }

    const generateMinDate = () => {
        if(dateRangeState[0].startDate.getTime() !== dateRangeState[0].endDate.getTime()){
            return new Date();
        }
        return dateRangeState[0].startDate;
    }


    return (
        <div className={styling.name === "SelectDate" ? "date-range-picker-wrapper" : "date-range-picker-wrapper date-room-wrapper"}>
            <DateRangePicker
                ranges={dateRangeState}
                className='dateRangePicker'
                onChange={handleDateChange}
                minDate={generateMinDate()}
                maxDate={getMaxEndDate()}
                months={months}
                direction="horizontal"
                editableDateInputs={true}
                dayContentRenderer={(day) => {
                    const date = day.toISOString().split('T')[0];
                    return (
                        <div className="main-date-container" style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: current === 'INR' ?'6px': '15px', fontSize: '1rem' }}>
                            <p className='date' style={{ position: 'relative', top: '10px', textAlign: 'center', fontWeight: 'bold' }}>{day.getDate()}</p>
                            <p className="price" style={{ position: 'relative', bottom: '10px', textAlign: 'center', fontSize: '14px' }}>{state === "pending" ? ". . ." : <>{currencyObjMapper[current][0]}{(roomRates[date] * currencyObjMapper[current][1]).toFixed(0)}</>}</p>
                        </div>
                    );
                }}


            />
            <div className='date-picker-footer'>
                <div className="info-and-apply">
                    <p className='nightly-rate-info'>From {currencyObjMapper[current][0]}{(averageRate * currencyObjMapper[current][1]).toFixed(2)} night</p>
                    <button className='apply-btn-date' onClick={handleClick} disabled={!applyBtnShow} style={{ backgroundColor: applyBtnShow ? 'rgb(38, 38, 109)' : 'rgb(139, 139, 172)' }}>APPLY DATES</button>
                </div>
                {
                    footerMsg.length > 0 ? <p className='date-footer' style={{color: "red"}}>{footerMsg}</p> : ''
                }
            </div>
        </div>
    )
}
