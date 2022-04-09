import axios from "axios";
import { endpoints } from "config/api";

export const signIn = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.SIGN_IN,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: data,
  });
  return request;
};

export const resetPassword = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.RESET_PASSWORD,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: data,
  });
  return request;
};

export const verifyOtp = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.VERIFY_OTP,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: data,
  });
  return request;
};

export const updateUser = async (data) => {
  let request = await axios({
    method: "put",
    url: endpoints.auth.UPDATE_USER,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: data,
  });
  return request;
};

export const changePassword = async (data) => {
  let request = await axios({
    method: "put",
    url: endpoints.auth.CHANGE_PASSWORD,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: data,
  });
  return request;
};

export const forgotPassword = async (data, token) => {
  let request = await axios({
    method: "put",
    url: endpoints.auth.FORGOT_PASSWORD,
    headers: {
      Authorization: token,
    },
    data: data,
  });
  return request;
};

export const getUserById = async (id) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.auth.GET_USER_BY_ID}/${id}`,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return request;
};
