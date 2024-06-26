import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./PromotionsConfig.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPDispatch, RootState } from "../../../redux/store/store";
import { addPromotions } from "../../../redux/slice/TenantRoomSlice";
import { FormattedMessage } from "react-intl";

export interface IPromotions{
  promotionID: number;
  promotionTitle: string;
  priceFactor: number;
  promotionDescription: string;
  minDays: number;
  deactivated: boolean;
}
export default function PromotionsConfig() {

  const [promotionsList, setPromotionsList] = useState<IPromotions[]>([]);
  const {promotions} = useSelector((state: RootState) => state.tenantRoomList);
  const {propertyName} = useSelector((state: RootState) => state.bookingFormList);
  const dispatch = useDispatch<APPDispatch>();
  
  useEffect(() => {
    async function fetchPromotions() {
      try {
        const response = await axios.get(import.meta.env.VITE_PROMOTIONS_API, {
          params: {
            propertyName: propertyName
          }
        });
        console.log(response.data)
        setPromotionsList(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    }
    if(propertyName.length > 0) fetchPromotions();
  }, [propertyName]);

  const handlePromotionChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value as string[];
    console.log(promotions)
    dispatch(addPromotions(selectedValue));
  };


  return (
    <div className="promotions-div">
    <p className="property-label"> <FormattedMessage id="app.promotions" defaultMessage="Promotions" /> </p>
    <FormControl>
      <Select
        value={promotions}
        onChange={handlePromotionChange}
        labelId="select-label"
        className="property-select"
        inputProps={{ "aria-label": "Without label" }}
        displayEmpty
        multiple
        renderValue={(selected) => {
          return `Promotions selected : ${selected.length}`;
        }}
        disabled={propertyName.length === 0}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          PaperProps: {
            style: {
              maxHeight: "13rem",
              overflowY: "auto",
            },
          },
        }}
      >
        {promotionsList.map((promotion) => (
          <MenuItem 
          key={promotion.promotionID} 
          value={promotion.promotionTitle + ',' + promotion.promotionDescription + ',' + promotion.priceFactor + ',' + promotion.minDays + ',' + promotion.deactivated}  
          selected={promotions.includes(promotion.promotionTitle + ',' + promotion.promotionDescription + ',' + promotion.priceFactor + ',' + promotion.minDays + ',' + promotion.deactivated)} 
          style={{ backgroundColor: promotions.includes(promotion.promotionTitle + ',' + promotion.promotionDescription + ',' + promotion.priceFactor + ',' + promotion.minDays + ',' + promotion.deactivated) ? "lightblue" : "transparent" }}
          sx={{
            '&.Mui-selected': {
              backgroundColor: 'lightblue',
            },
          }}
          >
            {promotion.promotionTitle} ({promotion.priceFactor})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);
}