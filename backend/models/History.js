const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  room: String,
  status: {
    type: String,
    default: "active"
  },
  chat_history: {
    type: 
      [new Schema({
        username: String,
        message: String,
        time: {
          type: Date,
          default: new Date()
        }
      })],
    default: [],
  }
});

module.exports = mongoose.model('room_history', HistorySchema);