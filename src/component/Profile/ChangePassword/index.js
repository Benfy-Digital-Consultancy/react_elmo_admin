import React from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import NormalButton from "component/common/NormalButton/NormalButton";
import { AppBack } from "component/common/AppBack";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";

const ChangePassword = (props) => {
    let history = useHistory()
    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to Settings" />
            </div>            <div className="create_header">
                <div className="profile-container-change mb-3">
                    <label className="font-bold-20 profile-content">Change Password</label>
                </div>
                <div className="blank" />
                <div className="row pt-4">
                    <div className="col-6">
                        <label className="font-regular-16">Current Password *</label>
                        <FormInput />
                    </div>
                    <div className="col-6">
                        <label className="font-regular-16">New Password *</label>
                        <FormInput />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-6">
                        <label className="font-regular-16">Confirm Password *</label>
                        <FormInput />
                    </div>

                </div>

                <div className="row mt-3">
                    <div className="col-2"><NormalButton onClick={() => history.goBack()} outlineButton label="Cancel" className="font-bold-16" /></div>
                    <div className="col-2"><NormalButton dasboardButton label="Change Password" /></div>
                </div>
            </div>
        </>
    )
};
export default ChangePassword;
