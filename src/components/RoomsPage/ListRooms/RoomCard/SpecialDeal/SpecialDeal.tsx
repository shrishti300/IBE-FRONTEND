import React from "react";
import "./SpecialDeal.scss"
import SpecialDealImg from "../../../../../assets/specialdeal.svg"
import { FormattedMessage } from "react-intl";

interface IPromo {
  promotionsImages: any
}

export default function SpecialDeal({ promotionsImages }: IPromo) {

  const bestPromoCalc = () => {
    const promoArray = promotionsImages.promotions;
    let maxDisc = 0, description = '';
    promoArray.map((promo : string) => {
      const promoInfo = promo.split(',');
      if(1 - Number(promoInfo[2]) > maxDisc){
        maxDisc = 1 - Number(promoInfo[2]);
        description = promoInfo[0];
      }
    })
    return `Save ${(maxDisc*100).toFixed(2)}% by ${description}`;
  }
  return (
    <>
      {
        promotionsImages === undefined ? '' :
          <div className="special_deal">
            <div className="room_special_deal_div">
              <img src={SpecialDealImg} className="room_special_deal_svg" />
              <p className="room_special_deal"><FormattedMessage id="app.specialDeal" defaultMessage="Special Deal" />
              </p>
            </div>
            <p className="room_deal_txt">{bestPromoCalc()}</p>
          </div>
      }
    </>
  );
}
