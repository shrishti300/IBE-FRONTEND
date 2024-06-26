import React from 'react'
import ErrorSvg from "../assets/error404.svg"
import "./PageNotFound.scss"

export default function PageNotFound() {

  return (
    <div className='error404'>
      <div className='error404_main'>
        <img src={ErrorSvg} />
        <p className='error404_txt'>Page Not Found</p>
      </div>
    </div>

  )
}
