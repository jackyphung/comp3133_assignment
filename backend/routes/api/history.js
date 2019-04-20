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
    console.log('get list of rooms')
    History.findOne({ room: req.body.roomname }, (err, hist) => {
      if (err)
        throw err
      if (hist == null)
        res.send(JSON.stringify({ message: `The room "${req.body.roomname}" does not exist in the database` }));
      else 
        res.send(JSON.stringify(hist))
    })
  } else {
    res.send(JSON.stringify({ message: "Invalid Room History Request" }));
  }
})

router.post('/create', (req, res, next) => {
  res.contentType('application/json');
  if (req.body.roomname) {
    console.log('create room')
    let history = History(req.body.roomname);
    history.save((err, hist) => {
      if (err) 
        throw err;

      if (hist == null)
        res.send(JSON.stringify({ message: `The room "${req.body.roomname}" has not been created.` }));
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
  if (values.roomname) {
    History.findOneAndUpdate({ room: values.roomname }, { $set: values }, { new: true }, (err, hist) => {
      if (err)
        throw err
      if (hist == null)
        res.send(JSON.stringify({ message: `The room "${values.roomname}" does not exist in the database` }));
      else 
        res.send(JSON.stringify(hist))
    })
  } else {
    res.send(JSON.stringify({ message: "Invalid Room History Request" }));
  }
})

module.exports = router;