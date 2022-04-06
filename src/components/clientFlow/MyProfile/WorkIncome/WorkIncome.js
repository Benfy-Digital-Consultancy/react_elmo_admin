import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { getAllMasterDetails } from "redux/action/clientFlow/MyProfileAct";
import { PageLoader } from "components/Common/PageLoader";
import { date } from "service/helperFunctions";
import { useLang } from "hooks/useLang";

const WorkIncome = (props) => {
  const { Labels } = useLang();
  const { personalData, getAllMasterDetailsApi } = props;
  const newData = personalData?.clientDetails;
  const { clientMasterMFD } = newData;
  const [alldata, setAllData] = useState();
  const [occupationType, setOccupationType] = useState();
  const [sourceType, setSourceType] = useState();
  const [incomeType, setIncomeType] = useState();
  const [taxType, setTaxType] = useState();
  const [iamType, setIamType] = useState();
  const [loading, setLoading] = useState(false);
  const DOB = date(clientMasterMFD?.CLIENT_DOB, "DD/MM/YYYY");

  useEffect(() => {
    setLoading(true);
    getAllMasterDetailsApi()
      .then((data) => {
        setAllData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [getAllMasterDetailsApi]);

  useEffect(() => {
    for (let i = 0; i < alldata?.mst_Occupation?.length; i++) {
      if (
        alldata?.mst_Occupation[i]?.Occupation_Code ===
        clientMasterMFD?.CLIENT_OCCUPATION_CODE
      ) {
        setOccupationType(alldata?.mst_Occupation[i]?.Occupation);
      }
    }
  }, [clientMasterMFD, alldata?.mst_Occupation]);

  useEffect(() => {
    for (let i = 0; i < alldata?.mst_SourceOfWealth?.length; i++) {
      if (
        alldata?.mst_SourceOfWealth[i]?.Source_Code ===
        newData?.clientFatcaReportUpload[0]?.SRCE_WEALT
      ) {
        setSourceType(alldata?.mst_SourceOfWealth[i]?.Source);
      }
    }
  }, [newData, alldata?.mst_SourceOfWealth]);

  useEffect(() => {
    for (let i = 0; i < alldata?.ApplicantIncomeMaster?.length; i++) {
      if (
        alldata?.ApplicantIncomeMaster[i]?.Income_Code ===
        Number(newData?.clientFatcaReportUpload[0]?.INC_SLAB)
      ) {
        setIncomeType(alldata?.ApplicantIncomeMaster[i]?.Income);
      }
    }
  }, [newData, alldata?.ApplicantIncomeMaster]);

  useEffect(() => {
    for (let i = 0; i < alldata?.mst_TaxStatus?.length; i++) {
      if (
        alldata?.mst_TaxStatus[i]?.Tax_Code ===
        clientMasterMFD?.CLIENT_TAXSTATUS
      ) {
        setTaxType(alldata?.mst_TaxStatus[i]?.Tax_Status);
      }
    }
  }, [clientMasterMFD, alldata?.mst_TaxStatus]);

  useEffect(() => {
    for (let i = 0; i < alldata?.mst_PEP_FLAG?.length; i++) {
      if (
        alldata?.mst_PEP_FLAG[i]?.PEP_FLAG_Value ===
        newData?.clientFatcaReportUpload[0]?.PEP_FLAG
      ) {
        setIamType(alldata?.mst_PEP_FLAG[i]?.PEP_FLAG);
      }
    }
  }, [newData, alldata?.mst_PEP_FLAG]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="list-outer w-50 col-1 mb-20">
        <div className="list">
          <div className="label">{Labels?.name}: </div>
          <div className="value">{clientMasterMFD?.CLIENT_APPNAME1}</div>
        </div>
        <div className="list">
          <div className="label">{Labels?.DOB}: </div>
          <div className="value">{DOB}</div>
        </div>
        <div className="list">
          <div className="label">{Labels?.pan}: </div>
          <div className="value">{clientMasterMFD?.CLIENT_PAN}</div>
        </div>
        <div className="list">
          <div className="label">{Labels?.occupation}: </div>
          <div className="value">{occupationType}</div>
        </div>
        <div className="list">
          <div className="label">{Labels?.sourceWealth}: </div>
          <div className="value">{sourceType}</div>
        </div>
        <div className="list">
          <div className="label">{Labels?.incomeTab}: </div>
          <div className="value">{incomeType}</div>
        </div>
        <div className="list">
          <div className="label">{Labels?.taxStatus}: </div>
          <div className="value">{taxType}</div>
        </div>
        <div className="list">
          <div className="label">{Labels?.iAm}: </div>
          <div className="value">{iamType}</div>
        </div>
      </div>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllMasterDetailsApi: getAllMasterDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(WorkIncome));
