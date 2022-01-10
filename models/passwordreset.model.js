module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      token: { type: String, default: "" },
      accountId: { type: String, default: "" },
      expiredAt: Date,
      status: { type: String, default: "pending" },
    },
    { timestamps: true }
  );

  const PasswordReset = mongoose.model("PasswordReset", schema);

  return PasswordReset;
};
