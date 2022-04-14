import './styles.scss'
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Lottie from 'react-lottie';
import no_data from 'assets/lottie/no_data.json'


const NoData = () => {

    const [loaders, setLoader] = useState(false);


    return (
        <div>
            <div className='container-nodata'>
                <Lottie options={
                    {
                        loop: true,
                        autoplay: true,
                        animationData: no_data,
                    }
                }
                    height={400}
                    width={400}
                />

                <p className='no-data'>Sorry No Data Found</p>
            </div>
        </div>
    )

}


export default NoData;

