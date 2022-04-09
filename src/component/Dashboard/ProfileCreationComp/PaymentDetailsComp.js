import React from "react";
import logo from "assets/images/meradoc.png";
import "./styles.scss";
import { useForm } from "react-hook-form";
import FormInput from "component/common/FormInput";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import TextBox from "component/common/TextBox/TextBox";
import UploadImageTextBox from "component/common/UploadImageTextBox";

const PaymentDetailsComp = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  return (
    <div>
      <div className="main-container">
        <div className="basicSection py-4">
          <div>
            <img src={logo} alt="logo" />
          </div>

          <div className="sectionCall mt-4">
            <h3 className="sectionHead pb-2 mb-0">Payment Details</h3>
            <div className="row">
              <div className="col-9">
                <div className="row mt-5">
                  <div className="col-4">
                    <div>
                      <label>Beneficiary Name*</label>
                      <FormInput
                        placeholder="Enter beneficiary name"
                        errors={errors}
                        name="beneficiaryName"
                        register={register({
                          required: true,
                        })}
                        error={errors.beneficiaryName}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Bank Name*</label>
                      <FormInput
                        placeholder="Enter bank name "
                        errors={errors}
                        name="bankName "
                        register={register({
                          required: true,
                        })}
                        error={errors.bankName}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Branch Name*</label>
                      <FormInput
                        placeholder="Enter branch name "
                        errors={errors}
                        name="branchname "
                        register={register({
                          required: true,
                        })}
                        error={errors.branchname}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <div>
                      <label>Account type*</label>
                      <NormalMultiSelect />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Account Number*</label>
                      <FormInput
                        placeholder="Enter your account number"
                        errors={errors}
                        name="accountNumber "
                        register={register({
                          required: true,
                        })}
                        error={errors.accountNumber}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>NEFT/IFSC*</label>
                      <FormInput
                        placeholder="Enter code"
                        errors={errors}
                        name="neft"
                        register={register({
                          required: true,
                        })}
                        error={errors.neft}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <div>
                      <label>Bank Address*</label>
                      <TextBox />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <div>
                      <label>TDS*</label>
                      <FormInput
                        placeholder="Enter TDS Number"
                        errors={errors}
                        name="tds"
                        register={register({
                          required: true,
                        })}
                        error={errors.tds}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>PAN card No*</label>
                      <FormInput
                        placeholder="Enter PAN number"
                        errors={errors}
                        name="panNo "
                        register={register({
                          required: true,
                        })}
                        error={errors.panNo}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>Service Tax*</label>
                      <FormInput
                        placeholder="Enter service tax"
                        errors={errors}
                        name="serviceTax "
                        register={register({
                          required: true,
                        })}
                        error={errors.serviceTax}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <div>
                      <label>TDS*</label>
                      <UploadImageTextBox />
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label>PAN card No*</label>
                      <FormInput
                        placeholder="Enter PAN number"
                        errors={errors}
                        name="panNo "
                        register={register({
                          required: true,
                        })}
                        error={errors.panNo}
                        messages={{
                          required: "Mail ID is required",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsComp;
