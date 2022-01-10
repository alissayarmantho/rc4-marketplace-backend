module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: { type: String, default: "" },
      email: { type: String, default: " " },
      password: { type: String, default: "" },
      phone: { type: Number, default: 12345678 },
      telegram: { type: String, default: "" },
      salt: { type: String, default: "" },
    },
    { timestamps: true }
  );

  const Account = mongoose.model("Account", schema);

  return Account;
};
