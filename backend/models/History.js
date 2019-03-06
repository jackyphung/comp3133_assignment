const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserHistorySchema = new Schema({
  username: String,
  room_name: String
});

module.exports = mongoose.model('user_history', UserHistorySchema);