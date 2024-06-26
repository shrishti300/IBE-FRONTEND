import React from 'react'
import Star from "../../../../../assets/star.svg"
import "./Rating.scss";

export default function Rating() {
  return (
    <div className='rating'>
        <div className='rating_rate'>
            <img src={Star} className='rating_rate_img' />
            <p className='rating_rate_txt'>3.5</p>
        </div>
        <p className='rating_review_txt'>128 reviews </p>
    </div>
  )
}
