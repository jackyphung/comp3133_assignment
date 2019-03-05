const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const EventLog = require('../../models/EventLog')

router.use((req,res,next) => {
    next();
})

router.get('', (req, res, next) => {
    res.contentType('application/json');
    console.log('get event log')
    EventLog.find({}, (err, elog) => {
        if(err)
            throw err;
        res.send(JSON.stringify(elog));
    });
})