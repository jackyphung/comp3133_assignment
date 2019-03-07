const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  room_name: String,
  date_created: Date,
  chat_history = new Schema({
    username: String,
    message: String,
    time: Date
  })
});

module.exports = mongoose.model('user_history', UserHistorySchema);