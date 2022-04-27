import React, { useEffect, useRef, useState } from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import { AppBack } from "component/common/AppBack";
import { useHistory, useLocation } from "react-router-dom";
import FormInput from "component/common/FormInput";
import TextAreaInput from "component/common/TextAreaInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import NormalButton from "component/common/NormalButton/NormalButton";
import FileUploadButton from "component/common/FileUpload";
import indian_flag from 'assets/images/indian_flag.png'
import { requestMultipart } from "service/multipart";
import endponts from "service/endponts";
import { useForm } from "react-hook-form";
import { request } from "service";
import FormErrorMessage from "component/common/ErrorMessage";
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Toast } from "service/toast";

const { Option } = Select;

const CreateSchoolUser = (props) => {
    let history = useHistory();
    const { register, handleSubmit, errors, reset } = useForm();

    const [schoolLogo, setSchoolLogoFile] = useState(null);
    const [schoolFileName, setSchoolFileName] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const [schoolFile, setSchoolFile] = useState("");
    const [formStatus, setFormStatus] = useState(false)
    const inputRef = useRef()

    const [schoolName, setSchoolName] = useState("");
    const [schoolId, setSchoolId] = useState("");
    const [schoolBoard, setSchoolBoard] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [schoolUniqueId, setSchoolUniqueId] = useState("");
    const [boarList, setBoardList] = useState([])

    const location = useLocation();

    useEffect(() => {
        getBoardingList();
    }, [])


    const getBoardingList = () => {
        request({
            url: endponts.Endpoints.schoolBoards,
            method: endponts.APIMethods.GET,
            isLoader: false
        }).then(res => {
            setBoardList(res?.data?.data)
        })
    }

    useEffect(() => {
        if (location.state) {
            setFormStatus(location.state.status)

            if (location.state.item) {
                updateDataInFields(location.state.item)
            }
        }
    }, [location])

    const updateDataInFields = (item) => {
        setSchoolName(item.schoolName);
        setSchoolId(item.schoolId);
        setEmail(item.email);
        setSchoolBoard(item.schoolBoard);
        setMobileNumber(item.mobileNumber);
        setSchoolAddress(item.schoolAddress);
        setSchoolUniqueId(item.uniqueUserID);
        setSchoolLogoFile(item.profilePicture);
        setSchoolFileName(item.originalFileName)
    }




    const onChangeFiles = (callback) => {
        const data = new FormData();
        data.append('fileKey', schoolFile);

        requestMultipart({
            url: endponts.Endpoints.upload,
            method: endponts.APIMethods.POST,
            data: data
        }).then(res => {
            setSchoolFileName(res.data.orinalName);
            callback(res.data.orinalName)

        })
    }

    const onSubmit = (inputs) => {
        if (!schoolBoard) {
            Toast({ type: 'error', message: 'Please select board' })
            return
        }

        if (!schoolLogo) {
            Toast({ type: 'error', message: 'Please upload school logo' })
            return
        }

        if (isFileUploaded) {
            onChangeFiles((fileName) => {

                handleOnSubmit(inputs, fileName)
            })

        } else {
            handleOnSubmit(inputs, schoolFileName)
        }


    }

    const handleOnSubmit = (inputs, fileName) => {
        if (formStatus) {
            onEditUser(inputs, fileName);
            return
        }
        let data = {
            ...inputs,
            schoolBoard,
            countryCode: "+91",
            profilePicture: fileName
        };

        request({
            url: endponts.Endpoints.createSchool,
            method: endponts.APIMethods.POST,
            data: data
        }).then(res => {
            Toast({ type: 'success', message: 'School created successfully' });
            history.goBack();
        })
    }


    const onEditUser = (inputs, fileName) => {
        delete inputs["email"];
        let data = {
            ...inputs,
            schoolBoard,
            countryCode: "+91",
            uniqueUserID: schoolUniqueId,
            profilePicture: fileName
        }
        request({
            url: endponts.Endpoints.updateSchool,
            method: endponts.APIMethods.PUT,
            data: data
        }).then(res => {
            Toast({ type: 'success', message: 'School edited successfully' });
            history.goBack();
        })
    }

    const handleChange = (e) => {
        let file = e.target.files[0];
        setSchoolFile(file)
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setSchoolLogoFile([reader.result]);
        }.bind(this);
        setIsFileUploaded(true)
    }


    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to School Onboard" />
            </div>
            <div className="create_header">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="font-bold-20 user-title">{formStatus ? `Edit School` : `Add New School`}</label>
                    </div>
                    <div className="blank" />
                    <div className="row pt-4">
                        <div className="col-6">
                            <label className="font-regular-16">School Name</label>
                            <FormInput
                                errors={errors}
                                type={"text"}
                                value={schoolName}
                                name="schoolName"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.schoolName}
                                messages={{
                                    required: "Please enter School name",
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <label className="font-regular-16">School ID</label>
                            <FormInput
                                errors={errors}
                                type={"text"}
                                value={schoolId}
                                name="schoolId"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.schoolId}
                                messages={{
                                    required: "Please enter School ID",
                                }}
                            />
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-6">
                            <label className="font-regular-16">Contact Number</label>
                            <div className="row">
                                <div className="col-2">
                                    <div className="countryCode">
                                        <img src={indian_flag} className="flag" />
                                    </div>
                                </div>
                                <div className="col-10">
                                    <FormInput
                                        errors={errors}
                                        type={"number"}
                                        value={mobileNumber}
                                        name="mobileNumber"
                                        register={register({
                                            required: true,
                                            pattern: /^\d{10}$/
                                        })} />
                                    <FormErrorMessage
                                        error={errors.mobileNumber}
                                        messages={{
                                            required: "Please enter Mobile number",
                                            pattern: 'Number should be 10 digit characters'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <label className="font-regular-16">Email Address</label>
                            <FormInput
                                errors={errors}
                                type={"email"}
                                value={email}
                                name="email"
                                disabled={formStatus}
                                register={register({
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                })} />
                            <FormErrorMessage
                                error={errors.email}
                                messages={{
                                    required: "Please enter Email Id",
                                    pattern: 'Please enter valid email id'
                                }}
                            />
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-6">
                            <label className="font-regular-16">Board</label>
                            <div className='select_dropdown'>
                                <Select
                                    onChange={(e) => setSchoolBoard(e)}
                                    placeholder={'Select Board'}
                                    value={schoolBoard} style={{ width: "100%", height: 40, paddingTop: 4, backgroundColor: '#F9F9F9', borderWidth: 0.5, borderColor: "#C0C0C0" }}>
                                    {
                                        boarList.map(item => {
                                            return (
                                                <Option
                                                    value={item.schoolBoardName}>{item.schoolBoardName}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="col-6">
                            <label className="font-regular-16">Upload School Logo <span className="extensions">PNG/JPG</span></label>
                            <FileUploadButton
                                register={inputRef}
                                style={{
                                    display: 'none'
                                }}
                                onChange={(e) => handleChange(e)} />
                            <div className="flexRow">

                                <div
                                    className="outlineButton upload_button"
                                    onClick={() => inputRef.current.click()}>
                                    <p className="upload_text">Upload</p>
                                </div>

                                {
                                    schoolLogo && <img
                                        className="school_logo"
                                        src={schoolLogo} />

                                }
                            </div>


                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-12">
                            <label className="font-regular-16">School Address</label>
                            <TextAreaInput
                                errors={errors}
                                type={"text"}
                                value={schoolAddress}
                                style={{
                                    height: 100,
                                }}
                                name="schoolAddress"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.schoolAddress}
                                messages={{
                                    required: "Please enter School Address",
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-2"><NormalButton outlineButton label="Cancel" className="font-bold-16" /></div>
                        <div className="col-2"><NormalButton dasboardButton label={formStatus ? 'Update' : 'Add'} /></div>
                    </div>
                </form>
            </div>
        </>
    )
};
export default CreateSchoolUser;
