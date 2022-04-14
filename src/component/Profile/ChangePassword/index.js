import React, { useState } from "react";
import '../styles.scss'
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import NormalButton from "component/common/NormalButton/NormalButton";
import { AppBack } from "component/common/AppBack";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import { useForm } from "react-hook-form";
import { Toast } from "service/toast";
import FormErrorMessage from "component/common/ErrorMessage";
import { request } from "service";
import endponts from "service/endponts";

const ChangePassword = (props) => {
    let history = useHistory();
    const { register, handleSubmit, errors, reset } = useForm();
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = (inputs) => {
        if(inputs.newPassword != inputs.confirmPassword){
            Toast({type:'error',message:'New password and Confirm Password is not same.'})
            return
        }

        delete inputs["confirmPassword"];

        request({
            url:endponts.Endpoints.changePassword,
            method:endponts.APIMethods.PUT,
            data:{
                ...inputs
            }
        }).then(res=>{
            Toast({type:'success',message:res?.data?.message});
            history.goBack()
        })


    }

    return (
        <>
            <div>
                <AppBack onClick={() => history.goBack()} label="Back to Settings" />
            </div>
            <div className="create_header">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="profile-container-change mb-3">
                        <label className="font-bold-20 profile-content">Change Password</label>
                    </div>
                    <div className="blank" />
                    <div className="row pt-4">
                        <div className="col-6">
                            <label className="font-regular-16">Current Password *</label>
                            <FormInput
                                errors={errors}
                                type={"text"}
                                value={currentPassword}
                                name="currentPassword"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.currentPassword}
                                messages={{
                                    required: "Please enter Current Password",
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <label className="font-regular-16">New Password *</label>
                            <FormInput
                                errors={errors}
                                type={"text"}
                                value={newPassword}
                                name="newPassword"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.newPassword}
                                messages={{
                                    required: "Please enter New Password",
                                }}
                            />
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-6">
                            <label className="font-regular-16">Confirm Password *</label>
                            <FormInput
                                errors={errors}
                                type={"text"}
                                value={confirmPassword}
                                name="confirmPassword"
                                register={register({
                                    required: true,
                                })} />
                            <FormErrorMessage
                                error={errors.confirmPassword}
                                messages={{
                                    required: "Please enter Confirm Password",
                                }}
                            />
                        </div>

                    </div>

                    <div className="row mt-3">
                        <div className="col-2"><NormalButton onClick={() => history.goBack()} outlineButton label="Cancel" className="font-bold-16" /></div>
                        <div className="col-2"><NormalButton dasboardButton label="Change Password" /></div>
                    </div>
                </form>
            </div>
        </>
    )
};
export default ChangePassword;
