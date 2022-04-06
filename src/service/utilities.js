import axios from "axios";
import { endpoints } from "./helpers/config";
import {
  getDataFromStorage,
  setDataFromStorage,
} from "service/helperFunctions";

//Time Stamp
let newTimeStamp = new Date().getTime();
sessionStorage.setItem(endpoints.auth.TIME_STAMP, newTimeStamp);
// let havingTimeStamp = sessionStorage.getItem(endpoints.auth.TIME_STAMP);
// if (!havingTimeStamp) {
//   sessionStorage.setItem(endpoints.auth.TIME_STAMP, newTimeStamp);
// }
//axios Instance
export const axiosInstance = axios.create({
  headers: {
    time_stamp: newTimeStamp,
  },
});

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.assign("/");
};
export const getFreshTokenFunction = () => {
  const {
    USER_DETAILS,
    USER_DETAILS_KEY,
    PASSWORD,
    PASSWORD_KEY,
    SOCIAL_ID,
    SOCIAL_ID_KEY,
    TIME_STAMP,
    TOKEN,
    TOKEN_KEY,
  } = endpoints.auth;
  let userDetails = getDataFromStorage(USER_DETAILS, USER_DETAILS_KEY);
  let Password = getDataFromStorage(PASSWORD, PASSWORD_KEY);
  let Soc_Id = getDataFromStorage(SOCIAL_ID, SOCIAL_ID_KEY);
  if (userDetails) {
    let payload = {
      Email_Mob: userDetails?.UserReferralInfo?.Email,
      DeviceId: "",
      Uid: userDetails?.UserReferralInfo?.uid,
      Soc_Id: Soc_Id ? Soc_Id : "",
    };
    let password = Password ? Password : "";
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_BASE_URL}GetToken_V2`,
      data: payload,
      headers: {
        time_stamp: sessionStorage.getItem(TIME_STAMP),
        Password: Soc_Id ? "" : password,
      },
    }).then(({ data }) => {
      const Token = data?.response?.Token;
      if (Token) {
        setDataFromStorage(Token, TOKEN, TOKEN_KEY);
        window.location.reload();
      }
    });
  }
};
