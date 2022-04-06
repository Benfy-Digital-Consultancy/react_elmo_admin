import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getBankDetailsIFSC,
  getAllMasterDetails,
} from "redux/action/clientFlow/MyProfileAct";
import { EmptyRecord } from "components/Common/EmptyRecord";
import { PageLoader } from "components/Common/PageLoader";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import "../MyProfile.scss";

const Bank = (props) => {
  const { Labels } = useLang();
  const { bankData, getBankDetailsIFSCApi, getAllMasterDetailsApi } = props;
  const newData = bankData?.clientDetails;
  const { clientMasterMFD } = newData;
  const [bankDetails, setBankDetails] = useState([]);
  const [accountType, setAccountType] = useState([]);
  const [defaultFlag, setDefaultFlag] = useState([]);
  const [accountNumber, setAccountNumber] = useState([]);
  const [bankTypeData, setBankTypeData] = useState([]);
  const [verified, setVerified] = useState([]);
  const [bankType, setBankType] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let ifscCodes = [
      clientMasterMFD?.CLIENT_NEFT_IFSCCODE1,
      clientMasterMFD?.CLIENT_NEFT_IFSCCODE2,
      clientMasterMFD?.CLIENT_NEFT_IFSCCODE3,
      clientMasterMFD?.CLIENT_NEFT_IFSCCODE4,
      clientMasterMFD?.CLIENT_NEFT_IFSCCODE5,
    ];
    let bankData = [];
    for (let i = 0; i < ifscCodes?.length; i++) {
      if (ifscCodes[i] !== endpoints?.emptyString) {
        let data = {
          ifscCode: ifscCodes[i],
        };
        getBankDetailsIFSCApi(data)
          .then((data) => {
            bankData.push(data);
            setBankDetails({ bankData });
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        return null;
      }
    }
  }, [getBankDetailsIFSCApi, clientMasterMFD]);

  useEffect(() => {
    let accData = [];
    let accType = [
      clientMasterMFD?.CLIENT_ACCTYPE1,
      clientMasterMFD?.CLIENT_ACCTYPE_2,
      clientMasterMFD?.CLIENT_ACCTYPE_3,
      clientMasterMFD?.CLIENT_ACCTYPE_4,
      clientMasterMFD?.CLIENT_ACCTYPE_5,
    ];
    for (let i = 0; i < accType?.length; i++) {
      if (accType[i] !== endpoints?.emptyString) {
        accData.push(accType[i]);
        setAccountType({ accData });
      } else {
        return null;
      }
    }
  }, [clientMasterMFD]);

  useEffect(() => {
    let flagData = [];
    let flagType = [
      clientMasterMFD?.DEFAULT_BLANK_FLAG1,
      clientMasterMFD?.DEFAULT_BLANK_FLAG2,
      clientMasterMFD?.DEFAULT_BLANK_FLAG3,
      clientMasterMFD?.DEFAULT_BLANK_FLAG4,
      clientMasterMFD?.DEFAULT_BLANK_FLAG5,
    ];
    for (let i = 0; i < flagType?.length; i++) {
      if (flagType[i] !== endpoints?.emptyString) {
        flagData.push(flagType[i]);
        setDefaultFlag({ flagData });
      } else {
        return null;
      }
    }
  }, [clientMasterMFD]);

  useEffect(() => {
    let accNoData = [];
    let accNoType = [
      clientMasterMFD?.CLIENT_ACCNO1,
      clientMasterMFD?.CLIENT_ACCNO2,
      clientMasterMFD?.CLIENT_ACCNO3,
      clientMasterMFD?.CLIENT_ACCNO4,
      clientMasterMFD?.CLIENT_ACCNO5,
    ];
    for (let i = 0; i < accNoType?.length; i++) {
      if (accNoType[i] !== endpoints?.emptyString) {
        accNoData.push(accNoType[i]);
        setAccountNumber({ accNoData });
      } else {
        return null;
      }
    }
  }, [clientMasterMFD]);

  useEffect(() => {
    let validData = [];
    let validType = [
      clientMasterMFD?.IsValBank1,
      clientMasterMFD?.IsValBank2,
      clientMasterMFD?.IsValBank3,
      clientMasterMFD?.IsValBank4,
      clientMasterMFD?.IsValBank5,
    ];
    for (let i = 0; i < validType?.length; i++) {
      if (validType[i] !== endpoints?.emptyString) {
        validData.push(validType[i]);
        setVerified({ validData });
      } else {
        return null;
      }
    }
  }, [clientMasterMFD]);

  useEffect(() => {
    getAllMasterDetailsApi().then((data) => {
      setBankTypeData(data?.AccountTypeMaster);
    });
  }, [getAllMasterDetailsApi]);

  console.log("bankTypeData", bankTypeData);

  useEffect(() => {
    let results = [];
    for (var i = 0; i < accountType?.accData?.length; i++) {
      for (var j = 0; j < bankTypeData?.length; j++) {
        if (bankTypeData[j]?.Code === accountType?.accData[i]) {
          results.push(bankTypeData[j]?.Details);
          break;
        }
      }
    }
    setBankType(results);
  }, [bankTypeData, accountType?.accData]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      {bankDetails?.bankData?.length > 0 ? (
        bankDetails?.bankData?.map((item, index) => {
          return (
            <div key={index}>
              <div className="bank-title">{item?.BANK}</div>
              <div className="list-outer w-50 col-1 mb-20">
                <div className="list">
                  <div className="label">
                    {Labels?.bankAccount} {index + 1}
                    {defaultFlag?.flagData[index] === endpoints?.Y
                      ? Labels?.default
                      : endpoints?.emptyString}
                    :
                  </div>
                  <div className="value">{bankType[index]}</div>
                </div>
                <div className="list">
                  <div className="label">{Labels?.accountNo}: </div>
                  <div className="value">
                    {accountNumber?.accNoData[index]}
                    <span>
                      {verified?.validData[index] === 1
                        ? Labels?.verified
                        : Labels?.nonVerified}
                    </span>
                  </div>
                </div>
                <div className="list">
                  <div className="label">{Labels?.IFSC}: </div>
                  <div className="value">{item?.IFSC}</div>
                </div>
                <div className="list">
                  <div className="label">{Labels?.branchAddress}: </div>
                  <div className="value">
                    {item?.BANK} <br />
                    {item?.ADDRESS}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyRecord />
      )}
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBankDetailsIFSCApi: getBankDetailsIFSC,
      getAllMasterDetailsApi: getAllMasterDetails,
    },
    dispatch
  );
};

let mapStateToProps = (state) => {
  return {
    bankDetailsData: state.myProfileStore.bankDetailsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Bank));
