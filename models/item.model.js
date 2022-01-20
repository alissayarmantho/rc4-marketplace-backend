module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: { type: String, default: "" },
        telegramHandle: { type: String, default: " " },
        listingName: { type: String, default: "" },
        category: { type: String, default: 12345678 },
        quantity: { type: Number, default: "" },
        description: { type: String, default: "" },        
        listingName: { type: String, default: "" },
        listingDate: { type: Date, default: Date.now },
        likes: { type: Number, default: "" },
        quotation: { type: String, default: "" },
        imageLink: { type: String, default: "" },
      },
      { timestamps: true }
    );
  
    const Item = mongoose.model("Item", schema);
  
    return Item;
  };
  