const moment = require("moment-timezone");
const saltedMd5 = require("salted-md5");
const randomstring = require("randomstring");

const db = require("../models");
const Item = db.item;

const HelperService = require("../service/helper.service");
const HelperFunction = require("./helper.controller");

const TokenSign = require("./tokensign");

exports.createItem = async function (req, res, next) {

  const item = new Item({
    telegramHandle: req.body.telegramHandle,
    listingName: req.body.listingName,
    category: req.body.category,
    quantity: req.body.quantity,
    description: req.body.description,
    listingDate: req.body.listingDate,
    likes: req.body.likes,
    quotation: req.body.quotation,
    imageLink: req.body.imageLink,
  });

  item
    .save(item)
    .then((data) => {
      return res.status(200).json({
        message: "Account successfully created",
        data: { telegramHandle: telegramHandle, account: listingName},
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    });
};

// exports.updateAccount = async function (req, res, next) {
//   var account = await Account.findOne({ _id: req.body._id }, function (err) {
//     if (err) {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     }
//   });

//   if (!account)
//     return res.status(400).json({
//       message: "Account not found.",
//       data: {},
//     });

//   account.username = req.body.username;
//   account.telegram = req.body.telegram;
//   account.phone = req.body.phone;
//   account.email = req.body.email;

//   account
//     .save(account)
//     .then((data) => {
//       let accountInfo = HelperFunction.accountDataParserHelper(data);

//       return res.status(200).json({
//         message: "Account profile successfully updated.",
//         data: accountInfo,
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     });
// };

// exports.login = async function (req, res, next) {
//   let email = req.body.email;

//   var account = await Account.findOne({ email: email }, function (err) {
//     if (err) {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     }
//   });

//   if (!account) {
//     return res.status(500).json({
//       message: "No such account found.",
//       data: {},
//     });
//   }

//   let saltedHashPassword = saltedMd5(account.salt, req.body.password);

//   if (saltedHashPassword === account.password) {
//     let token = TokenSign(account._id, account.email);

//     let accountInfo = HelperFunction.accountDataParserHelper(account);

//     return res.status(200).json({
//       message: "You have successfully sign in!",
//       data: { token: token, account: accountInfo },
//     });
//   } else {
//     return res.status(400).json({
//       message: "Password mismatch!",
//       data: {},
//     });
//   }
// };

// exports.changePassword = async function (req, res, next) {
//   var account = await Account.findOne({ _id: req.body._id }, function (err) {
//     if (err) {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     }
//   });

//   if (!account)
//     return res.status(400).json({
//       message: "Account not found.",
//       data: {},
//     });

//   let verifyOldPassword = saltedMd5(account.salt, req.body.oldpassword);
//   if (verifyOldPassword != account.password) {
//     return res.status(400).json({
//       message: "The old password mismatched!",
//       data: {},
//     });
//   }

//   let randomString = randomstring.generate({ length: 8 });
//   let saltedHashPassword = saltedMd5(randomString, req.body.newpassword);

//   account.password = saltedHashPassword;
//   account.salt = randomString;

//   account
//     .save(account)
//     .then((data) => {
//       let accountInfo = accountDataParserHelper(data);

//       let subject = "RC4 MarketPlace Account Password Change";
//       let message = `
//             <h1>Password Change!</h1>
//             <p>You have changed your account password.</p>
//             <p>If this is not you, please contact our admin to resolve this.</p><br>
//         `;

//       HelperService.sendEmail(account.email, subject, message, function (info) {
//         if (!info) {
//           console.log("Something went wrong while trying to send email!");
//           return res.status(500).json({
//             message: "Something went wrong while trying to send email.",
//             data: {},
//           });
//         }
//       });

//       return res.status(200).json({
//         message: "Account password successfully updated.",
//         data: { account: accountInfo },
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     });
// };

// exports.forgetPasswordRequest = async function (req, res, next) {
//   let email = req.body.email;

//   var account = await Account.findOne({ email: email }, function (err) {
//     if (err) {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     }
//   });

//   if (!account)
//     return res.status(400).json({
//       message: "Account with such email is not found!",
//       data: {},
//     });

//   const passwordreset = new PasswordReset({
//     token: randomstring.generate({ length: 5, charset: "hex" }),
//     accountId: account._id,
//     expiredAt: moment.tz("Asia/Singapore").add(30, "minutes").format(),
//     status: "pending",
//   });

//   let subject = "RC4 MarketPlace Account Password Reset";
//   let message = `
//             <h1>Password Reset Request</h1>
//             <p>We received a request to reset your RC4 MarketPlace password.</p> <br>
//             <p>Please enter the following code into the password reset page. This code is only valid for 30 minutes.</p><br>
//             <h2>${passwordreset.token}</h2>
//     `;
//   passwordreset
//     .save(passwordreset)
//     .then(() => {
//       HelperService.sendEmail(
//         req.body.email,
//         subject,
//         message,
//         function (info) {
//           if (!info) {
//             return res.status(500).json({
//               message: "Something went wrong while sending email!",
//               data: {},
//             });
//           } else {
//             return res.status(200).json({
//               message:
//                 "Please check your email for the code to reset the password.",
//               data: {},
//             });
//           }
//         }
//       );
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     });
// };

// exports.forgetPasswordReset = async function (req, res, next) {
//   var passwordreset = await PasswordReset.findOne(
//     { token: req.body.token },
//     function (err) {
//       if (err) {
//         return res.status(500).json({
//           message: "Something went wrong! Error: " + err.message,
//           data: {},
//         });
//       }
//     }
//   );

//   if (!passwordreset)
//     return res.status(400).json({
//       message: "Password reset request with such token not found.",
//       data: {},
//     });

//   if (
//     moment(passwordreset.expiredAt).isBefore(
//       moment.tz("Asia/Singapore").format()
//     )
//   ) {
//     return res.status(400).json({
//       message: "Password reset code has already expired.",
//       data: {},
//     });
//   }

//   if (passwordreset && passwordreset.status === "pending") {
//     var account = await Account.findOne(
//       { _id: passwordreset.accountId },
//       function (err) {
//         if (err) {
//           return res.status(500).json({
//             message: "Something went wrong! Error: " + err.message,
//             data: {},
//           });
//         }
//       }
//     );

//     if (!account)
//       return res.status(400).json({
//         message: "Account not found!",
//         data: {},
//       });

//     let randomString = randomstring.generate({ length: 8 });
//     let saltedHashPassword = saltedMd5(randomString, req.body.newpassword);

//     account.password = saltedHashPassword;
//     account.salt = randomString;

//     passwordreset.status = "completed";
//     passwordreset.save();

//     let subject = "RC4 MarketPlace Account Password Reset Successful";
//     let theMessage = `
//             <h1>Password Reset Successful</h1>
//             <p>You have successfully reset your password!</p> <br>
//         `;

//     account
//       .save(account)
//       .then(() => {
//         HelperService.sendEmail(
//           account.email,
//           subject,
//           theMessage,
//           function (info) {
//             if (!info) {
//               return res.status(500).json({
//                 message: "Something went wrong while sending email!",
//                 data: {},
//               });
//             } else {
//               return res.status(200).json({
//                 message: "Account password reset successfully!",
//                 data: {},
//               });
//             }
//           }
//         );
//       })
//       .catch((err) => {
//         return res.status(500).json({
//           message: "Something went wrong! Error: " + err.message,
//           data: {},
//         });
//       });
//   } else {
//     return res.status(400).json({
//       message: "Password has already been reset for this token.",
//       data: {},
//     });
//   }
// };
