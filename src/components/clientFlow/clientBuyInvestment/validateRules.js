//Validation Function Login
import validate from "validate.js";

let validateCustom = validate.validators.custom;
validateCustom = function (data, errorText) {
  if (data.some((val) => val.sip !== true && val.oneTime !== true)) {
    return errorText?.sip_page_error?.error_checkbox_error;
  }
};

export default validateCustom;
