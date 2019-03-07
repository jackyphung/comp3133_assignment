const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventLogSchema = new Schema({
  type: String,
  event: String,
  message: String,
  dateOccurred: Date,
  user: String
});

module.exports = mongoose.model('event_log', EventLogSchema);