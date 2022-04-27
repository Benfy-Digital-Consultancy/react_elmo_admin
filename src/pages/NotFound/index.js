import React from "react";
import Lottie from 'react-lottie';
import nofound from 'assets/lottie/404.json'


const NotFound = () => {
    const hasWindow = typeof window !== 'undefined';

    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        overflow:'hidden'
      }}>
        <Lottie options={
          {
            loop: true,
            autoplay: true,
            animationData: nofound,
          }
        }
          height={300}
          width={300}
        />
      </div>
  )
};


export default NotFound;
