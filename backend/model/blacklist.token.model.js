
const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: String,
}, {
  versionKey: false,
});

const BlacklistedTokenModel = mongoose.model('blacklistedTokens', blacklistTokenSchema);

module.exports = { BlacklistedTokenModel };
