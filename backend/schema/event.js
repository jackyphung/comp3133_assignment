const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventLogSchema = new Schema({
  event: String,
  message: String,
  dateOccurred: Date
});

module.exports = mongoose.model('event_log', EventLogSchema);