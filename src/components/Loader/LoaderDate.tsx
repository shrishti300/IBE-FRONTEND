import React from 'react'
import './Loader.scss'


const loaderStyles = {
    loaderIcon: {
        display: 'flex',
        justifyContent: 'center',
        width: '15px',
        height: '15px'
    },
    loaderCircle: {
      flex: '1',
      border: '2px solid #007bff',
      borderRadius: '50%',
      borderTop: '4px solid transparent',
      width: '10px',
      height: '10px',
      animation: 'spin 0.5s linear infinite',
    }
  };

export default function LoaderDate() {
  return (
    <div style={loaderStyles.loaderIcon as React.CSSProperties}>
      <div style={loaderStyles.loaderCircle}></div>
    </div>
  )
}
