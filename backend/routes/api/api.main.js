const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use((req,res,next) => {
    next();
})

router.get('*', (req, res, next) => {
    res.contentType('application/json');
    res.send({ message: "invalid API Route" });
})

module.exports = router;