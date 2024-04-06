const mongoose = require('mongoose');


//token schema
const blacklistTokenSchema = new mongoose.Schema({
  token: String,
}, {
  versionKey: false,
});


//token model
const BlacklistedTokenModel = mongoose.model('blacklistedTokens', blacklistTokenSchema);


//exporting token model
module.exports = { 
    BlacklistedTokenModel 
};