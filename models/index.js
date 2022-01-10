const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.account = require("./account.model.js")(mongoose);
db.passwordreset = require("./passwordreset.model.js")(mongoose);

module.exports = db;
