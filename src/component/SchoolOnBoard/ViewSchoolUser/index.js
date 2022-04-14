import React, { useState, useEffect } from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import { AppBack } from "component/common/AppBack";
import { useHistory, useLocation } from "react-router-dom";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import NormalButton from "component/common/NormalButton/NormalButton";
import FileUploadButton from "component/common/FileUpload";
import { request } from "service";
import endponts from "service/endponts";


const ViewSchoolUser = (props) => {
    let history = useHistory();

    const location = useLocation();

    const [schoolData,setSchoolData] = useState({})

    useEffect(()=>{
        if (location.state.item) {
            updateDataInFields(location.state.item)
        }
    },[]);

    const updateDataInFields=(data)=>{
        console.log(data);
        setSchoolData(data);
    }

    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to School Onboard" />
            </div>
            <div className="create_header">
                <div>
                    <label className="font-bold-20 user-title">School Details</label>
                </div>
                <div className="blank" />
                <div className="row pt-4">
                    <div className="col-4">
                        <label className="font-regular-14">School ID</label>
                        <h6>{schoolData?.schoolId ? schoolData?.schoolId : '-'}</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">School Name</label>
                        <h6>{schoolData?.schoolName ? schoolData?.schoolName : '-'}</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">Contact Number</label>
                        <h6>{schoolData?.countryCode ? schoolData?.countryCode : '-'} {schoolData?.mobileNumber ? schoolData?.mobileNumber : '-'}</h6>
                    </div>

                </div>
                <div className="row pt-4">
                    <div className="col-4">
                        <label className="font-regular-14">Board</label>
                        <h6>{schoolData?.schoolBoard ? schoolData?.schoolBoard : '-'}</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">Email ID</label>
                        <h6>{schoolData?.email ? schoolData?.email : '-'}</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">Status</label>
                        <h6 color="#20B169">{schoolData?.userStatus ? (schoolData?.userStatus == 1  ? 'Active' : 'In-Active') : '-'}</h6>
                    </div>

                </div>
                {/* <div className="row pt-4">
                    <div className="col-4">
                        <label className="font-regular-14">No. of Teachers</label>
                        <h6>312</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">No. Of Students</label>
                        <h6>1,234</h6>
                    </div>
                </div> */}
                <label className="font-regular-20 address mt-4">School Address</label>
                <div className="blank" />
                <div className="row mt-3">
                    <div className="col-8">
                        <label className="font-regular-14">Board</label>
                        <h6>{schoolData?.schoolAddress ? schoolData?.schoolAddress : '-'}</h6>
                    </div>
                    {/* <div className="col-4">
                        <label className="font-regular-14">Pincode</label>
                        <h6>600121</h6>
                    </div> */}
                </div>
            </div>
        </>
    )
};
export default ViewSchoolUser;
