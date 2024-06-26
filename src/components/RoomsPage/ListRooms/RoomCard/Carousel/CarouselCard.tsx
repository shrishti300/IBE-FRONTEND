import React from "react";
import Carousel from "react-bootstrap/Carousel";
import './Carousel.scss'
import { useDispatch } from "react-redux";
import { APPDispatch } from "../../../../../redux/store/store";
import { setImage } from "../../../../../redux/slice/CheckoutSlice";
interface IPromoImage {
  promotionsImages: any,
  carouselStyle:string,
}

export default function CarouselCardtsx({ promotionsImages, carouselStyle }: IPromoImage) {
  const dispatch = useDispatch<APPDispatch>();
  if(promotionsImages !== undefined)dispatch(setImage(promotionsImages.bannerImages[0]));
  return (
    <div className="carousel">
      {
        promotionsImages === undefined ? ''
          :
          <Carousel style={{zIndex: '0'}}>
            {
              promotionsImages.bannerImages.map((image : string,idx : number) => {
                return <Carousel.Item key={idx}>
                  <img
                  className={`d-block w-100 carousel-img ${carouselStyle === 'style1' ? 'roomcard-carousel-img' : 'roommodal-carousel-img'}`}
                    src={image}
                    alt="Third slide"
                  />
                </Carousel.Item>
              })
            }
          </Carousel>
      }
    </div>
  );
}
