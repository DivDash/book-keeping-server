const validator = require("validator");
const isEmpty = require("is-empty");

//Validator only works with strings
//isEmpty will check which data is present or unavailable

module.exports = function checkRegistrationDetails(req, res, next) {
  let data = req.body;

  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    error.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    error.password = "Password is required";
  }

  let isValid = isEmpty(error);

  if (isValid) {
    next();
  } else {
    res.status(400).send('Details are missing')
  }
};
