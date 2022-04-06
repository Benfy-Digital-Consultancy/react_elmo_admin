import React, { useEffect, useCallback, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Popup from "components/Common/Popup/Popup";
import { CommonInput } from "components/Common/CommonInput";
import { NormalRadioButton } from "components/Common/NormalRadioButton";
import { NormalCheckbox } from "components/Common/NormalCheckbox";
import { DisableKeyInput } from "components/Common/DisableKeyInput";
import { endpoints } from "service/helpers/config";
import {
  getFilterIFSCCode,
  GetGenerateClientMandate,
} from "redux/action/clientFlow/BuyInvestAct";
import { getDataFromStorage } from "service/helperFunctions";
import { Toast } from "service/toast";
import { useLang } from "hooks/useLang";

const { code200 } = endpoints.status_code;
const { success_title, error_title } = endpoints.response_error_msg;

const numToWords = require("number-to-words");

const CreateMandate = ({
  setCreateMandatePopup,
  createmandateView = false,
  handleToHelpModal,
  getFilterIFSCCodeApiCall,
  GetGenerateClientMandateApiCall,
  kycData,
}) => {
  const [formFields, setFormFields] = useState({
    CreateMandateAmount: "30000",
    createRadioBtn: "ENach",
  });
  const [ifscData, setIfscData] = useState([]);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(null);
  const [userRoleDetails, setUserRoleDetails] = useState({});
  const { Labels, errorText } = useLang();

  const disabledKey = formFields?.CreateMandateAmount.length === 8;

  const handleChange = ({ target: { name, value } }) => {
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "createRadioBtn") {
      let filterIndex = ifscData.findIndex((x) => x.DefaultFlag === "Y");
      if (filterIndex !== undefined) {
        setCurrentActiveIndex(filterIndex);
      }
    }
  };

  const getFilterIfscFn = useCallback(
    (query) => {
      getFilterIFSCCodeApiCall(query).then((data) => {
        let filterIfscData = data?.filterIFSCs;

        let filterIndex = filterIfscData.findIndex(
          (x) => x.DefaultFlag === "Y"
        );
        if (filterIndex !== undefined) {
          setCurrentActiveIndex(filterIndex);
        }
        setIfscData([...filterIfscData]);
      });
    },
    [getFilterIFSCCodeApiCall, setCurrentActiveIndex]
  );

  useEffect(() => {
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    setUserRoleDetails(userRoleData);
    const { ClientCode } = userRoleData;

    let query = {
      ClientCode: ClientCode,
      MandateType: "N",
    };
    getFilterIfscFn(query);
  }, [getFilterIfscFn]);

  // handleCreateMandate
  const handleCreateMandate = () => {
    let filterBankData = ifscData.find((x, id) => id === currentActiveIndex);
    const { CreateMandateAmount, createRadioBtn } = formFields;
    const { clientMasterMFD } = kycData || {};
    let payload = {
      AccountType: filterBankData?.AccountType,
      Amount: CreateMandateAmount,
      MandateType: createRadioBtn === "ENach" ? "N" : "X",
      CLIENT_ACCNO1: filterBankData?.AccountNo,
      CLIENT_CODE: userRoleDetails?.ClientCode,
      CLIENT_NEFT_IFSCCODE1: filterBankData?.IFSCCode,
      created_by: userRoleDetails?.ClientCode,
      created_date: new Date(),
      IP: sessionStorage.getItem(endpoints.auth.IP),
      modified_by: userRoleDetails?.ClientCode,
      modified_date: new Date(),
      sub_broker_code: userRoleDetails?.SubBroker_Code,
      ums_id: clientMasterMFD?.ums_id,
    };
    GetGenerateClientMandateApiCall(payload).then((data) => {
      setCreateMandatePopup(false);
      let { response } = data;
      let ResponseStatus =
        response?.status_code === code200
          ? endpoints.success
          : endpoints.unsuccess;
      if (ResponseStatus === endpoints.success) {
        Toast({
          type: success_title,
          message: response?.message,
        });
      } else {
        Toast({
          type: error_title,
          message: response?.message,
        });
      }
    });
  };

  return (
    <div className="all-mandate-page">
      <div className="create-mandate-popup">
        <Popup isOpen={createmandateView} setPopup={setCreateMandatePopup}>
          <div className="title">{Labels.createMandate}</div>
          <div className="scroll-mandate">
            <div className="">
              <CommonInput
                label={Labels.mandateAmount}
                type="number"
                placeholder={Labels.mandateAmount}
                name="CreateMandateAmount"
                isSubTextRequired={true}
                onChange={handleChange}
                disabled={disabledKey}
                value={formFields?.CreateMandateAmount}
              />

              {disabledKey && (
                <DisableKeyInput
                  handleChange={handleChange}
                  name="CreateMandateAmount"
                />
              )}
              {formFields?.CreateMandateAmount && (
                <span className="notes">
                  {numToWords.toWords(formFields?.CreateMandateAmount) +
                    " Rupees only"}
                </span>
              )}

              <div className="mandate-radio-container">
                <NormalRadioButton
                  id="ENach"
                  checked={formFields?.createRadioBtn === "ENach"}
                  onChange={(e) => {
                    let body = {
                      target: {
                        name: "createRadioBtn",
                        value: e.target.value,
                      },
                    };
                    handleChange(body);
                  }}
                  label={Labels.enach}
                  name="ENach"
                  className={
                    formFields?.createRadioBtn === "ENach" &&
                    "HightlightRadioBtn"
                  }
                />
                <NormalRadioButton
                  id="Physical"
                  checked={formFields?.createRadioBtn === "Physical"}
                  onChange={(e) => {
                    let body = {
                      target: {
                        name: "createRadioBtn",
                        value: e.target.value,
                      },
                    };

                    handleChange(body);
                  }}
                  label={Labels.physicalBank}
                  name={"Physical"}
                  className={
                    formFields?.createRadioBtn === "Physical" &&
                    "HightlightRadioBtn"
                  }
                />
              </div>
            </div>

            <div className="mandates-bank-details">
              <div className="mandate-select-title">
                <span>{errorText?.mandate?.accountSelect}</span>
              </div>

              {ifscData &&
                ifscData.map((item, index) => {
                  return (
                    <div key={index} className="mandate-bank-data">
                      <div>
                        <NormalCheckbox
                          className="custom-checkbox check-box"
                          name="createMandateBankCheckbox"
                          checked={currentActiveIndex === index}
                          onChange={() => setCurrentActiveIndex(index)}
                        />
                      </div>
                      <div className="bank-details-parent">
                        <div>
                          <h6 className="bank-title-normal d-flex">
                            {Labels.bank} : {item?.BankName}
                            <span className="bank-defalut-higlight">
                              {item?.DefaultFlag === "Y" && "Default"}
                            </span>
                          </h6>
                          <h6 className="bank-title-normal ">
                            {Labels.accountNo} :{" "}
                            <span className="bank-title-bold">
                              {item?.AccountNo}
                            </span>
                          </h6>
                          <h6 className="bank-title-normal">
                            {Labels.IFSC} :{" "}
                            <span className="bank-title-bold">
                              {item?.IFSCCode}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mandate-btn-container">
              <h6 onClick={handleCreateMandate} className="create-btn-wrap">
                {Labels.create}
              </h6>
              <h6 onClick={handleToHelpModal} className="mandate-help-btn">
                {Labels.help}
              </h6>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getFilterIFSCCodeApiCall: getFilterIFSCCode,
      GetGenerateClientMandateApiCall: GetGenerateClientMandate,
    },
    dispatch
  );
};
let mapStateToProps = (state) => {
  return {
    kycData: state.dashboardStore.kycList,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateMandate));
