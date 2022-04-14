import './styles.scss'
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Lottie from 'react-lottie';
import loader from 'assets/lottie/loader.json'


function Modal(props, ref) {

    const [loaders, setLoader] = useState(false);
    const [isAuthPage, setIsAuthPage] = useState(false)

    const setLoaderStatus = (status) => {
        let url = window.location.href;
        setIsAuthPage(url.includes('auth'))
        setLoader(status)
    }
    Modal.defaultProps = {
        setLoaderStatus,
        loaders
    }
    return (
        <div>
            {
                loaders ?
                    <div className='container-modal' 
                        style={{
                            paddingLeft:!isAuthPage ? 250 : 0
                        }}>
                        <Lottie options={
                            {
                                loop: true,
                                autoplay: true,
                                animationData: loader,
                            }
                        }
                            height={400}
                            width={400}
                        />
                    </div> : <div></div>
            }
        </div>
    )

}


const ModalRef = forwardRef(Modal);
export default ModalRef;

