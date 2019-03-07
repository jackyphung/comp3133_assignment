const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventLogSchema = new Schema({
  event: String,
  user: String,
  message: String,
  date_occurred: Date,
});

module.exports = mongoose.model('event_log', EventLogSchema);