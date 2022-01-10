exports.accountDataParserHelper = function (accountData) {
  let account = {
    _id: accountData._id,
    username: accountData.username,
    email: accountData.email,
    phone: accountData.phone,
    telegram: accountData.telegram,
  };

  return account;
};
