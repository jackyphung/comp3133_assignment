const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  role: String,
  date_joined: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('event_log', EventLogSchema);