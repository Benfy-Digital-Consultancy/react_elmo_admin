import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { getSchemeProductDetails } from "redux/action/clientFlow/BuyInvestAct";
import { getSchemeDataFromProduct } from "redux/action/clientFlow/DashboardAct";
import "./style.scss";
import { BreadCrumbs } from "components/Common/BreadCrumbs";
import { PageLoader } from "components/Common/PageLoader";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { CommonInput } from "components/Common/CommonInput";
import InfoIcon from "assets/images/info.svg";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import { DisableKeyInput } from "components/Common/DisableKeyInput";
import { CommonSelect } from "components/Common/CommonSelect";
import { saveCallLog } from "redux/action/clientFlow/SellAct";
import { getDataFromStorage, handleSubtypeId } from "service/helperFunctions";
import ErrorComponent from "components/Common/ErrorComponent";
import { FileUpload } from "components/Common/FileUpload";
import Popup from "components/Common/Popup/Popup";
import { ToolTip } from "components/Common/ToolTip";
import { InfoPopup } from "components/Common/InfoPopup";

const numToWords = require("number-to-words");

const ProductForm = (props) => {
  const history = useHistory();
  const { Labels, errorText } = useLang();
  const { productName, productId, schemeName } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [schemeDetails, setSchemeDetails] = useState(null);
  const [errorValidation, setErrorValidation] = useState(null);
  const [frequencyList, setFrequencyList] = useState([]);
  const [tenureList, setTenureList] = useState([]);
  const [FieldList, setFieldList] = useState([]);
  const [docList, setDocumentList] = useState([]);
  const [infoPopup, setInfoPopup] = useState(false);
  const [schemeData, setSchemeData] = useState(null);
  const [formFields, setFormDetails] = useState({
    Frequency_Type: "",
    tenure: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorList, setErrorList] = useState([]);
  let errorObj = { ...endpoints.oneTimeError };
  let investError = { ...errorText.investError };
  const {
    getSchemeProductDetailsApi,
    saveCallLogApi,
    getSchemeDataFromProductApi,
  } = props;
  const [userRoleDetails, setUserRoleDetails] = useState({});

  const breadCrumbsList = [
    { redirection: () => history.push("/dashboard"), label: Labels.dashboard },
    { redirection: () => history.goBack(), label: productName },
    { label: schemeName },
  ];

  const getSchemeListFromProductApiFunc = useCallback(() => {
    if (productId && schemeName) {
      setIsLoading(true);
      let payload = {
        ProductId: productId,
        LanguageId: 2,
        SchemeBaseName: schemeName,
      };
      let temperrorList = [...errorList];
      getSchemeProductDetailsApi(payload)
        .then(({ ObjectResponse }) => {
          if (ObjectResponse) {
            let {
              SchemeFrequencyList = [],
              TenureDropdownList = [],
              DocumentList,
            } = ObjectResponse;
            if (ObjectResponse.FieldList !== 0) {
              let options = [];
              ObjectResponse.FieldList.forEach((list) => {
                options.push({ ...list, value: "" });
                temperrorList.push(list.FieldName);
              });
              if (options.length === ObjectResponse.FieldList.length) {
                setFieldList([...options]);
              }
            }
            if (DocumentList.length !== 0) {
              let docOptions = [];
              DocumentList.forEach((list) => {
                docOptions.push({ ...list, value: "" });
                temperrorList.push(list.DocumentName);
              });
              if (docOptions.length === DocumentList.length) {
                setDocumentList([...docOptions]);
              }
            }
            if (SchemeFrequencyList.length !== 0) {
              let frequecyOptions = [];
              SchemeFrequencyList.forEach((list) =>
                frequecyOptions.push({
                  label: list.FrequencyName,
                  value: list.FrequencyName,
                })
              );
              if (frequecyOptions.length === SchemeFrequencyList.length) {
                temperrorList.push("frequency");
                setFrequencyList([...frequecyOptions]);
              }
            }
            if (TenureDropdownList.length !== 0) {
              let tenureOptions = [];
              TenureDropdownList.map((list) =>
                tenureOptions.push({
                  label: list.Tenure,
                  value: list.Tenure,
                })
              );
              if (tenureOptions.length === TenureDropdownList.length) {
                temperrorList.push("tenure");
                setTenureList([...tenureOptions]);
              }
            }
            setProductDetails(ObjectResponse);
            setSchemeDetails(ObjectResponse.SchemeData);
            setErrorList([...temperrorList]);
          }
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [getSchemeProductDetailsApi, productName, productId]);

  useEffect(() => {
    getSchemeListFromProductApiFunc();
  }, [getSchemeListFromProductApiFunc]);

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    setUserRoleDetails(userRoleData);
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    const tempErrors = { ...errors };
    tempErrors[name] = undefined;
    setErrors({ ...tempErrors });
    setErrorValidation(null);
    setSchemeDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeForm = ({ target: { name, value } }) => {
    const tempErrors = { ...errors };
    tempErrors[name] = undefined;
    setErrors({ ...tempErrors });
    setFormDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeField = ({ target: { name, value } }, index) => {
    const tempErrors = { ...errors };
    tempErrors[name] = undefined;
    setErrors({ ...tempErrors });
    FieldList[index].value = value;
    setFieldList([...FieldList]);
  };

  const handleFileUpload = (e, name, index) => {
    let file = e.target.files[0];
    if (file) {
      const tempErrors = { ...errors };
      tempErrors[name] = undefined;
      setErrors({ ...tempErrors });
      docList[index].value = file;
      setDocumentList([...docList]);
    }
  };

  const handleInfo = (id) => {
    setInfoPopup(false);
    let body = {
      ProductCategoryId: id,
      LanguageId: endpoints.auth.LanguageId,
      ClientCode: "",
      device: "",
      AMCCode: "",
      SebiCategoryId: "",
      SebiSubCategoryId: "",
      DefaultProductId: "",
    };
    getSchemeDataFromProductApi(body).then((data) => {
      if (data?.ObjectResponse?.TitleResponse) {
        setSchemeData({ ...data?.ObjectResponse?.TitleResponse[0] });
        setInfoPopup(true);
      }
    });
  };

  //handle Submit
  const handleSubmit = () => {
    let minAmount = parseInt(schemeDetails.OtherProductMINAmount || 0);
    let maxAmount = parseInt(schemeDetails.OtherProductMAXAmount || 0);
    let validateAmount =
      schemeDetails.Description !== "" || schemeDetails.Description !== null;
    let validateField = FieldList.filter((key) => key.value === "");

    let validateDoc = docList.filter((key) => key.value === "");
    let validateTenure = tenureList !== 0 ? formFields.tenure !== "" : true;
    let validateFrequency =
      frequencyList !== 0 ? formFields.Frequency_Type !== "" : true;

    if (
      validateAmount &&
      validateField.length === 0 &&
      validateDoc.length === 0 &&
      validateTenure &&
      validateFrequency
    ) {
      if (minAmount === 0 && maxAmount === 0) {
        handleApiCall();
      } else if (minAmount !== 0 && maxAmount !== 0) {
        if (schemeDetails.Description < minAmount) {
          setErrorValidation(errorObj.min + minAmount);
        } else if (schemeDetails.Description < maxAmount) {
          setErrorValidation(errorObj.max + maxAmount);
        } else {
          handleApiCall();
        }
      } else if (minAmount !== 0) {
        if (schemeDetails.Description < minAmount) {
          setErrorValidation(errorObj.min + minAmount);
        } else {
          handleApiCall();
        }
      } else if (maxAmount !== 0) {
        if (schemeDetails.Description > maxAmount) {
          setErrorValidation(errorObj.max + maxAmount);
        } else {
          handleApiCall();
        }
      }
    } else {
      if (
        schemeDetails.Description === "" ||
        schemeDetails.Description === null
      ) {
        errors.Description = investError.amount;
      }
      FieldList.forEach((key) => {
        if (key.value === "" || key.value === null) {
          errors[key.FieldName] = investError.field + key.FieldName;
        } else {
          errors[key.FieldName] = "";
        }
      });

      docList.forEach((key) => {
        if (key.value === "" || key.value === null) {
          errors[key.DocumentName] = investError.file + key.DocumentName;
        } else {
          errors[key.DocumentName] = "";
        }
      });
      if (tenureList !== 0 && formFields.tenure === "") {
        errors.tenure = investError.tenure;
      }
      if (frequencyList !== 0 && formFields.Frequency_Type === "") {
        errors.Frequency_Type = investError.frequency;
      }
      setErrors({ ...errors });
    }
  };

  //handle Api Call
  const handleApiCall = () => {
    let { ClientCode } = userRoleDetails;
    let descriptionText = `${schemeDetails.SchemeBaseName.replace(" ", "_")}`;
    descriptionText =
      descriptionText + ` #Amount: ${schemeDetails.Description}`;
    if (tenureList.length !== 0) {
      descriptionText = descriptionText + ` #Tenure: ${formFields.tenure}`;
    }
    if (frequencyList.length !== 0) {
      descriptionText =
        descriptionText + ` #Frequency: ${formFields.Frequency_Type}`;
    }
    if (FieldList.length !== 0) {
      FieldList.forEach((list) => {
        descriptionText =
          descriptionText +
          ` #${
            list.FieldName === "Fathers Name" ? "FatherName" : "MotherName"
          }: ${list.value}`;
      });
    }

    let payload = {
      Type: "Client",
      Code: ClientCode,
      ModeId: "5",
      CallTypeId: "25",
      LogTypeId: "1",
      AssignedToRole: "3",
      Status: "1",
      Description: descriptionText,
      CreatedBy: ClientCode,
      ModifiedBy: ClientCode,
      SubTypeId: handleSubtypeId(productId),
      // FileUpload: docList,
    };
    saveCallLogApi(payload).then(({ response, ObjectResponse }) => {
      if (response.status_code === endpoints.status_code.code200) {
        setIsOpen(true);
        setResponseMessage(ObjectResponse?.Result);
      }
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  const disabledKey = schemeDetails?.Description?.length === 12;

  return (
    <div className="product-list">
      <div className="p-3">
        <BreadCrumbs breadCrumbsList={breadCrumbsList} />
      </div>
      <div className="product-details">
        {productDetails ? (
          <div>
            <div className="d-flex align-items-center w-100 justify-content-between">
              <h3 className="product-title">{schemeDetails?.SchemeBaseName}</h3>
              <div className="right px-3">
                <ToolTip
                  children={
                    <img
                      className="cursor-pointer"
                      src={InfoIcon}
                      alt="InfoIcon"
                      onClick={() => handleInfo(productId)}
                    />
                  }
                  label={Labels.schemeDetails}
                />
              </div>
            </div>
            <div className="row">
              {schemeDetails?.Ratings && (
                <div className="col-12">
                  <p className="product-subtitle mb-1">
                    {Labels.ratings}: <b>{schemeDetails.Ratings || "-"}</b>
                  </p>
                </div>
              )}
              {schemeDetails?.ROIDate && (
                <div className="col-12">
                  <p className="product-subtitle mb-1">
                    {Labels.roiDate}: <b>{schemeDetails.ROIDate || "-"}</b>
                  </p>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-6">
                <CommonInput
                  name="Description"
                  onChange={handleChange}
                  value={schemeDetails?.Description}
                  errorMessage={errors.Description || null}
                  subClassName
                  type="number"
                  placeholder={`${Labels.amount} (${Labels.rs})`}
                  disabled={disabledKey}
                  sublabel={`${Labels.minAmount} ${Labels.rs} ${schemeDetails?.OtherProductMINAmount}`}
                />
                {disabledKey && (
                  <DisableKeyInput
                    handleChange={handleChange}
                    name="Description"
                  />
                )}
                {schemeDetails?.Description && (
                  <span className="notes">
                    {numToWords.toWords(schemeDetails.Description) +
                      " Rupees only"}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              {tenureList.length !== 0 && (
                <div className="col-6">
                  <CommonSelect
                    placeholder="Select"
                    options={tenureList}
                    name="tenure"
                    value={formFields.tenure}
                    label="Tenure"
                    subClassName
                    onChange={handleChangeForm}
                    errorMessage={errors.tenure || null}
                  />
                </div>
              )}
              {frequencyList.length !== 0 && (
                <div className="col-6">
                  <CommonSelect
                    placeholder="Select"
                    options={frequencyList}
                    name="Frequency_Type"
                    subClassName
                    value={formFields.Frequency_Type}
                    label="Interest payment frequency"
                    onChange={handleChangeForm}
                    errorMessage={errors.Frequency_Type || null}
                  />
                </div>
              )}
            </div>
            {FieldList.length !== 0 && (
              <div className="row">
                {FieldList.map((list, index) => (
                  <div className="col-6" key={index}>
                    <CommonInput
                      name={list.FieldName}
                      label={list.FieldName}
                      onChange={(e) => handleChangeField(e, index)}
                      value={list.value}
                      errorMessage={errors[list.FieldName] || null}
                      subClassName
                      placeholder={list.FieldName}
                    />
                  </div>
                ))}
              </div>
            )}
            {docList.length !== 0 && (
              <div className="row">
                {docList.map((list, index) => (
                  <div className="col-6" key={index}>
                    <FileUpload
                      label={list.DocumentName}
                      subClassName
                      onChange={(e) =>
                        handleFileUpload(e, list.DocumentName, index)
                      }
                      errorMessage={errors[list.DocumentName] || null}
                    />
                    {/* {list.value && (
                      <p className="fs-14 text-grey-82">{list.value}</p>
                    )} */}
                  </div>
                ))}
              </div>
            )}
            <div className="row mt-4">
              <div className="col-4">
                {errorValidation && (
                  <ErrorComponent message={errorValidation} />
                )}
                <button className="primary-btn" onClick={() => handleSubmit()}>
                  {Labels.submit}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <EmptyRecord />
        )}
      </div>
      <Popup isOpen={isOpen} close={false}>
        <p className="fs-15 text-center px-3">{responseMessage}</p>
        <div className="d-flex justify-content-center">
          <button
            className="primary-btn mx-auto"
            onClick={() => () => history.push("/dashboard")}
          >
            {Labels.close}
          </button>
        </div>
      </Popup>
      {infoPopup && (
        <InfoPopup
          infoPopup={infoPopup}
          schemeData={schemeData}
          handlePopup={(value) => {
            setInfoPopup(value);
            setSchemeData(null);
          }}
        />
      )}
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSchemeProductDetailsApi: getSchemeProductDetails,
      saveCallLogApi: saveCallLog,
      getSchemeDataFromProductApi: getSchemeDataFromProduct,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(ProductForm));
