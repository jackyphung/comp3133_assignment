const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const RoomHistory = require('../../models/RoomHistory')

router.use((req,res,next) => {
    next();
})

router.get('', (req, res, next) => {
    res.contentType('application/json');
    console.log('get room history')
    RoomHistory.find({}, (err, rhist) => {
        if(err)
            throw err;
        res.send(JSON.stringify(rhist));
    });
})