const validator = require("validator");
const isEmpty = require("is-empty");

//Validator only works with strings
//isEmpty will check which data is present or unavailable

// email: String,
// username: String,
// password: String,
// date: Date,
// role: String,

module.exports = function checkLoginDetails(req, res, next) {
  let data = req.body;

  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.passwordOne = !isEmpty(data.passwordOne) ? data.passwordOne : "";
  data.passwordTwo = !isEmpty(data.passwordTwo) ? data.passwordTwo : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (validator.isEmpty(data.email)) {
    error.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  if (validator.isEmpty(data.username)) {
    error.username = "Username is required";
  }

  if (validator.isEmpty(data.passwordOne)) {
    error.passwordOne = "Password is required";
  }

  if (validator.isEmpty(data.date)) {
    error.date = "Date of birth is required";
  }

  if (validator.isEmpty(data.passwordTwo)) {
    error.passwordTwo = "[Please confirm password";
  }

  let isValid = isEmpty(error);

  if (isValid) {
    next();
  } else {
    // next(error);
    res.status(400).send('Details are missing')
  }
};
