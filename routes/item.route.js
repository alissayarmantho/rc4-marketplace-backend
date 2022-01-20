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
    res.json(a1)
  } catch(err) {
    res.send('Error ' + err)
  }
});

// 2nd Way 
// router.post("/addItem", 
//     itemController.createItem,
// );

// Delete Item
router.post("/deleteItem", async(req,res) => {
  const itemToDelete = await Item.deleteOne( {_id: req.body._id} )
  
  res.send('Deleted item ' + req.body._id)
  
});

// Update Item 
router.post("/updateItem", async(req,res) => {
  updates = {
    listingName: req.body.listingName ,
    category: req.body.category ,
    quantity: req.body.quantity ,
    description: req.body.description ,       
    price: req.body.price ,
    imageLink: req.body.imageLink ,
  }
  const itemToUpdate = await Item.updateOne( {_id: req.body._id}, updates)

  res.send('Updated')

})


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