import React, { useEffect, useRef, useState } from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import NormalButton from "component/common/NormalButton/NormalButton";
import profile_placeholder from "assets/images/profile_placeholder.png";
import edit from "assets/images/edit.png";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import { useHistory, useLocation } from "react-router-dom";
import { AppBack } from "component/common/AppBack";
import indian_flag from 'assets/images/indian_flag.png'
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import { Select } from 'antd';
import { Toast } from "service/toast";
import { request } from "service";
import endponts from "service/endponts";
import { requestMultipart } from "service/multipart";
import Header from "component/common/Header";
const { Option } = Select;



const EditProfile = (props) => {
    let history = useHistory();

    const { register, handleSubmit, errors, reset } = useForm();

    const inputRef = useRef();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("Male")
    const [userId, setUserId] = useState("")

    const location = useLocation();

    const [profilePic, setProfilePic] = useState(profile_placeholder)
    const [profileFile, setProfileFile] = useState(null);
    const [profileOriginalName, setProfileOriginalName] = useState("");
    const [isProfileUploaded, setIsProfileUploaded] = useState(false);

    useEffect(() => {
        if (location.state) {
            if (location.state.item) {
                updateDataInFields(location.state.item)
            }
        }
    }, [location]);

    const updateDataInFields = (item) => {
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setEmail(item.email);
        setMobileNumber(item.mobileNumber);
        setGender(item.gender);
        setUserId(item.uniqueUserID)
        if (item.profilePicture) {
            setProfilePic(item.profilePicture);
            setProfileFile(item.profilePicture);
        }
        setProfileOriginalName(item.originalFileName)

    }

    const onClickCancel = () => {
        history.goBack()
    }


    const onChangeFiles = (callback) => {
        const data = new FormData();
        data.append('fileKey', profileFile);

        requestMultipart({
            url: endponts.Endpoints.upload,
            method: endponts.APIMethods.POST,
            data: data
        }).then(res => {
            setProfilePic(res.data.fileData);
            callback(res.data.orinalName)

        })
    }


    const onSubmit = (inputs) => {
        if (!gender) {
            Toast({ type: 'error', message: 'Please select gender' })
            return
        }


        if (!profileFile) {
            Toast({ type: 'error', message: 'Please upload profile pic' })
            return
        }

        delete inputs["email"];


        if (isProfileUploaded) {
            onChangeFiles((fileName) => {
                updateData(fileName, inputs)
            })
        } else {
            updateData(profileOriginalName, inputs)
        }

    }

    const updateData = (fileName, inputs) => {
        let data = {
            ...inputs,
            gender,
            countryCode: "+91",
            profilePicture: fileName
        };
        request({
            url: endponts.Endpoints.updateProfile,
            method: endponts.APIMethods.PUT,
            data: data
        }).then(res => {
            let userData = {
                ...data,
                profilePicture: profilePic
            };

            localStorage.setItem('userData',JSON.stringify(userData));
            document.body.dispatchEvent(new CustomEvent("change_profile",{detail:{url:"change"}}))
            Toast({ type: 'success', message: res?.data?.message });
            history.goBack();
        })
    }



    const handleChange = (e) => {
        let file = e.target.files[0];
        setProfileFile(file)
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setProfilePic([reader.result])
        }.bind(this);
        setIsProfileUploaded(true)
    }

    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to Settings" />
            </div>
            <div className="create_header" style={{
                height: '600px'
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="profile-container-edit mb-3">
                        <label className="font-bold-20 profile-content">Edit Details</label>
                    </div>
                    <div className="blank" />
                    <input
                        type="file"
                        ref={inputRef}
                        style={{
                            display: 'none'
                        }}
                        onChange={handleChange}
                    />
                    <div className="img-align-edit mt-3">
                        <img src={profilePic} alt="user" className="user-profile-icon" />
                    </div>
                    <img src={edit} alt="usediter"
                        onClick={() => inputRef.current.click()}
                        className="edit-icon" />
                    <div className="row pt-4">
                        <div className="col-6">
                            <label className="font-regular-16">First Name</label>
                            <FormInput
                                errors={errors}
                                type={"text"}
                                value={firstName}
                                name="firstName"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.firstName}
                                messages={{
                                    required: "Please enter First name",
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <label className="font-regular-16">Last Name</label>
                            <FormInput
                                errors={errors}
                                type={"text"}
                                value={lastName}
                                name="lastName"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.lastName}
                                messages={{
                                    required: "Please enter Last name",
                                }}
                            />
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
                                disabled={true}
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
                            <label className="font-regular-16">Gender</label>
                            <div className='select_dropdown'>
                                <Select
                                    onChange={(e) => setGender(e)}
                                    placeholde={'Select Gender'}
                                    value={gender} style={{ width: "100%", height: 40, paddingTop: 4, backgroundColor: '#F9F9F9', borderWidth: 0.5, borderColor: "#C0C0C0" }}>
                                    <Option
                                        value={"Male"}>{"Male"}</Option>
                                    <Option value={"Female"}>
                                        {"Female"}
                                    </Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-2"><NormalButton outlineButton onClick={onClickCancel} label="Cancel" className="font-bold-16" /></div>
                        <div className="col-2"><NormalButton dasboardButton label="Save Changes" /></div>
                    </div>
                </form>

            </div>
        </>
    )
};
export default EditProfile;
