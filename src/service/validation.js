import validate from "validate.js";

validate.validators.object = (object) => {
  const { value } = object;
  return !value ? " Field is required" : null;
};

export default validate;
