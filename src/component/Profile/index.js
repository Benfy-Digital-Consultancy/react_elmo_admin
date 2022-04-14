import React, { useEffect, useState } from "react";
import './styles.scss'
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import NormalButton from "component/common/NormalButton/NormalButton";
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import { Link } from "react-router-dom";
import { request } from "service";
import endponts from "service/endponts";

const Profile = (props) => {

    const [profileData, setProfileData] = useState({});
    const [profilePic, setProfilePic] = useState(profile_placeholder)

    const history = useHistory()
    useEffect(() => {
        getProfileDetails();
    }, []);

    const getProfileDetails = () => {
        request({
            url: endponts.Endpoints.getProfileDetails,
            method: endponts.APIMethods.GET
        }).then(res => {
            setProfileData(res?.data?.data);
            if(res?.data?.data?.profilePicture){
                setProfilePic(res?.data?.data?.profilePicture)
            }
        })
    }


    const onClickEdit = () => {
        history.push({
            pathname: "/admin/edit-profile",
            state: {item: profileData }
        });
    }


    return (
        <>
            <div className="profile-title font-bold-28">Admin Settings</div>
            <div className="create_header">
                <div className="profile-container mb-3">
                    <label className="font-bold-20 profile-content">Profile Details</label>
                    <NormalButton
                        onClick={onClickEdit}
                        outlineEditButton label="Edit" className="font-regular-14" />
                </div>
                <div className="blank" />
                <div className="img-align">
                    <img
                        src={profilePic}
                        onError={() => {
                            setProfilePic(profile_placeholder)
                        }}
                        alt="user"
                        className="user-profile-icon" />
                </div>
                <div className="profile-view-content">
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">First Name</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">{profileData?.firstName ? profileData?.firstName : ''}</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Last  Name</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">{profileData?.lastName ? profileData?.lastName : ''}</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Gender</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">{profileData?.gender ? profileData?.gender : ''}</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Email ID</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">{profileData?.email ? profileData?.email : ''}</label>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-3">
                            <label className="font-regular-16 profile-lable">Phone Number</label>
                        </div>
                        <div className="col-3">
                            <label className="font-semi-bold-16 profile-lable-content">{profileData?.countryCode ? profileData?.countryCode + ' ' : ''}{profileData?.mobileNumber ? profileData?.mobileNumber : ''}</label>
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
