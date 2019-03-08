const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const History = require('../../models/History')

router.use((req, res, next) => {
  next();
})

router.get('', (req, res, next) => {
  res.contentType('application/json');
  console.log('get history list')
  History.find({}, (err, hist) => {
    if (err)
      throw err;
    res.send(JSON.stringify(hist));
  });
})

router.post('', (req, res, next) => {
  res.contentType('application/json');
  if (req.body.roomname) {
    console.log('get room history list')
    History.findOne({ room: req.body.roomname }, (err, hist) => {
      if (err)
        throw err
      if (hist == null)
        res.send(JSON.stringify({ message: `The user "${req.params.room_name}" does not exist in the database` }));
      res.send(JSON.stringify(hist))
    })
  } else {
    res.send(JSON.stringify({ message: "Invalid Room History Request" }));
  }
})

module.exports = router;