import React from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import NormalButton from "component/common/NormalButton/NormalButton";
import profile_placeholder from "assets/images/profile_placeholder.png";
import edit from "assets/images/edit.png";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import { useHistory } from "react-router-dom";
import { AppBack } from "component/common/AppBack";
import indian_flag from 'assets/images/indian_flag.png'

const EditProfile = (props) => {
    let history = useHistory()

    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to Settings" />
            </div>
            <div className="create_header" style={{
                height: '600px'
            }}>
                <div className="profile-container-edit mb-3">
                    <label className="font-bold-20 profile-content">Edit Details</label>
                </div>
                <div className="blank" />
                <div className="img-align-edit mt-3">
                    <img src={profile_placeholder} alt="user" className="user-profile-icon" />
                </div>
                <img src={edit} alt="usediter" className="edit-icon" />

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
                    <div className="col-2"><NormalButton outlineButton label="Cancel" className="font-bold-16" /></div>
                    <div className="col-2"><NormalButton dasboardButton label="Save Changes" /></div>
                </div>

            </div>
        </>
    )
};
export default EditProfile;
