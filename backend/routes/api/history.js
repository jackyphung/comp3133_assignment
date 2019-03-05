const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const History = require('../../models/History')

router.use((req,res,next) => {
    next();
})

router.get('', (req, res, next) => {
    res.contentType('application/json');
    console.log('get history list')
    History.find({}, (err, hist) => {
        if(err)
            throw err;
        res.send(JSON.stringify(hist));
    });
})