const { validationResult } = require("express-validator");

// to process error from built-in express check
exports.ifErrors = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsArr = errors.array();
    let msg = "";
    let param = "";
    if (errorsArr[0].nestedErrors) {
      if (errorsArr[0].nestedErrors.length > 0) {
        msg = errorsArr[0].nestedErrors[0].msg;
        param = errorsArr[0].nestedErrors[0].param;
      }
    } else {
      msg = errorsArr[0].msg;
      param = errorsArr[0].param;
    }

    return res.status(422).json({
      status: "Error",
      message: param + ": " + msg,
      data: {},
    });
  }
  next();
};
