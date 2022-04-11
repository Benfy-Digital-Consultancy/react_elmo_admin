import React from "react";
import './styles.scss'
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import NormalButton from "component/common/NormalButton/NormalButton";
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import { Link } from "react-router-dom";

const Profile = (props) => {
    return (
        <>
            <div className="profile-title font-bold-28">Admin Settings</div>
            <div className="create_header">
                <div className="profile-container mb-3">
                    <label className="font-bold-20 profile-content">Profile Details</label>
                    <Link to="/admin/edit-profile">
                        <NormalButton outlineEditButton label="Edit" className="font-regular-14" />
                    </Link>
                </div>
                <div className="blank" />
                <div className="img-align">
                    <img src={profile_placeholder} alt="user" className="user-profile-icon" />
                </div>
                <div className="profile-view-content">
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">First Name</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">Dan</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Last  Name</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">Sanchez</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Gender</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">Male</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Email ID</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">DanSanchez@gmail.com</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Phone Number</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">+91 898282892</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Password</label>
                        </div>
                        <div className="col-3 profile-footer">
                            <label className="font-semi-bold-16 profile-lable-content">**********</label>
                            <Link to="/admin/change-password">
                                <span className="change font-semi-bold-12">Change Password</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Profile;
