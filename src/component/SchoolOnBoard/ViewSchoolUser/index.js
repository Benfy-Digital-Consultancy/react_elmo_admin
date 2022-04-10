import React, { useState, useEffect } from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import { AppBack } from "component/common/AppBack";
import { useHistory } from "react-router-dom";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import NormalButton from "component/common/NormalButton/NormalButton";
import FileUploadButton from "component/common/FileUpload";


const ViewSchoolUser = (props) => {
    let history = useHistory();

    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to School Onboard" />
            </div>
            <div className="create_header">
                <div>
                    <label className="font-bold-20 user-title">SBOA Matriculation Higher secondary School</label>
                </div>
                <div className="blank" />
                <div className="row pt-4">
                    <div className="col-4">
                        <label className="font-regular-14">School ID</label>
                        <h6>23E4FNKBD</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">School Name</label>
                        <h6>SBOA Matriculation Higher secondary School</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">Contact Number</label>
                        <h6>+91 9827364572</h6>
                    </div>

                </div>
                <div className="row pt-4">
                    <div className="col-4">
                        <label className="font-regular-14">Board</label>
                        <h6>Matriculation</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">Email ID</label>
                        <h6>SBOAMatriculationHighersecondary@gmail.com</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">Status</label>
                        <h6 color="#20B169">Active</h6>
                    </div>

                </div>
                <div className="row pt-4">
                    <div className="col-4">
                        <label className="font-regular-14">No. of Teachers</label>
                        <h6>312</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">No. Of Students</label>
                        <h6>1,234</h6>
                    </div>
                </div>
                <label className="font-regular-20 address">School Address</label>
                <div className="blank" />
                <div className="row mt-3">
                    <div className="col-8">
                        <label className="font-regular-14">Board</label>
                        <h6>R-9, 17th St, C-Sector, Anna Nagar West Extension, Chennai, Tamil Nadu</h6>
                    </div>
                    <div className="col-4">
                        <label className="font-regular-14">Pincode</label>
                        <h6>600121</h6>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ViewSchoolUser;
