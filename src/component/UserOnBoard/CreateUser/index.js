import React, { useState, useEffect } from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import { AppBack } from "component/common/AppBack";
import { useHistory } from "react-router-dom";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import NormalButton from "component/common/NormalButton/NormalButton";
import indian_flag from 'assets/images/indian_flag.png'
import { createBrowserHistory } from 'history';

const CreateUser = (props) => {
    let history = useHistory();





    const onClickCancel = () => {
    }

    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to User Onboard" />
            </div>
            <div className="create_header">
                <div>
                    <label className="font-bold-20 user-title">Create New User</label>
                </div>
                <div className="blank" />
                <div className="row pt-4">
                    <div className="col-6">
                        <label className="font-regular-16">First Name</label>
                        <FormInput />
                    </div>
                    <div className="col-6">
                        <label className="font-regular-16">Last Name</label>
                        <FormInput />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-6">
                        <label className="font-regular-16">Phone Number</label>
                        <div className="row">
                            <div className="col-2">
                                <div className="countryCode">
                                    <img src={indian_flag} className="flag" />
                                </div>
                            </div>
                            <div className="col-10"><FormInput /></div>
                        </div>
                    </div>
                    <div className="col-6">
                        <label className="font-regular-16">Email Address</label>
                        <FormInput />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-6">
                        <label className="font-regular-16">Gender</label>
                        <NormalMultiSelect />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-2"><NormalButton outlineButton onClick={onClickCancel} label="Cancel" className="font-bold-16" /></div>
                    <div className="col-2"><NormalButton dasboardButton label="Add" /></div>
                </div>
            </div>
        </>
    )
};
export default CreateUser;
