const { body, param } = require("express-validator");
const db = require("../models");
const Account = db.account;

exports.updateAccount = [
  body("username")
    .exists()
    .custom(async (value) => {
      let account = await Account.findOne(
        { username: value },
        function (err, person) {
          if (err) return handleError(err);
        }
      );
      if (account)
        return Promise.reject(
          "Username already exists. Account cannot be created."
        );
    }),
  body("phone").exists(),
  body("telegram").exists(),
  body("email").isEmail(),
];

exports.createAccount = [
  body("username")
    .exists()
    .custom(async (value) => {
      let account = await Account.findOne(
        { username: value },
        function (err, person) {
          if (err) return handleError(err);
        }
      );
      if (account)
        return Promise.reject(
          "Username already exists. Account cannot be created."
        );
    }),
  body("phone").exists(),
  body("telegram").exists(),
  body("email").isEmail(),
  body("password")
    .exists()
    .custom(async (value) => {
      if (value.length < 8)
        return Promise.reject("Password must be at least 8 characters.");
    }),
];

exports.login = [body("username").exists(), body("password").exists()];

exports.changePassword = [
  body("new")
    .exists()
    .custom(async (value) => {
      if (value.length < 8)
        return Promise.reject("Password must be at least 8 characters.");
    }),
  body("old").exists(),
];

exports.forgetPasswordRequest = [body("email").isEmail()];

exports.forgetPasswordReset = [
  body("new")
    .exists()
    .custom(async (value) => {
      if (value.length < 8)
        return Promise.reject("Password must be at least 8 characters.");
    }),
  body("token").exists(),
];
