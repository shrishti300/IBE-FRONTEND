import React from 'react';
import './Loader.scss';

const loaderStyles = {
 loaderIcon: {
    position: "fixed",
    left: "50%", 
    top: "50%",
    transform: "translate(-50%, -50%)", 
    width: "100vw", 
    height: '100vh',
    zIndex: '11',
    backgroundColor: 'rgba(155, 155, 155, 0.3)'
 },
 loaderCircle: {
    border: '4px solid #007bff',
    borderRadius: '50%',
    borderTop: '4px solid transparent',
    width: '30px',
    height: '30px',
    animation: 'spin 0.5s linear infinite',
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)' 
 }
};

const Loader: React.FC = () => {
 return (
    <div style={loaderStyles.loaderIcon as React.CSSProperties}>
      <div style={loaderStyles.loaderCircle as React.CSSProperties}></div>
    </div>
 );
}

export default Loader;