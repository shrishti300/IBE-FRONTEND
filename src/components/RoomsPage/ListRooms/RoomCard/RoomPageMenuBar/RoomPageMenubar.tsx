import React, { useState } from "react";
import { APPDispatch, RootState } from "../../../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedSort, setPageNumber } from "../../../../../redux/slice/BookingFormSlice";
import { FormattedMessage } from "react-intl";
import down from "../../../../../assets/down.svg";
import next from "../../../../../assets/next.svg";
import prev from "../../../../../assets/prev.svg";


export default function RoomPageMenubar() {
  const { propertyName, pageNo,totalPages} = useSelector(
    (state: RootState) => state.bookingFormList
  );
  const {sortKey, filterKeys} = useSelector((state: RootState) => state.bookingFormList);

  const { sort } = useSelector((state: RootState) => state.roomPageReducer);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dispatch = useDispatch<APPDispatch>();

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const goToNextPage = () => {
    if (Number(pageNo) * 4 < totalPages) {
      dispatch(setPageNumber(Number(pageNo) + 1));
    }
  };

  const goToPrevPage = () => {
    if (Number(pageNo) > 1) {
      dispatch(setPageNumber(Number(pageNo) - 1));
    }
  };


  const handleChange = (ele: string) => {
    dispatch(addSelectedSort(ele));
    setDropdown((prev) => !prev);
  };

  return (
    <div className="listrooms_menubar">
      <p className="roomresult_txt">
        <FormattedMessage id="app.roomResults" defaultMessage="Room Results" />
      </p>
      <div className="roomresults_page_div">
        <p className="roomresults_result_txt">
          <button className="pagination_btn" onClick={goToPrevPage}>
            <img src={prev} className="prev_svg" alt="Previous" />
          </button>
          <FormattedMessage id="app.showing" defaultMessage="Showing " />
          {totalPages === 0 ? 0 : (Number(pageNo) - 1) * 4 + 1}-
          {Math.min((Number(pageNo) - 1) * 4 + 4, totalPages)} of {totalPages}{" "}
          <FormattedMessage id="app.Results" defaultMessage="Results" />
          <button className="pagination_btn" onClick={goToNextPage}>
            <img src={next} className="next_svg" alt="Next" />
          </button>
        </p>
        <p className="space"> | </p>
        <p className="roomresults_price_dropdown">{sortKey.toUpperCase()}</p>
        <div className="sort-dropdown-roompage">
          <div className="roomresults_dropdown_div">
            <img
              src={down}
              className="roomresults_dropdown_img"
              alt="Dropdown"
              onClick={toggleDropdown}
            />
          </div>
          {dropdown && (
            <div className="sort-dropdown">
              {sort.map((ele, idx) => (
                <button
                  key={idx}
                  className="sort-dropdown-item"
                  onClick={() => handleChange(ele)}
                >
                  {ele.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
