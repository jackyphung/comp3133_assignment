const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

//heroku port
const port = process.env.port || 3030;

var apiRoutes = {
    history: require('./routes/api/history'),
    event: require('./routes/api/eventlog')
};
// require the main route for the app
// the main route will be used to render the index.html to all routes besides apiRoutes
var appRoute = require('./routes/main');

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '../client/public'));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

// MongoDb Connection
mongoose.connect(process.env.DB_KEY,  { useNewUrlParser: true, dbName: process.env.DB_NAME });
mongoose.set('useFindAndModify', false);

// Apply Express routes below
app.use('/api/history', apiRoutes.history);
app.use('/api/event', apiRoutes.event);
app.use('/', appRoute);

module.exports = app;
