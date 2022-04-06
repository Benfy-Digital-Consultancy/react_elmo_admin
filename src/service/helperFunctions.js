import { Toast } from "service/toast";
/* eslint-disable array-callback-return */
import CryptoJS from "crypto-js";
import moment from "moment";
import axios from "axios";
import { endpoints } from "service/helpers/config";
import { DOWNARROW, UPARROW } from "service/helpers/Constants";

const { error_title } = endpoints.response_error_msg;

export const addQuery = (dataObject, apiObject) => {
  if (!dataObject) {
    return "";
  }

  const keys = [
    "SubBrokerCode",
    "Link",
    "Code",
    "Client_Code",
    "ClientCode",
    "LastDateTime",
    "uid",
    "UserCode",
    "RoleId",
    "surveyID",
    "ClientCode",
    "SurveyId",
    "MandateType",
    "ifscCode",
  ];

  keys.forEach((key) => {
    if (dataObject.hasOwnProperty(key) && typeof dataObject[key] != "object") {
      if (apiObject.query.hasOwnProperty(key)) {
        apiObject.addQuery = { key, payload: dataObject[key] };
      }
    } else {
      dataObject[key] &&
        Object.keys(dataObject[key]).forEach((keyName) => {
          if (apiObject.query.hasOwnProperty(keyName)) {
            apiObject.addQuery = {
              key: keyName,
              payload: dataObject[key][keyName],
            };
          }
        });
    }
  });
};

//generate Query
export const generateQuery = (query) => {
  let url = "";

  if (query.hasOwnProperty("url_id")) {
    url = `/${query.url_id}`;
  }

  return (
    url +
    Object.keys(query).reduce((accumulator, key, index) => {
      if (
        query[key] === "" ||
        query[key] === null ||
        key === "url_id" ||
        (query[key] !== null && query[key].toString().trim() === "")
      ) {
        return accumulator;
      } else {
        return accumulator + `${index !== 0 ? "&" : "?"}${key}=${query[key]}`;
      }
    }, "")
  );
};

// data convert to Encrypt
export const encryptData = (data, salt) => {
  if (data && salt)
    return CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();
};

// data convert to Decrypt
export const decryptData = (ciphertext, salt) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};

// numberToRupees round off
export const numberToRupees = (number) => {
  const num = Math.round(number);
  if (isNaN(num)) return num;
  const convertInr = num.toLocaleString("en-IN", {
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${"Rs. " + convertInr}`;
};

// number To Rupees without round off
export const amountWithRs = (number) => {
  const num = number;
  if (isNaN(num)) return num;
  const convertInr = num.toLocaleString("en-IN", {
    currency: "INR",
  });
  return `${"Rs. " + convertInr}`;
};

// number To Rupees without round off and Rs
export const amountWithoutRs = (number) => {
  const num = Math.round(number);
  if (isNaN(num)) return num;
  const convertInr = num.toLocaleString("en-IN", {
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return convertInr;
};

// percentage Validator
export const percentageValidator = (num) => {
  let number = num?.toString().replace("-", "");
  let finalNumber = Number(number)
    .toFixed(2)
    .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, "$1");
  if (isNaN(finalNumber)) {
    return "";
  } else {
    return `${Math.abs(finalNumber)}% `;
  }
};

// percentage Validator without percentage
export const percentageValidatorWOP = (num) => {
  let number = num?.toString().replace("-", "");
  let finalNumber = Number(number)
    .toFixed(2)
    .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, "$1");
  if (isNaN(finalNumber)) {
    return "";
  } else {
    return `${Math.abs(finalNumber)} `;
  }
};

// dateConvertFunction
export const dateConvertFunction = (date) => {
  var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  var arrayDate = date.match(pattern);
  var dt = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
  return moment(dt).format("DD MMM, YYYY");
};

export const getIpAddress = async () => {
  const data = await axios({
    method: "get",
    url: process.env.REACT_APP_IP_BASE_URL,
  });
  let ip = data.data;
  sessionStorage.setItem(endpoints.auth.IP, ip);
  return data;
};

//get Data From Storage
export const getDataFromStorage = (storageName, storageType) => {
  let data = sessionStorage?.getItem(storageName);
  if (data) {
    return decryptData(data, storageType);
  } else {
    return null;
  }
};

//set Data From Storage
export const setDataFromStorage = (storageData, storageName, storageType) => {
  const encryptedData = encryptData(storageData, storageType);
  sessionStorage.setItem(storageName, encryptedData);
};

export const errorToast = (message) => {
  Toast({ type: error_title, message });
};

export const objectFieldValidate = (value, ispercentage = false) => {
  if (value) {
    return ispercentage ? percentageValidator(value) : numberToRupees(value);
  } else {
    return 0;
  }
};
export const imageConditionValidate = (value) => {
  if (value === 0 || null) {
    return "";
  } else if (value <= 0) {
    return <img src={DOWNARROW} alt="DownArrowRed" />;
  } else if (value > 0) {
    return <img src={UPARROW} alt="UpArrowGreen" />;
  }
};

export const date = (dateValue) => {
  if (dateValue) {
    return moment(dateValue).format("DD MMM, YYYY");
  } else {
    return null;
  }
};

export const handleSubtypeId = (productId) => {
  switch (productId) {
    case "2":
      return "141";
    case "4":
      return "142";
    case "6":
      return "143";
    case "7":
      return "144";
    case "8":
      return "145";
    default:
      return null;
  }
};
