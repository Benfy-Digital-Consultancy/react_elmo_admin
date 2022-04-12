import React, { useState, useEffect } from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import { AppBack } from "component/common/AppBack";
import { useHistory, useLocation } from "react-router-dom";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import NormalButton from "component/common/NormalButton/NormalButton";
import indian_flag from 'assets/images/indian_flag.png'
import { createBrowserHistory } from 'history';
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Toast } from "service/toast";
import { request } from "service";
import endponts from "service/endponts";

const { Option } = Select;

const CreateUser = (props) => {
    const { register, handleSubmit, errors, reset } = useForm();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("Male")
    const [userId, setUserId] = useState("Male")
    const [formStatus , setFormStatus] = useState(false)

    const [title, setTitle] = useState("")
    let history = useHistory();

    const location = useLocation();


    useEffect(() => {
        console.log(location);
        if (location.state) {
            setFormStatus(location.state.status)
            
            if(location.state.item){
                updateDataInFields(location.state.item)
            }
        }
    }, [location])


    const updateDataInFields=(item)=>{
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setEmail(item.email);
        setMobileNumber(item.mobileNumber);
        setGender(item.gender);
        setUserId(item.uniqueUserID)
    }



    const onClickCancel = () => {
    }

    const onSubmit = (inputs) => {
        if(formStatus){
            onEditUser(inputs);
            return
        }
        let data = {
            ...inputs,
            gender,
            countryCode:"+91"
        };

        request({
            url:endponts.Endpoints.createSubAdmin,
            method:endponts.APIMethods.POST,
            data:data
        }).then(res=>{
            Toast({type:'success',message:'Subamin created successfully'});
            history.goBack();
        })
    }

    const onEditUser = (inputs) =>{
        delete inputs["email"];
        let data = {
            ...inputs,
            gender,
            countryCode:"+91",
            uniqueUserID:userId
        }
        request({
            url:endponts.Endpoints.updateSubAdmin,
            method:endponts.APIMethods.PUT,
            data:data
        }).then(res=>{
            Toast({type:'success',message:'Data edited successfully'});
            history.goBack();
        })
    }

    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to User Onboard" />
            </div>
            <div className="create_header">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="font-bold-20 user-title">{formStatus ? 'Edit User' : 'Create New User'}</label>
                    </div>
                    <div className="blank" />
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
                            <label className="font-regular-16">Gender</label>
                            <div className='select_dropdown'>
                                <Select
                                    onChange={(e)=> setGender(e)}
                                    value={gender} style={{width:"100%",height:40,paddingTop:4,backgroundColor:'#F9F9F9',borderWidth: 0.5, borderColor:  "#C0C0C0"}}>
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
                        <div className="col-2"><NormalButton dasboardButton label={formStatus ? 'Update' : 'Add'} /></div>
                    </div>
                </form>
            </div>
        </>
    )
};
export default CreateUser;
