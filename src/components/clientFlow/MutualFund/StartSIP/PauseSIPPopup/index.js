import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useLang } from "hooks/useLang";
import { saveCallLog } from "redux/action/clientFlow/SellAct";
import { getDataFromStorage } from "service/helperFunctions";
import { endpoints } from "service/helpers/config";
import { Toast } from "service/toast";
import PauseSIPModal from "components/Common/PauseSIPModal";

const PauseSIPPopup = (props) => {
  const { errorText } = useLang();
  const {
    cancelPopup,
    setCancelPopup,
    activeTableTab,
    pause,
    sipUpdatePause,
    selectedValue,
  } = props;
  const { error_title } = endpoints.response_error_msg;
  const { error_message } = errorText?.pausesip_error_message || {};
  const [code, setCode] = useState("");
  const [selItem, setSelItem] = useState(null);
  const [resPopup, setResPopup] = useState(false);
  const [period, setPeriod] = useState("");
  const [response, setResponse] = useState("");
  const [tabList, setTab] = useState();

  const handleTabChange = useCallback(() => {
    let tab =
      (selectedValue?.Folio || selectedValue?.FolioNo) +
      "#" +
      period +
      "#" +
      selectedValue?.SchemeName +
      "#" +
      selectedValue?.ClientCode +
      "#" +
      selectedValue?.ClientName +
      "#" +
      (selectedValue?.SIPRegNo ||
        selectedValue?.SWPRegNo ||
        selectedValue?.STPRegNo);
    setTab(tab);
  }, [period, selectedValue]);

  useEffect(() => {
    handleTabChange(activeTableTab);
  }, [activeTableTab, handleTabChange]);

  const pauseSIP = () => {
    if (period === "") {
      Toast({
        type: error_title,
        message: error_message,
      });
      return null;
    }
    let userRoleData = getDataFromStorage(
      endpoints.auth.USER_ROLE_kEY,
      endpoints.auth.USER_ROLE_DATA
    );
    if (userRoleData) {
      let body = {
        Type: "Client",
        Code: userRoleData?.ClientCode,
        ModeId: "1",
        CallTypeId: "15",
        SubTypeId: code,
        LogTypeId: "1",
        AssignedToRole: userRoleData?.role_id,
        Status: "1",
        Description: tabList,
      };
      sipUpdatePause(body).then((data) => {
        setResponse(data?.ObjectResponse?.Result);
        setResPopup(true);
      });
    }
  };

  const handleClickRadio = (item) => {
    item === selItem ? setSelItem(null) : setSelItem(item);
    var newItem = item.includes(endpoints.stop);
    if (newItem === true) {
      setCode(140);
    } else {
      setCode(77);
    }
    var newPeriod = item.replace(endpoints.stop, "").split(" ").join("");
    setPeriod(newPeriod);
  };

  return (
    <React.Fragment>
      <PauseSIPModal
        isOpen={cancelPopup}
        setPopup={setCancelPopup}
        resPopupStatus={resPopup}
        pauseSIPTitle={pause}
        onChange={(active) => handleClickRadio(active)}
        pauseConfirmSIP={() => pauseSIP()}
        responseStatus={response}
      />
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      sipUpdatePause: saveCallLog,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(PauseSIPPopup));
