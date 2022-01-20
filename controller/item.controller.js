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
    // listingName: req.body.listingName,
    // category: req.body.category,
    // quantity: req.body.quantity,
    // description: req.body.description,
    // listingDate: req.body.listingDate,
    // likes: req.body.likes,
    // quotation: req.body.quotation,
    // imageLink: req.body.imageLink,
  });

  item
    .save(item)
    .then((data) => {
      return res.status(200).json({
        message: "Account successfully created",
        data: { telegramHandle: telegramHandle},
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something went wrong! Error: " + err.message,
        data: {},
      });
    });
};

// exports.deleteItem = async function (req,res,next) {
//   const itemToDelete = Item.deleteOne( {_id: req.body._id} )
  
//   if (err) {
//     return res.status(500).json({message: 'Error ' + err.message}, data = {})
//   }

//   return res.status(200).json({message: 'Success! Deleted ' + req.body._id}, data = {})

// }

// exports.updateAccount = async function (req, res, next) {
//   var account = await Account.findOne({ _id: req.body._id }, function (err) {
//     if (err) {
//       return res.status(500).json({
//         message: "Something went wrong! Error: " + err.message,
//         data: {},
//       });
//     }
//   });

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