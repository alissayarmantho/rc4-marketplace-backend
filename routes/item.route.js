const express = require("express");
const router = express.Router();
const itemController = require("../controller/item.controller");
const auth = require("../controller/auth");

const AccountValidator = require("../validator/account.validator");
const ErrorValidator = require("../validator/error.validator");
const { route } = require("./account.route");
const Item = require('../models/item.model')

// Display all Item
router.get("/displayItems",auth, async(req,res) => {
      try{
        const items = await Item.find()
        res.json(items)
      } catch(err) {
        res.send('Error ' + err)
      }
    }
  );

// Add Item
router.post("/addItem",auth, async(req,res) => {

  const item = new Item({
    telegramHandle: req.body.telegramHandle,
    listingName: req.body.listingName ,
    category: req.body.category ,
    quantity: req.body.quantity ,
    description: req.body.description , 
    listingDate: req.body.description,      
    price: req.body.price ,
    imageLink: req.body.imageLink ,
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

// router.post("/deleteItem", itemController.deleteItem);

// Delete Item
router.post("/deleteItem", auth, async(req,res) => {
  const itemToDelete = await Item.deleteOne( {_id: req.body._id} )
  
  res.send('Deleted item ' + req.body._id)
  
});

// Update Item 
router.post("/updateItem", auth, async(req,res) => {
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

// Filter item by category
router.post("/filterByCategory", auth, async(req, res) => {
  const filteredItems = await Item.find( {category: req.body.category} ) 
  res.json(filteredItems)
})

// Profile items 
router.post("/myListings", auth, async(req, res) => {
  const filteredItems = await Item.find( {telegramHandle: req.body.telegramHandle} ) 
  res.json(filteredItems)
})

// Filter item by searchbar 
// router.post("/filterBySearch", async(req,res) => {

//   string searchTerms = req.body.searchTerms
//   const filteredItems = await Item.find( {listingName: /searchTerms/} )
//   res.json(filteredItems)
// })

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