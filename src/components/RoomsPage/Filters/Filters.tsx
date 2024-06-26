import React, { ChangeEvent, useEffect, useState } from "react";
import "./Filters.scss";
import Down from "../../../assets/down.svg";
import Up from "../../../assets/up.svg";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { filterMapper } from "../../../utils/Constants";
import { addSelectedFilter, removeSelectedFilter } from "../../../redux/slice/BookingFormSlice";
import Itinerary from "../../Checkout/Itinerary";
import { Modal } from "react-responsive-modal";



interface ICurrencyObj{
  [currency : string] : [string, number];
}

export default function Filters() {
  const { filter } = useSelector((state: RootState) => state.roomPageReducer);
  const {filterKeys} = useSelector((state: RootState) => state.bookingFormList);
  const [dropdownStates, setDropdownStates] = useState<boolean[]>([]);
  const [iconDirections, setIconDirections] = useState<string[]>([]);
  const dispatch = useDispatch<APPDispatch>();

  useEffect(()=> {
    if(filter.length > 0){
      setDropdownStates(Array(filter.length).fill(false));
      setIconDirections(Array(filter.length).fill("down"))
    }
  },[filter])

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
    setIconDirections((prevDirections) =>
      prevDirections.map((direction, i) =>
        i === index ? (direction === "down" ? "up" : "down") : direction
      )
    );
  };

  const handleChange = (filterItem:string, item: string|number) => {
    if(filterKeys.includes(filterItem+"_"+item)){
      dispatch(removeSelectedFilter(filterItem+"_"+item));
    }
    else{
      dispatch(addSelectedFilter(filterItem+"_"+item));
    }
  }

  const { current, INR, EUR, GBP, USD } = useSelector((state: RootState) => state.currencyList);

  const currencyObjMapper : ICurrencyObj = {
    "USD": ["$", USD],
    "INR": ["₹", INR],
    "EUR": ["€", EUR],
    "GBP": ["£", GBP]
}


const [showItenaryModal, setshowItenaryModa] = useState(false);
const openModalClick = () => {};

const [open, setOpen] = React.useState(false);
const handleOpen = () => {
  setOpen(true);
  setshowItenaryModa(true);
};
const handleClose = () => setOpen(false);


  return (
    <>
    <div className="filters">
      <div className="title_div">
        <p className="title_heading_txt">
          <FormattedMessage
            id="app.NarrowResult"
            defaultMessage="Narrow Result"
          />
        </p>
      </div>
      <div className="allfilters_div">
        {filter.map((filterItem, index) => (
          <div className="filter_div" key={filterItem}>
            <div className="filter_data_div">
              <p className="filter_title"><FormattedMessage id={`app.${filterItem}`}  defaultMessage={`${filterItem}`} /></p>
              <img
                src={iconDirections[index] === "down" ? Down : Up}
                className="dropdown-img"
                onClick={() => toggleDropdown(index)}
              />
            </div>

            {dropdownStates[index] && (
              <div className="alldropdown_div">
                {filterMapper[filterItem as keyof typeof filterMapper].map((item: string | number, itemIndex: number) => (
                  <div className="dropdown_div" key={itemIndex}>
                    <input type="checkbox" onChange={() => handleChange(filterItem,item)} checked={filterKeys.includes(filterItem+"_"+item)}/>
                    <p className="checkbox_txt">{typeof item === "number" ? `<= ${currencyObjMapper[current][0]}${(Number(item) * currencyObjMapper[current][1]).toFixed(2)}` : item.toString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <div className="itenary_dropdown">
      <div className="check_itenary_btn_div">
       <button className="check_itenary_btn" onClick={handleOpen}>   <FormattedMessage
            id="app.itinerary"
            defaultMessage="Narrow Result"
          /></button>
    </div>
    {showItenaryModal && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            center>
           <Itinerary />
          </Modal>
        </div>
      )}
    </div>
    </>
  );
}
