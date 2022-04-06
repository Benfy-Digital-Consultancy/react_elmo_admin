import React, { useState } from "react";
import "./ProductCategoryView.scss";
import { CommonSelect } from "components/Common/CommonSelect";
import { CommonInput } from "components/Common/CommonInput";
import { FileUpload } from "components/Common/FileUpload";
import validate from "service/validation";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { validationRules } from "./validate";
import { useHistory } from "react-router";

const ProductCategoryView = () => {
  const history = useHistory();

  const breadCrumbsList = [
    {
      redirection: () => history.push("/buy-investment"),
      label: "Corporate Fixed Deposits",
    },
    {
      label: "Mahindra Financial Services",
    },
  ];

  const [formDetails, setFormDetails] = useState({});
  const [errors, setErrors] = useState({
    motherName: "",
    tenure: "",
    amount: "",
    fatherName: "",
    Frequency_Type: "",
    cheque: null,
    address: null,
    identity: null,
  });

  const handleChange = ({ target: { name, value } }) => {
    const tempErrors = { ...errors };
    tempErrors[name] = undefined;
    setErrors({ ...tempErrors });
    setFormDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileUpload = (e, fileType) => {
    let file = e.target.files[0];
    if (file) {
      const tempErrors = { ...errors };
      tempErrors[fileType] = undefined;
      setErrors({ ...tempErrors });
      setFormDetails((prevState) => ({
        ...prevState,
        [fileType]: URL.createObjectURL(file),
      }));
    }
  };

  //validate Fields
  const validateFields = (data) => {
    const fieldInvalidList = validate(data, validationRules());
    if (fieldInvalidList !== undefined) {
      setErrors({ ...errors, ...fieldInvalidList });
    }
    return !fieldInvalidList;
  };

  return (
    <div className="product-category-view">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-3">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
        <div className="sub-text">
          <p className="mb-0" onClick={() => history.goBack()}>
            Cancel
          </p>
        </div>
      </div>
      <h4 className="fs-16 fw-600">MAHINDRA FINANCE FIXED DEPOSIT SCHEME</h4>
      <div className="sub-title">
        ROI date: <strong>16 Aug 2021</strong> Ratings:{" "}
        <strong>FAAA BY CRISIL</strong>
      </div>
      <div className="row">
        <div className="col-4">
          <CommonInput
            label="MIN AMOUNT: Rs. 1000"
            type="number"
            name="amount"
            onChange={handleChange}
            value={formDetails.amount}
            errorMessage={errors.amount || null}
            isSubTextRequired={true}
          />
        </div>
        <div className="col-4">
          <CommonSelect
            placeholder="Select"
            options={[
              { label: "60", value: "60" },
              { label: "48", value: "48" },
              { label: "36", value: "36" },
              { label: "24", value: "24" },
              { label: "12", value: "12" },
            ]}
            name="tenure"
            value={formDetails.tenure}
            label="Tenure"
            onChange={handleChange}
            errorMessage={errors.tenure || null}
          />
        </div>
        <div className="col-4">
          <CommonSelect
            placeholder="Select"
            options={[
              { label: "Monthly", value: "Monthly" },
              { label: "Quarterly", value: "Quarterly" },
              { label: "Semi annual", value: "Semi annual" },
              { label: "Annual", value: "Annual" },
              { label: "Cumulative", value: "Cumulative" },
            ]}
            name="Frequency_Type"
            value={formDetails.Frequency_Type}
            label="Interest payment frequency"
            onChange={handleChange}
            errorMessage={errors.Frequency_Type || null}
          />
        </div>
        <div className="col-4">
          <CommonInput
            label="Father’s name"
            name="fatherName"
            onChange={handleChange}
            value={formDetails.fatherName}
            errorMessage={errors.fatherName || null}
            subClassName
          />
        </div>
        <div className="col-4">
          <CommonInput
            label="Mother’s name"
            name="motherName"
            onChange={handleChange}
            value={formDetails.motherName}
            errorMessage={errors.motherName || null}
            subClassName
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <FileUpload
            label="Cancelled cheque"
            subClassName
            onChange={(e) => handleFileUpload(e, "cheque")}
          />
        </div>
        <div className="col-4">
          <FileUpload
            label="Prood address"
            subClassName
            onChange={(e) => handleFileUpload(e, "address")}
          />
        </div>
        <div className="col-4">
          <FileUpload
            label="Proof of identity"
            subClassName
            onChange={(e) => handleFileUpload(e, "identity")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryView;
