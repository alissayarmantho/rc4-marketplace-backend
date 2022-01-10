const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller");
const auth = require("../controller/auth");

const AccountValidator = require("../validator/account.validator");
const ErrorValidator = require("../validator/error.validator");

router.post(
  "/",
  AccountValidator.createAccount,
  ErrorValidator.ifErrors,
  accountController.createAccount
);

router.put(
  "/",
  auth,
  AccountValidator.updateAccount,
  ErrorValidator.ifErrors,
  accountController.updateAccount
);

router.post(
  "/change-password",
  auth,
  AccountValidator.changePassword,
  ErrorValidator.ifErrors,
  accountController.changePassword
);

router.post(
  "/login",
  AccountValidator.login,
  ErrorValidator.ifErrors,
  accountController.login
);

router.post(
  "/forget-password-request",
  AccountValidator.forgetPasswordRequest,
  ErrorValidator.ifErrors,
  accountController.forgetPasswordRequest
);

router.post(
  "/forget-password-reset",
  AccountValidator.forgetPasswordReset,
  ErrorValidator.ifErrors,
  accountController.forgetPasswordReset
);

module.exports = router;
