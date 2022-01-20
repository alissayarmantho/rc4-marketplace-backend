const express = require("express");
const router = express.Router();
const itemController = require("../controller/item.controller");
const auth = require("../controller/auth");

const AccountValidator = require("../validator/account.validator");
const ErrorValidator = require("../validator/error.validator");
const { route } = require("./account.route");
const Item = require('../models/item.model')

// Display all Item
router.get("/displayItems", async(req,res) => {
      
      try{
        const items = await Item.find()
        res.json(items)
      } catch(err) {
        res.send('Error ' + err)
      }

    }
  );

// Add Item
router.post("/addItem", async(req,res) => {
  const item = new Item({
    telegramHandle: req.body.telegramHandle
  })
  try {
    const a1 = await item.save()
    res.json(item)
  } catch(err) {
    res.send('Error ' + err)
  }
}

    // itemController.createItem,
);
// Delete Item

// Update Item (LTR)



// router.post(
//   "/",
//   AccountValidator.createAccount,
//   ErrorValidator.ifErrors,
//   accountController.createAccount
// );

// router.put(
//   "/",
//   auth,
//   AccountValidator.updateAccount,
//   ErrorValidator.ifErrors,
//   accountController.updateAccount
// );

// router.post(
//   "/change-password",
//   auth,
//   AccountValidator.changePassword,
//   ErrorValidator.ifErrors,
//   accountController.changePassword
// );

// router.post(
//   "/login",
//   AccountValidator.login,
//   ErrorValidator.ifErrors,
//   accountController.login
// );

// router.post(
//   "/forget-password-request",
//   AccountValidator.forgetPasswordRequest,
//   ErrorValidator.ifErrors,
//   accountController.forgetPasswordRequest
// );

// router.post(
//   "/forget-password-reset",
//   AccountValidator.forgetPasswordReset,
//   ErrorValidator.ifErrors,
//   accountController.forgetPasswordReset
// );

module.exports = router;