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
  if (req.body.room) {
    console.log('get list of rooms')
    History.findOne({ room: req.body.room }, (err, hist) => {
      if (err)
        throw err
      if (hist == null)
        res.send(JSON.stringify({ message: `The room "${req.body.room}" does not exist in the database` }));
      else 
        res.send(JSON.stringify(hist))
    })
  } else {
    res.send(JSON.stringify({ message: "Invalid Room History Request" }));
  }
})

router.post('/create', (req, res, next) => {
  res.contentType('application/json');
  let values = req.body;
  if (values.room) {
    console.log('create room')
    values.room = values.room.toLowerCase().replace(/\s+/g, ' ').trim();
    values.room = values.room.replace(' ', '-');
    let history = History({ room: values.room, status: values.status });
    history.save((err, hist) => {
      if (err) 
        throw err;

      if (hist == null)
        res.send(JSON.stringify({ message: `The room "${req.body.room}" has not been created.` }));
      else
        res.send(JSON.stringify(hist))
    })
  } else {
    res.send(JSON.stringify({ message: "Invalid Room History Request" }));
  }
})

router.post('/update', (req, res, next) => {
  res.contentType('application/json');
  let values = req.body;
  if (values.oldRoom) {
    let oldRoom = values.oldRoom;
    delete values.oldRoom;
    values.room = values.room.toLowerCase().replace(/\s+/g,' ').trim();
    History.findOneAndUpdate({ room: oldRoom }, { $set: values }, { new: true }, (err, hist) => {
      if (err)
        throw err
      if (hist == null)
        res.send(JSON.stringify({ message: `The room "${values.room}" does not exist in the database` }));
      else 
        res.send(JSON.stringify(hist))
    })
  } else {
    res.send(JSON.stringify({ message: "Invalid Room History Request" }));
  }
})

router.post('/delete', (req, res, next) => {
  res.contentType('application/json');
  let values = req.body;
  console.log(values)
  if (values.room) {
    History.findOneAndDelete({ room: values.room }, (err, hist) => {
      if (err)
        throw err
      if (hist == null)
        res.send(JSON.stringify({ message: `The room "${values.room}" could not be deleted` }));
      else 
        res.send(JSON.stringify(hist))
    })
  } else {
    res.send(JSON.stringify({ message: "Invalid Room History Request" }));
  }
})

module.exports = router;