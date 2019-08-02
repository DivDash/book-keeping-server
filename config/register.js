const validator = require("validator");
const isEmpty = require("is-empty");

//Validator only works with strings
//isEmpty will check which data is present or unavailable

module.exports = function checkLoginDetails(req, res, next) {
  let data = req.body;

  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (validator.isEmpty(data.email)) {
    error.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  if (validator.isEmpty(data.name)) {
    error.name = "Name is required";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "Password is required";
  }

  if (validator.isEmpty(data.date)) {
    error.date = "Date of birth is required";
  }

  if (validator.isEmpty(data.passwordTwo)) {
    error.passwordTwo = "Please confirm password";
  }

  let isValid = isEmpty(error);

  if (isValid) {
    next();
  } else {
    // next(error);
    res.status(400).json({
      error: error,
      message: "There is something wrong"
    })
  }
};
