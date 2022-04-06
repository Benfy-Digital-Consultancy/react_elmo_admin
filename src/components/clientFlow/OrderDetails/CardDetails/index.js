import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  generateChellan,
  generateChellanDetail,
  generateChellanFromGroupId,
  getSMS,
} from "redux/action/clientFlow/OrderAct";
import {
  numberToRupees,
  getDataFromStorage,
  date,
} from "service/helperFunctions";
import { generateChellanRules } from "../validateRules";
import validate from "validate.js";
import { Toast } from "service/toast";
import { endpoints } from "service/helpers/config";
import { useLang } from "hooks/useLang";
import CardMainContent from "../CardMainContent";
import ChellanPopup from "../ChellanPopup";
import StepDetails from "../StepDetails";
import "./cardDetails.scss";

const CardDetails = (props) => {
  const { errorText } = useLang();
  const {
    generateChellanDetailApi,
    generateChellanApi,
    generateChellanFromGroupIdApi,
    getSMSApi,
    data,
  } = props;
  const { error_title, success_title } = endpoints.response_error_msg;
  const {
    url_message,
    amount_message,
    chellan_message,
    generate_message,
    no_record_message,
    option_message,
  } = errorText?.order_error_message || {};
  const url = data?.BSEPaymentLink;
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [chellanDetailPopup, setChellanDetailPopup] = useState(false);
  const [chellanDetailsList, setChellanDetailsList] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [primaryAcc, setPrimaryAcc] = useState(null);
  const [orderList, setOrderList] = useState([]);
  let [amount, setAmount] = useState(0);
  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
  const [pdfPath, setPdfPath] = useState("");
  const [pdfPopup, setPdfPopup] = useState(false);
  const [error, setErrors] = useState({});
  const [duplicateList, setDuplicateList] = useState([]);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [formDetails, setFormDetails] = useState({
    date: "",
    chequeNumber: "",
  });

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const payOnline = () => {
    if (url === "") {
      Toast({ type: error_title, message: url_message });
    } else {
      window.open(url);
    }
  };

  const userRoleDataValue = getDataFromStorage(
    endpoints.auth.USER_ROLE_kEY,
    endpoints.auth.USER_ROLE_DATA
  );
  const roleID = userRoleDataValue?.role_id;

  const chellanOption = () => {
    setChellanDetailPopup(true);
    let body = {
      ClientCode: userRoleDataValue?.ClientCode,
    };
    generateChellanDetailApi(body).then((data) => {
      setChellanDetailsList(data?.challanDetailList);
      setDuplicateList(data?.BankNameForChallan);
      let options = [];
      data.BankNameForChallan.forEach((list) => {
        options.push({
          label: list.Bank,
          value: list.Bank,
        });
        if (options.length === data.BankNameForChallan.length)
          setBankDetails([...options]);
      });
      for (let i = 0; i <= data?.BankNameForChallan?.length; i++) {
        if (data?.BankNameForChallan[i]?.flag === "Y") {
          setPrimaryAcc(data?.BankNameForChallan[i]);
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e || {};
    const tempErrors = { ...error };
    tempErrors[name] = undefined;
    setFormDetails({ ...formDetails, [name]: value });
    setErrors({ ...error, ...tempErrors });
  };

  const validateFields = (data, constraint) => {
    const fieldInvalidList = validate(data, constraint);
    if (fieldInvalidList !== undefined) {
      const errors = {
        ...fieldInvalidList,
      };
      setErrors({ ...errors, ...fieldInvalidList });
    }
    return !fieldInvalidList;
  };

  const continueOption = () => {
    if (chellanDetailsList?.length <= 0 || chellanDetailsList === null) {
      Toast({ type: error_title, message: no_record_message });
      return null;
    } else if (selectedCheckBoxes.length <= 0) {
      Toast({ type: error_title, message: option_message });
      return null;
    } else if (amount <= 0) {
      Toast({ type: error_title, message: amount_message });
      return null;
    } else {
      setShowBankDetails(true);
    }
  };

  const generateChellanOption = () => {
    const { chequeNumber, date } = formDetails;
    let error_check = {
      chequeNumber,
      date,
    };
    if (!validateFields(error_check, generateChellanRules())) return;
    if (amount <= 0) {
      Toast({ type: error_title, message: amount_message });
      return null;
    }
    var formattedDate = moment(date).format("DD/MM/YYYY");
    let body = {
      ClientCode: userRoleDataValue?.ClientCode,
      OrderNo: orderList,
      TotalAmount: amount,
      IFSCCode: primaryAcc?.IFSC,
      AccNo: primaryAcc?.Account_No,
      ChequeNo: chequeNumber,
      ChequeDate: formattedDate,
      ChequeAmount: amount,
      DepositBank: primaryAcc?.Bank,
      Filler1: "",
      Filler2: "",
      Filler3: "",
    };
    generateChellanApi(body).then((data) => {
      if (data?.PDF === null) {
        setChellanDetailPopup(false);
        Toast({ type: success_title, message: chellan_message });
        setFormDetails({ date: "", chequeNumber: "" });
        setSelectedCheckBoxes([]);
        setShowBankDetails(false);
        return null;
      }
      setPdfPath(data?.PDF);
      setPdfPopup(true);
      setChellanDetailPopup(false);
      Toast({ type: success_title, message: generate_message });
      setFormDetails({ date: "", chequeNumber: "" });
      setSelectedCheckBoxes([]);
      setShowBankDetails(false);
    });
  };

  const generateChellanFromGroupIdOption = (item) => {
    let body = {
      GroupId: item?.GroupId,
    };
    generateChellanFromGroupIdApi(body).then((data) => {
      if (data?.PDF === null) {
        setChellanDetailPopup(false);
        Toast({ type: success_title, message: chellan_message });
        setFormDetails({ date: "", chequeNumber: "" });
        setSelectedCheckBoxes([]);
        return null;
      }
      setPdfPath(data?.PDF);
      setPdfPopup(true);
      setChellanDetailPopup(false);
      Toast({ type: success_title, message: generate_message });
      setFormDetails({ date: "", chequeNumber: "" });
      setSelectedCheckBoxes([]);
    });
  };

  const smsOption = () => {
    if (url === "") {
      Toast({ type: error_title, message: url_message });
      return null;
    }
    let body = {
      PaymentURL: url,
      ClientCode: data.Client_Code,
    };
    getSMSApi(body).then((data) => {
      Toast({ type: success_title, message: data?.Message });
    });
  };

  const handleOrderChange = (item, e) => {
    var updatedList = [...orderList];
    var updatedCheckBoxList = [...selectedCheckBoxes];
    if (e.target.value === true) {
      amount = amount + item?.Amount;
      setAmount(amount);
      updatedList = [...orderList, item?.orderNo];
      updatedCheckBoxList = [...selectedCheckBoxes, item];
    } else {
      amount = amount - item?.Amount;
      setAmount(amount);
      updatedList.splice(orderList.indexOf(item?.orderNo), 1);
      updatedCheckBoxList.splice(selectedCheckBoxes.indexOf(item), 1);
    }
    setOrderList(updatedList);
    setSelectedCheckBoxes(updatedCheckBoxList);
  };

  const handleBankChange = (item) => {
    for (let i = 0; i <= bankDetails?.length; i++) {
      if (bankDetails[i]?.value === item?.target?.value) {
        setPrimaryAcc(duplicateList[i]);
      }
    }
  };

  const orderDate = date(data?.TransactionDate, "DD/MM/YYYY");

  return (
    <React.Fragment>
      <div className="row">
        <CardMainContent
          data={data}
          toggle={toggle}
          setToggle={setToggle}
          orderDate={orderDate}
          payOnline={payOnline}
          chellanOption={chellanOption}
          smsOption={smsOption}
          StepDetails={StepDetails}
          isMobile={isMobile}
          numberToRupees={numberToRupees}
          roleID={roleID}
          url={url}
        />
      </div>
      <ChellanPopup
        chellanDetailPopup={chellanDetailPopup}
        setChellanDetailPopup={setChellanDetailPopup}
        chellanDetailsList={chellanDetailsList}
        orderChange={(e, item) => handleOrderChange(e, item)}
        chellanByID={(item) => generateChellanFromGroupIdOption(item)}
        handleBank={(e) => handleBankChange(e)}
        handleChange={handleChange}
        bankDetails={bankDetails}
        primaryAcc={primaryAcc}
        amount={amount}
        formDetails={formDetails}
        generateChellanOption={generateChellanOption}
        pdfPopup={pdfPopup}
        setPdfPopup={setPdfPopup}
        pdfPath={pdfPath}
        error={error}
        showBankDetails={showBankDetails}
        setShowBankDetails={setShowBankDetails}
        continueOption={continueOption}
        selectedCheckBoxes={selectedCheckBoxes}
      />
    </React.Fragment>
  );
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      generateChellanDetailApi: generateChellanDetail,
      generateChellanApi: generateChellan,
      generateChellanFromGroupIdApi: generateChellanFromGroupId,
      getSMSApi: getSMS,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(CardDetails));
