import axios from "axios"
import { useHistory } from 'react-router-dom'
import { endpoints } from "config/api";
import { AxiosResponse, AxiosError } from 'axios'
import { Toast } from "./toast";
import Modal from "component/modal";
import React, { useContext, useRef } from "react";



export const request = ({
    url,
    method,
    data,
    isLoader = true
}) => new Promise((resolve, reject) => {

    let token = localStorage.getItem('token');
    let config = {
        url: process.env.REACT_APP_API_URL + url,
        method: method,
        data: data ? data : null,
        headers: {
            'Authorization': token ? 'Bearer ' + token : '',
            'Content-Type': 'application/json'
        }
    };

    console.log(config,"request");
    showLoader(isLoader)

    axios(config).then(res => {
        console.log(res,"response");
        showLoader(false);
        return resolve(res)
    }).catch(({ response }) => {
        console.log(response,"error");
        showLoader(false);
        let { status, data } = response;
        let { message } = data;
        Toast({ type: "error", message: message });

        if (status === 401) {
            let history = useHistory()
            //clear and navigate to login
            history.replace('/auth/login');

        }
        return reject(response)
    })


});


const showLoader=(status)=>{
    if(Modal && Modal.render &&  Modal.render.defaultProps){
        Modal.render.defaultProps.setLoaderStatus(status)
    }
}