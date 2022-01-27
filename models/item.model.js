const mongoose = require('mongoose')

const Item_Schema = new mongoose.Schema({
    
    telegramHandle:{ type:String },
    listingName: { type: String, },
    category: { type: String, enum : ['Food' , 'Appliances', 'Fashion',  'Accessories'], required : true},
    quantity: { type: Number, min : [1, "Minimum quantity: 1"]},
    description: { type: String, },        
    listingDate: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    price: { type: Number, min : [0.00, "Minimum price: $0.01" ]},
    imageLink: { type: String, default: "" },
});
``
module.exports = mongoose.model('Item',Item_Schema)