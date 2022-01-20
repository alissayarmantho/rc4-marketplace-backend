// module.exports = (mongoose) => {
//     var schema = new mongoose.Schema(
//       {
//         telegramHandle: { type: String, default: " " },
//         // listingName: { type: String, default: "" },
//         // category: { type: String, default: 12345678 },
//         // quantity: { type: Number, default: "" },
//         // description: { type: String, default: "" },        
//         // listingDate: { type: Date, default: Date.now },
//         // likes: { type: Number, default: "" },
//         // quotation: { type: String, default: "" },
//         // imageLink: { type: String, default: "" },
//       },
//       { timestamps: true }
//     );
  
//     const Item = mongoose.model("Item", schema);
  
//     return Item;
//   };

const mongoose = require('mongoose')

const Item_Schema = new mongoose.Schema({
    telegramHandle:{ type:String,required:true,default:" " },
});

module.exports = mongoose.model('Item',Item_Schema)
  